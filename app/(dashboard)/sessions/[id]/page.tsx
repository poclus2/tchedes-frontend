"use client";

import { useSession } from "@/hooks/useSessions";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SecureImage } from "@/components/SecureImage";

export default function SessionDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: session, isLoading, error } = useSession(id);

    if (isLoading) {
        return (
            <div className="flex-1 p-8 flex items-center justify-center">
                <div className="text-slate-500 animate-pulse">Loading session details...</div>
            </div>
        );
    }

    if (error || !session) {
        return (
            <div className="flex-1 p-8">
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
                    Failed to load session details.
                </div>
            </div>
        );
    }

    const score = session.confidence_score;
    const extracted = session.extracted_fields || {};
    const documents = session.Documents || [];

    const getDocBySide = (side: string) => documents.find((d: any) => d.type === side);
    const frontDoc = getDocBySide('front');
    const backDoc = getDocBySide('back');
    const selfieDoc = getDocBySide('selfie');

    return (
        <main className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1440px] flex-1">
            <header className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <Link href="/sessions" className="text-sm text-slate-500 hover:text-slate-900 mb-4 inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Sessions
                    </Link>
                    <div className="flex items-center gap-3 mb-2 mt-2">
                        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">KYC Session Detail</h1>
                        {session.status === 'review_required' && (
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">error</span> Review Required
                            </span>
                        )}
                        {session.status === 'verified' && (
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">check_circle</span> Verified
                            </span>
                        )}
                        {session.status === 'rejected' && (
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">block</span> Rejected
                            </span>
                        )}
                        {session.status === 'processing' && (
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-1 animate-pulse">
                                <span className="material-symbols-outlined text-sm">sync</span> Processing
                            </span>
                        )}
                        {session.status === 'created' && (
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                                Created
                            </span>
                        )}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-mono text-sm">Ref ID: <span className="text-slate-900 dark:text-white font-semibold">{session.reference_id}</span></p>
                </div>
                <div className="flex items-center gap-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle className="text-slate-100 dark:text-slate-700" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="6"></circle>
                                <circle className={score >= 80 ? "text-primary" : score >= 50 ? "text-amber-500" : "text-red-500"} cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * (score || 0)) / 100} strokeWidth="6"></circle>
                            </svg>
                            <span className="absolute text-lg font-bold text-slate-900 dark:text-white">{session.status === 'created' || score == null ? '--' : `${score}%`}</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Confidence Score</p>
                            <div className="flex gap-2">
                                <span className="material-symbols-outlined text-primary text-sm" title="Document Valid">verified</span>
                                <span className="material-symbols-outlined text-primary text-sm" title="Biometric Match">face</span>
                                {score != null && score < 80 && <span className="material-symbols-outlined text-amber-500 text-sm" title="Manual Review Recommended">report_problem</span>}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">Reject</button>
                        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-green-500/20">Approve</button>
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <section>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">image</span> Document Preview
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                                <div className="aspect-[1.6/1] bg-slate-100 dark:bg-slate-900 relative">
                                    {frontDoc ? (
                                        <SecureImage
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/v1/identity/kyc/sessions/${session.id}/documents/${frontDoc.id}/image`}
                                            alt="Front ID"
                                            className="absolute inset-0 w-full h-full object-cover"
                                            fallbackIcon={<span className="material-symbols-outlined text-slate-300">credit_card</span>}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center p-4">
                                            <div className="w-full h-full border-2 border-dashed border-slate-300 rounded flex items-center justify-center">
                                                <span className="material-symbols-outlined text-slate-300">credit_card</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 flex-1 flex flex-col justify-end">
                                    <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">Front ID</p>
                                    <p className="text-[10px] text-slate-400">{frontDoc ? `Captured: ${format(new Date(frontDoc.createdAt), "HH:mm:ss")}` : 'Pending'}</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                                <div className="aspect-[1.6/1] bg-slate-100 dark:bg-slate-900 relative">
                                    {backDoc ? (
                                        <SecureImage
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/v1/identity/kyc/sessions/${session.id}/documents/${backDoc.id}/image`}
                                            alt="Back ID"
                                            className="absolute inset-0 w-full h-full object-cover"
                                            fallbackIcon={<span className="material-symbols-outlined text-slate-300">contact_mail</span>}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center p-4">
                                            <div className="w-full h-full border-2 border-dashed border-slate-300 rounded flex items-center justify-center">
                                                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">contact_mail</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 flex-1 flex flex-col justify-end">
                                    <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">Back ID</p>
                                    <p className="text-[10px] text-slate-400">{backDoc ? `Captured: ${format(new Date(backDoc.createdAt), "HH:mm:ss")}` : 'Pending'}</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                                <div className="aspect-[1.6/1] bg-slate-100 dark:bg-slate-900 relative">
                                    {selfieDoc ? (
                                        <SecureImage
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/v1/identity/kyc/sessions/${session.id}/documents/${selfieDoc.id}/image`}
                                            alt="Selfie"
                                            className="absolute inset-0 w-full h-full object-cover"
                                            fallbackIcon={<span className="material-symbols-outlined text-slate-300">face</span>}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center p-4">
                                            <div className="w-16 h-16 rounded-full border-4 border-slate-200 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-slate-300">face</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 flex-1 flex flex-col justify-end">
                                    <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">Selfie Liveness</p>
                                    <p className="text-[10px] text-slate-400">{selfieDoc ? `Captured: ${format(new Date(selfieDoc.createdAt), "HH:mm:ss")}` : 'Pending'}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-soft">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">description</span> Extracted OCR Fields
                            </h2>
                            <span className="text-xs text-slate-500">Auto-extracted via AI Vision Engine</span>
                        </div>
                        <div className="p-6 grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Full Name</p>
                                        <p className="text-slate-900 dark:text-white font-bold">{extracted.first_name || '--'} {extracted.last_name || '--'}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">ID Number</p>
                                        <p className="text-slate-900 dark:text-white font-mono font-bold">{extracted.id_number || '--'}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Date of Birth</p>
                                        <p className="text-slate-900 dark:text-white font-bold">{extracted.date_of_birth || '--'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Document Type</p>
                                        <p className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
                                            CNI {extracted.cni_type === 'new_biometric_td1' ? '(New Biometric)' : extracted.cni_type === 'old_laminated' ? '(Old Laminated)' : '(CMR)'}
                                            {extracted.mrz_present && (
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${extracted.mrz_valid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    MRZ {extracted.mrz_valid ? '✓ Valid' : '⚠ Unverified'}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Issue Date</p>
                                        <p className="text-slate-900 dark:text-white font-bold">{extracted.date_of_issue || '--'}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Expiry Date</p>
                                        <p className="text-slate-900 dark:text-white font-bold">{extracted.date_of_expiry || '--'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Decision Reasons Panel — shown when not verified */}
                    {(session.status === 'review_required' || session.status === 'rejected') && extracted.decision_reasons && extracted.decision_reasons.length > 0 && (
                        <section className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800 overflow-hidden shadow-soft">
                            <div className="p-5 border-b border-amber-200 dark:border-amber-800 flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-600">report_problem</span>
                                <h2 className="text-base font-bold text-amber-800 dark:text-amber-300">Reasons for {session.status === 'rejected' ? 'Rejection' : 'Manual Review'}</h2>
                            </div>
                            <ul className="p-5 space-y-2">
                                {(extracted.decision_reasons as string[]).map((reason: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-amber-900 dark:text-amber-200">
                                        <span className="material-symbols-outlined text-[16px] text-amber-500 mt-0.5 shrink-0">chevron_right</span>
                                        {reason}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {extracted.face_match_score !== undefined && (
                        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-soft flex items-center justify-between p-6">
                            <div className="flex items-center gap-6">
                                <div className="relative flex items-center">
                                    <div className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-800 shadow-md overflow-hidden bg-slate-100 relative z-10 flex items-center justify-center">
                                        {selfieDoc ? (
                                            <SecureImage
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/v1/identity/kyc/sessions/${session.id}/documents/${selfieDoc.id}/image`}
                                                alt="Selfie"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : <span className="material-symbols-outlined text-slate-400">person</span>}
                                    </div>
                                    <div className="w-16 h-16 rounded-full border-4 border-white dark:border-slate-800 shadow-md overflow-hidden bg-slate-100 relative -ml-6 flex items-center justify-center grayscale opacity-80">
                                        {frontDoc ? (
                                            <SecureImage
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/v1/identity/kyc/sessions/${session.id}/documents/${frontDoc.id}/image`}
                                                alt="ID Photo"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : <span className="material-symbols-outlined text-slate-400">badge</span>}

                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">Face Match Result</h2>
                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full text-white uppercase tracking-wider ${extracted.face_match_passed ? 'bg-emerald-500' : 'bg-red-500'}`}>
                                            {extracted.face_match_passed ? 'PASS' : 'FAIL'}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm">Biometric verification comparing ID document photo with live selfie capture.</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center min-w-[120px]">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Similarity</p>
                                <p className={`text-3xl font-bold ${extracted.face_match_score >= 80 ? 'text-emerald-500' : extracted.face_match_score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                                    {Math.round(extracted.face_match_score)}%
                                </p>
                            </div>
                        </section>
                    )}
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-soft h-full">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">history</span> Audit Timeline
                        </h2>
                        <div className="space-y-8 relative">
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-green-100 border-2 border-primary flex items-center justify-center z-10">
                                    <span className="material-symbols-outlined text-[12px] text-primary font-bold">check</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Session Created</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{format(new Date(session.created_at || new Date()), "MMM dd, yyyy • HH:mm:ss")}</p>
                                </div>
                                <div className="absolute left-3 top-6 w-0.5 h-16 bg-slate-200 dark:bg-slate-700"></div>
                            </div>
                            <div className="relative pl-8">
                                <div className={`absolute left-0 top-0 w-6 h-6 rounded-full ${session.status === 'processing' || session.status === 'created' ? 'bg-slate-100 border-slate-300' : 'bg-green-100 border-primary'} border-2 flex items-center justify-center z-10`}>
                                    {session.status !== 'processing' && session.status !== 'created' && <span className="material-symbols-outlined text-[12px] text-primary font-bold">settings</span>}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Processing Data</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{session.status === 'processing' ? 'Currently processing...' : 'Completed'}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
