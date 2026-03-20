"use client";

import { useState } from "react";
import { generateHostedLink } from "@/lib/api";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (url: string) => void;
};

export default function CreateVerificationDrawer({ isOpen, onClose, onSuccess }: Props) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [referenceId, setReferenceId] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("CM");

    const [verifyType, setVerifyType] = useState("KYC");
    const [documentType, setDocumentType] = useState("CM_CNI");

    const [method, setMethod] = useState("hosted");
    const [redirectUrl, setRedirectUrl] = useState("");
    const [redirectUrlFail, setRedirectUrlFail] = useState("");
    const [useBranding, setUseBranding] = useState(true);

    const [expiration, setExpiration] = useState(15);
    const [singleUse, setSingleUse] = useState(true);

    const [sendWebhook, setSendWebhook] = useState(true);

    const [createdUrl, setCreatedUrl] = useState<string | null>(null);

    const handleNext = () => {
        if (step === 1 && !referenceId) {
            setError("Reference ID is required.");
            return;
        }
        if (step === 2 && !redirectUrl) {
            setError("Redirect URL (success) is required for hosted flow.");
            return;
        }
        setError(null);
        setStep((s) => Math.min(s + 1, 3));
    };

    const handleBack = () => {
        setError(null);
        setStep((s) => Math.max(s - 1, 1));
    };

    const handleCreate = async () => {
        try {
            setIsSubmitting(true);
            setError(null);
            const data = await generateHostedLink({
                reference_id: referenceId,
                document_type: documentType,
                redirect_url: redirectUrl
            });
            setCreatedUrl(data.hosted_url);
            onSuccess(data.hosted_url);
            setStep(4); // Success step
        } catch (err: any) {
            setError(err.message || "Failed to create verification");
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyToClipboard = () => {
        if (createdUrl) {
            navigator.clipboard.writeText(createdUrl);
            alert("URL Copied to clipboard!");
        }
    };

    const resetForm = () => {
        setStep(1);
        setReferenceId("");
        setEmail("");
        setPhone("");
        setRedirectUrl("");
        setRedirectUrlFail("");
        setCreatedUrl(null);
        setError(null);
    };

    return (
        <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"}`}>
            <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={onClose} />

            <div className={`relative w-full max-w-xl bg-slate-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                {/* Header */}
                <div className="bg-white border-b border-slate-100 p-6">
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="text-xl font-bold text-slate-900">Create a verification</h2>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                    <p className="text-sm text-slate-500 mb-6">Generate a hosted link or start a session for your user</p>

                    {/* Stepper */}
                    {step < 4 && (
                        <div className="flex items-center space-x-2 text-sm font-medium">
                            <div className={`flex items-center \${step === 1 ? 'text-primary' : step > 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs \${step === 1 ? 'bg-primary text-white' : step > 1 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    {step > 1 ? <span className="material-symbols-outlined text-[14px]">check</span> : "1"}
                                </div>
                                Subject
                            </div>
                            <div className="w-8 h-px bg-slate-200"></div>
                            <div className={`flex items-center \${step === 2 ? 'text-primary' : step > 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs \${step === 2 ? 'bg-primary text-white' : step > 2 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    {step > 2 ? <span className="material-symbols-outlined text-[14px]">check</span> : "2"}
                                </div>
                                Flow
                            </div>
                            <div className="w-8 h-px bg-slate-200"></div>
                            <div className={`flex items-center \${step === 3 ? 'text-primary' : 'text-slate-400'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs \${step === 3 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    3
                                </div>
                                Review
                            </div>
                        </div>
                    )}
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-medium flex items-center">
                            <span className="material-symbols-outlined mr-2">error</span>
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-6">
                            {/* Card 1: User reference */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-4">User reference</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Reference ID <span className="text-red-500">*</span></label>
                                        <input type="text" value={referenceId} onChange={(e) => setReferenceId(e.target.value)} placeholder="usr_00124" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                        <p className="text-xs text-slate-500 mt-1.5">Your internal user identifier (we’ll return it in webhooks).</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">Email <span className="text-slate-400 font-normal">(optional)</span></label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">Phone <span className="text-slate-400 font-normal">(optional)</span></label>
                                            <div className="flex border border-slate-200 rounded-xl bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                                                <span className="bg-slate-100 px-3 py-2.5 border-r border-slate-200 text-sm text-slate-600 font-medium">+237</span>
                                                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="6XX XX XX XX" className="w-full bg-transparent px-3 py-2.5 text-sm focus:outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Country <span className="text-red-500">*</span></label>
                                        <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-700">
                                            <option value="CM">Cameroon (CM)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Verification type */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-4">Verification type</h3>
                                <div className="space-y-5">
                                    <div className="flex space-x-4">
                                        <label className={`flex-1 flex items-center p-3 border rounded-xl cursor-pointer transition-all \${verifyType === 'KYC' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 hover:border-slate-300'}`}>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 \${verifyType === 'KYC' ? 'border-primary' : 'border-slate-300'}`}>
                                                {verifyType === 'KYC' && <div className="w-2 h-2 rounded-full bg-primary" />}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">Identity (KYC)</div>
                                            </div>
                                        </label>
                                        <label className="flex-1 flex items-center p-3 border border-slate-200 rounded-xl opacity-50 cursor-not-allowed bg-slate-50">
                                            <div className="w-4 h-4 rounded-full border border-slate-300 mr-3"></div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-700">Business (KYB)</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Soon</div>
                                            </div>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Document type</label>
                                        <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-700">
                                            <option value="CM_CNI">Cameroon National ID (CM_CNI)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            {/* Card 1: Method */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-4">Method</h3>
                                <div className="space-y-3">
                                    <label className={`flex items-start p-3 border rounded-xl cursor-pointer transition-all \${method === 'hosted' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center mr-3 \${method === 'hosted' ? 'border-primary' : 'border-slate-300'}`}>
                                            {method === 'hosted' && <div className="w-2 h-2 rounded-full bg-primary" />}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 flex items-center">
                                                Hosted link
                                                <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">recommended</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">We host the capture flow. Fastest integration.</p>
                                        </div>
                                    </label>
                                    <label className="flex items-start p-3 border border-slate-200 rounded-xl opacity-50 cursor-not-allowed bg-slate-50">
                                        <div className="mt-0.5 w-4 h-4 rounded-full border border-slate-300 mr-3"></div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-700">Direct API session</div>
                                            <p className="text-xs text-slate-500 mt-1">You'll build your own UI; we only provide endpoints. (Advanced)</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Card 2: Redirects & Branding */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in duration-300">
                                <h3 className="text-base font-bold text-slate-900 mb-4">Redirects & branding</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Redirect URL (success) <span className="text-red-500">*</span></label>
                                        <input type="url" value={redirectUrl} onChange={(e) => setRedirectUrl(e.target.value)} placeholder="https://yourapp.com/kyc/success" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Redirect URL (failure/cancel) <span className="text-slate-400 font-normal">(optional)</span></label>
                                        <input type="url" value={redirectUrlFail} onChange={(e) => setRedirectUrlFail(e.target.value)} placeholder="https://yourapp.com/kyc/cancel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                    </div>
                                    <div className="pt-2 flex items-center justify-between">
                                        <div className="text-sm font-semibold text-slate-700">Use tenant branding</div>
                                        <button onClick={() => setUseBranding(!useBranding)} className={`w-10 h-6 rounded-full p-1 transition-colors \${useBranding ? 'bg-primary' : 'bg-slate-200'}`}>
                                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform \${useBranding ? 'translate-x-4' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Expiration */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-4">Expiration & security</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Link Expiration</label>
                                        <select value={expiration} onChange={(e) => setExpiration(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-700">
                                            <option value={15}>15 min (recommended)</option>
                                            <option value={30}>30 min</option>
                                            <option value={60}>60 min</option>
                                        </select>
                                    </div>
                                    <div className="pt-2 flex items-start justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-slate-700">Single-use token</div>
                                            <div className="text-xs text-slate-500 mt-1 max-w-[250px]">Token becomes invalid after final submission.</div>
                                        </div>
                                        <div className="w-10 h-6 rounded-full p-1 bg-slate-300 opacity-70 flex items-center shrink-0 cursor-not-allowed">
                                            <div className="w-4 h-4 rounded-full bg-white shadow-sm translate-x-4 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[10px] text-slate-400">lock</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Webhook */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-base font-bold text-slate-900">Webhook behavior</h3>
                                    <button onClick={() => setSendWebhook(!sendWebhook)} className={`w-10 h-6 rounded-full p-1 transition-colors \${sendWebhook ? 'bg-primary' : 'bg-slate-200'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform \${sendWebhook ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500">Send a webhook to your configured endpoints when the verification succeeds or fails.</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-[80px] opacity-30 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                                <h3 className="text-lg font-bold mb-4">Summary</h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between border-b border-white/10 pb-3">
                                        <span className="text-slate-400">Type</span>
                                        <span className="font-semibold text-white">Identity (KYC)</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-3">
                                        <span className="text-slate-400">Document</span>
                                        <span className="font-semibold text-white">CM_CNI (Front & Selfie req.)</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-3">
                                        <span className="text-slate-400">Reference ID</span>
                                        <span className="font-mono text-emerald-400">{referenceId}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-3">
                                        <span className="text-slate-400">Method</span>
                                        <span className="font-semibold text-white">Hosted link</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-3">
                                        <span className="text-slate-400">Expiration</span>
                                        <span className="font-semibold text-white">{expiration} min</span>
                                    </div>
                                    <div className="flex flex-col space-y-1 pt-1">
                                        <span className="text-slate-400">Redirect URL</span>
                                        <span className="font-medium text-emerald-400 text-xs break-all">{redirectUrl}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-4">What will happen</h3>
                                <div className="space-y-4">
                                    <div className="flex">
                                        <div className="flex flex-col items-center mr-4">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                                            <div className="w-px h-8 bg-slate-200 mt-1"></div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Link generated</div>
                                            <div className="text-xs text-slate-500 mt-0.5">We will generate a unique, short-lived secure URL.</div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex flex-col items-center mr-4">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                                            <div className="w-px h-8 bg-slate-200 mt-1"></div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">User completes flow</div>
                                            <div className="text-xs text-slate-500 mt-0.5">Captures ID front and selfie on our hosted page.</div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex flex-col items-center mr-4">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                                            <div className="w-px h-8 bg-slate-200 mt-1"></div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Decision engine & Redirect</div>
                                            <div className="text-xs text-slate-500 mt-0.5">We process data async securely and redirect the user back.</div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex flex-col items-center mr-4">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5 ring-4 ring-primary/20"></div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Webhook delivery</div>
                                            <div className="text-xs text-slate-500 mt-0.5">Results successfully sent to your system.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-500">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50">
                                <span className="material-symbols-outlined text-[40px] text-green-500">check_circle</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Verification created</h2>
                            <p className="text-sm text-slate-500 mb-8 max-w-xs">Your secure hosted link is ready. Share it with the user to begin verification.</p>

                            <div className="w-full bg-white border border-slate-200 rounded-xl p-4 mb-6 relative overflow-hidden group">
                                <div className="text-xs font-bold text-slate-400 mb-2 text-left">HOSTED LINK</div>
                                <div className="text-sm font-mono text-slate-700 text-left break-all select-all pr-8">
                                    {createdUrl}
                                </div>
                                <button onClick={copyToClipboard} className="absolute right-2 top-10 p-2 text-slate-400 hover:text-primary transition-colors bg-white rounded-md">
                                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                </button>
                            </div>

                            <a href={createdUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all text-white font-bold rounded-xl flex items-center justify-center space-x-2 mb-4">
                                <span>Open link in new tab</span>
                                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </a>

                            <button onClick={resetForm} className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                                Create another verification
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer sticky */}
                {step < 4 && (
                    <div className="border-t border-slate-200 bg-white p-6 grid grid-cols-2 gap-4 sticky bottom-0 z-10">
                        <button onClick={step === 1 ? onClose : handleBack} className="py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all">
                            {step === 1 ? 'Cancel' : 'Back'}
                        </button>
                        {step < 3 ? (
                            <button onClick={handleNext} className="py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2">
                                <span>Next step</span>
                                <span className="material-symbols-outlined text-[18px]">east</span>
                            </button>
                        ) : (
                            <button onClick={handleCreate} disabled={isSubmitting} className="py-3.5 bg-primary hover:opacity-90 active:scale-[0.98] text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-70">
                                {isSubmitting ? (
                                    <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
                                ) : (
                                    <>
                                        <span>Create verification</span>
                                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
