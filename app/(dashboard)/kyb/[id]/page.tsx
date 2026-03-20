"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"

// ─── Demo Data ─────────
const DEMO_KYB: Record<string, any> = {
    "kyb_5678def": {
        id: "kyb_5678def",
        reference_id: "REF-1192-CM",
        company_name: "NeoBank S.A.",
        country: "CM",
        registration_number: "RC/YDE/2023/M/456",
        company_type: "SA",
        incorporation_date: "2023-04-15",
        registered_address: "Rue de la Réunification, Yaoundé, Cameroun",
        status: "review_required",
        confidence_score: 82,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        Documents: [
            { id: "doc_1", type: "rccm", s3_key: "/uploads/rccm-neobank.jpg", createdAt: new Date().toISOString() },
        ],
        Directors: [
            { id: "dir_1", full_name: "Jean Baptiste Mbeng", nationality: "CM", ownership_percentage: 60, KycSession: { id: "kyc_abc", status: "verified" } },
            { id: "dir_2", full_name: "Laure Ngono", nationality: "CM", ownership_percentage: 40, KycSession: { id: "kyc_def", status: "review_required" } },
        ]
    }
}

const TIMELINE = [
    { icon: "security", color: "text-blue-500", label: "KYB Session Created", time: "Mar 5, 2026 10:00" },
    { icon: "description", color: "text-purple-500", label: "RCCM Document Uploaded", time: "Mar 5, 2026 10:03" },
    { icon: "group", color: "text-teal-500", label: "Director Jean Baptiste Mbeng added – KYC Spawned", time: "Mar 5, 2026 10:05" },
    { icon: "group", color: "text-teal-500", label: "Director Laure Ngono added – KYC Spawned", time: "Mar 5, 2026 10:06" },
    { icon: "check_circle", color: "text-emerald-500", label: "Director KYC Verified (Jean Baptiste Mbeng)", time: "Mar 5, 2026 10:30" },
    { icon: "error", color: "text-amber-500", label: "KYB Flagged for Review – Director KYC pending", time: "Mar 5, 2026 10:31" },
]

const getStatusBadge = (status: string) => {
    switch (status) {
        case "verified":
            return <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"><span className="material-symbols-outlined text-[14px] mr-1">check_circle</span> Verified</div>
        case "rejected":
            return <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800"><span className="material-symbols-outlined text-[14px] mr-1">cancel</span> Rejected</div>
        case "review_required":
            return <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"><span className="material-symbols-outlined text-[14px] mr-1">error</span> Review Required</div>
        default:
            return <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 animate-pulse"><span className="material-symbols-outlined text-[14px] mr-1">schedule</span> Processing</div>
    }
}

export default function KYBDetailPage({ params }: { params: { id: string } }) {
    const session = DEMO_KYB[params.id] || DEMO_KYB["kyb_5678def"]
    const [approveLoading, setApproveLoading] = useState(false)
    const [rejectLoading, setRejectLoading] = useState(false)

    if (!session) {
        return <div className="p-8 text-slate-500 text-center mt-10">KYB Session not found.</div>
    }

    return (
        <div className="flex-1 overflow-y-auto p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-start gap-4">
                    <Link href="/kyb">
                        <button className="text-slate-500 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 transition-colors mt-1">
                            <span className="material-symbols-outlined text-xl">arrow_back</span>
                        </button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{session.company_name}</h2>
                            {getStatusBadge(session.status)}
                        </div>
                        <p className="text-sm text-slate-500 font-mono flex items-center gap-2">
                            <span className="font-semibold text-slate-700">{session.reference_id}</span>
                            <span className="text-slate-300">|</span>
                            {session.id}
                            <span className="text-slate-300">|</span>
                            Confidence: <span className="font-bold text-slate-700">{session.confidence_score ?? "—"}%</span>
                        </p>
                    </div>
                </div>
                {session.status === "review_required" && (
                    <div className="flex items-center gap-3">
                        <button
                            className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                            disabled={rejectLoading}
                            onClick={() => setRejectLoading(true)}
                        >
                            <span className="material-symbols-outlined text-[18px]">cancel</span>
                            Reject Business
                        </button>
                        <button
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
                            disabled={approveLoading}
                            onClick={() => setApproveLoading(true)}
                        >
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            Approve Verification
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Section 1 – Company Information */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                            <span className="material-symbols-outlined text-primary">domain</span>
                            <h3 className="text-lg font-bold text-slate-800">Company Information</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            {[
                                { label: "Company Name", value: session.company_name },
                                { label: "Country", value: session.country },
                                { label: "Registration Number", value: session.registration_number, isMono: true },
                                { label: "Company Type", value: session.company_type },
                                { label: "Incorporation Date", value: session.incorporation_date },
                                { label: "Registered Address", value: session.registered_address, fullWidth: true },
                            ].map(({ label, value, isMono, fullWidth }) => (
                                <div key={label} className={fullWidth ? "col-span-2" : ""}>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                                    <p className={\`text-sm font-medium text-slate-800 \${isMono ? 'font-mono' : ''}\`}>{value || "—"}</p>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Section 2 – Company Documents */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                        <span className="material-symbols-outlined text-primary">description</span>
                        <h3 className="text-lg font-bold text-slate-800">Corporate Documents</h3>
                    </div>
                    {session.Documents.length === 0 ? (
                        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">description</span>
                            <p className="text-sm">No documents uploaded yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {session.Documents.map((doc: any) => (
                                <div key={doc.id} className="border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:border-primary hover:bg-slate-50 transition-all group">
                                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-blue-600">article</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-800 uppercase">{doc.type}</p>
                                        <p className="text-[11px] text-slate-400 truncate font-mono mt-0.5">{doc.s3_key}</p>
                                    </div>
                                    <a href={doc.s3_key} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Section 3 – Directors / UBO */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">group</span>
                            <h3 className="text-lg font-bold text-slate-800">Directors & UBOs</h3>
                        </div>
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold">{session.Directors.length}</span>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Full Name</th>
                                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nationality</th>
                                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ownership</th>
                                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">KYC Status</th>
                                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {session.Directors.map((dir: any) => (
                                <tr key={dir.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-sm text-slate-800">{dir.full_name}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">{dir.nationality}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-600">{dir.ownership_percentage}%</td>
                                    <td className="px-6 py-4">
                                        {dir.KycSession ? getStatusBadge(dir.KycSession.status) : <span className="text-slate-400 text-sm">—</span>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {dir.KycSession && (
                                            <Link href={\`/sessions/\${dir.KycSession.id}\`}>
                                        <button className="text-primary hover:text-primary-dark font-semibold text-sm flex items-center gap-1 justify-end ml-auto">
                                            View KYC <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </button>
                                    </Link>
                                            )}
                                </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        </div>

                {/* Section 4 – Audit Timeline */ }
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit sticky top-6">
        <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
            <span className="material-symbols-outlined text-primary">history</span>
            <h3 className="text-lg font-bold text-slate-800">Audit Timeline</h3>
        </div>
        <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
            {TIMELINE.map((event, i) => (
                            <div key={i} className="relative pl-6">
                                <span className={\`material-symbols-outlined absolute -left-[17px] top-0 bg-white text-[28px] \${event.color}\`}>
                                    {event.icon}
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 leading-tight mb-1">{event.label}</p>
                                    <p className="text-xs font-mono text-slate-400">{event.time}</p>
                                </div>
                            </div>
                        ))}
    </div>
                </div >
            </div >
        </div >
    )
}
