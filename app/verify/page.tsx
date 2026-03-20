"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { uploadHostedDocument, submitHostedSession } from "@/lib/api";

function VerifyFlow() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const frontInputRef = useRef<HTMLInputElement>(null);
    const backInputRef = useRef<HTMLInputElement>(null);
    const selfieInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "back" | "selfie") => {
        if (!e.target.files || e.target.files.length === 0 || !token) return;
        const file = e.target.files[0];

        try {
            setIsSubmitting(true);
            setError(null);
            await uploadHostedDocument(token, file, type);
            // Move to next step
            setStep((prev) => prev + 1);
        } catch (err: any) {
            setError(err.message || "Failed to upload " + type);
        } finally {
            setIsSubmitting(false);
        }
    };

    const proceedToProcessing = async () => {
        if (!token) return;
        setStep(6);

        try {
            await submitHostedSession(token);
            setStep(7);
        } catch (err: any) {
            setError(err.message || "Failed to process session");
            setStep(5); // Back to selfie
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                Invalid or missing session token.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">

            {/* Header */}
            <div className="w-full max-w-lg flex justify-between items-center mb-8">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                        T
                    </div>
                    <span className="font-bold text-slate-900 text-xl tracking-tight">Tchedés</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-lg">lock</span>
                    <span className="uppercase tracking-wider text-xs">Secure Connection</span>
                </div>
            </div>

            {/* Stepper Card */}
            <div className="w-full max-w-lg bg-white rounded-[24px] shadow-xl overflow-hidden mb-8 border border-slate-100">

                {/* 1. Landing */}
                {step === 1 && (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl mx-auto flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-slate-700 text-3xl">domain</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Identity verification required</h1>
                        <p className="text-slate-500 mb-8">This process is required to verify your identity securely before proceeding.</p>

                        <div className="space-y-4 text-left mb-8">
                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-emerald-50 rounded-full text-emerald-500">
                                    <span className="material-symbols-outlined text-lg">lock</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm">Secure & encrypted</h3>
                                    <p className="text-slate-500 text-xs mt-0.5">Your data is protected with bank-grade encryption.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-emerald-50 rounded-full text-emerald-500">
                                    <span className="material-symbols-outlined text-lg">timer</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm">Takes less than 2 minutes</h3>
                                    <p className="text-slate-500 text-xs mt-0.5">Quick automated process with instant results.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-emerald-50 rounded-full text-emerald-500">
                                    <span className="material-symbols-outlined text-lg">gpp_good</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm">Regulatory compliance</h3>
                                    <p className="text-slate-500 text-xs mt-0.5">Used strictly for regulatory compliance purposes.</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => setStep(2)} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] transition-all text-white font-bold rounded-xl flex items-center justify-center space-x-2">
                            <span>Start verification</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                )}

                {/* 2. Prepare Identity Document */}
                {step === 2 && (
                    <div className="p-8">
                        <div className="h-40 bg-slate-50 border-b border-slate-100 -mx-8 -mt-8 mb-8 flex items-center justify-center relative overflow-hidden">
                            <div className="w-48 h-32 bg-white rounded-xl shadow-md border border-slate-200 relative p-4 flex flex-col justify-between">
                                <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-slate-100 rounded"></div>
                                    <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                                </div>
                                <div className="absolute top-2 right-2 text-emerald-500 animate-pulse">
                                    <span className="material-symbols-outlined">visibility</span>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Prepare your identity document</h1>
                        <p className="text-slate-500 text-sm mb-6">We need to verify your identity. Please make sure your document meets the following criteria before continuing.</p>

                        <div className="bg-slate-50 rounded-2xl p-5 mb-8 space-y-4 border border-slate-100">
                            <div className="flex items-start space-x-3">
                                <span className="material-symbols-outlined text-emerald-500 text-xl">check_circle</span>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm">Use the original document</h3>
                                    <p className="text-slate-500 text-xs">Photocopies and screenshots are not accepted.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="material-symbols-outlined text-emerald-500 text-xl">check_circle</span>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm">Make sure all edges are visible</h3>
                                    <p className="text-slate-500 text-xs">Place the document on a contrasting background.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="material-symbols-outlined text-emerald-500 text-xl">check_circle</span>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm">Avoid glare and shadows</h3>
                                    <p className="text-slate-500 text-xs">Ensure the text and photo are clearly readable.</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => setStep(3)} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] transition-all text-white font-bold rounded-xl flex items-center justify-center space-x-2">
                            <span>Continue</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>

                        <div className="text-center mt-4 text-xs text-slate-400">
                            By continuing, you agree to Tchedés <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                        </div>
                    </div>
                )}

                {/* 3. Front of your ID */}
                {step === 3 && (
                    <div className="p-8">
                        <div className="flex justify-center space-x-1 mb-6">
                            <div className="h-1.5 w-6 rounded-full bg-emerald-500"></div>
                            <div className="h-1.5 w-6 rounded-full bg-emerald-500"></div>
                            <div className="h-1.5 w-6 rounded-full bg-slate-200"></div>
                            <div className="h-1.5 w-6 rounded-full bg-slate-200"></div>
                            <div className="h-1.5 w-6 rounded-full bg-slate-200"></div>
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900 text-center mb-1">Front of your ID</h1>
                        <p className="text-slate-500 text-sm text-center mb-6">Position the front of your document within the frame.</p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-bold text-center">
                                {error}
                            </div>
                        )}

                        <div className="relative aspect-[16/10] bg-slate-900 rounded-2xl overflow-hidden mb-6 flex items-center justify-center group cursor-pointer" onClick={() => frontInputRef.current?.click()}>
                            <div className="absolute inset-4 border-2 border-dashed border-slate-500 opacity-50 rounded-xl transition-all group-hover:border-emerald-500"></div>
                            <div className="absolute top-4 left-4 border-t-4 border-l-4 border-white w-8 h-8 rounded-tl-xl transition-all group-hover:border-emerald-500 group-hover:w-10 group-hover:h-10"></div>
                            <div className="absolute top-4 right-4 border-t-4 border-r-4 border-white w-8 h-8 rounded-tr-xl transition-all group-hover:border-emerald-500 group-hover:w-10 group-hover:h-10"></div>
                            <div className="absolute bottom-4 left-4 border-b-4 border-l-4 border-white w-8 h-8 rounded-bl-xl transition-all group-hover:border-emerald-500 group-hover:w-10 group-hover:h-10"></div>
                            <div className="absolute bottom-4 right-4 border-b-4 border-r-4 border-white w-8 h-8 rounded-br-xl transition-all group-hover:border-emerald-500 group-hover:w-10 group-hover:h-10"></div>

                            <div className="absolute w-full h-1 bg-emerald-500/50 blur-sm top-1/2 animate-[scan_2s_ease-in-out_infinite]"></div>

                            <div className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-2 backdrop-blur-md">
                                <span className="material-symbols-outlined text-[16px]">crop_free</span>
                                <span>Align your ID within the frame</span>
                            </div>
                        </div>

                        <div className="flex justify-center mb-6">
                            <button disabled={isSubmitting} onClick={() => frontInputRef.current?.click()} className="w-16 h-16 rounded-full bg-emerald-500 border-4 border-white outline outline-2 outline-emerald-500 flex items-center justify-center transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-wait">
                                {isSubmitting ? (
                                    <span className="material-symbols-outlined text-white animate-spin">refresh</span>
                                ) : null}
                            </button>
                        </div>

                        <div className="text-center">
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                ref={frontInputRef}
                                onChange={(e) => handleFileUpload(e, "front")}
                            />
                            <button disabled={isSubmitting} onClick={() => frontInputRef.current?.click()} className="text-sm font-semibold text-slate-500 hover:text-slate-700 flex items-center justify-center mx-auto space-x-2 disabled:opacity-50">
                                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                <span>{isSubmitting ? "Uploading..." : "Upload photo from device"}</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* 4. Back of your ID */}
                {step === 4 && (
                    <div className="p-8">
                        <div className="flex justify-center space-x-1 mb-6">
                            <div className="h-1.5 w-6 rounded-full bg-emerald-500"></div>
                            <div className="h-1.5 w-6 rounded-full bg-emerald-500"></div>
                            <div className="h-1.5 w-6 rounded-full bg-emerald-500"></div>
                            <div className="h-1.5 w-6 rounded-full bg-slate-200"></div>
                            <div className="h-1.5 w-6 rounded-full bg-slate-200"></div>
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900 text-center mb-1">Back of your ID</h1>
                        <p className="text-slate-500 text-sm text-center mb-6">Now, position the back of your document within the frame.</p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-bold text-center">
                                {error}
                            </div>
                        )}

                        <div className="relative aspect-[16/10] bg-slate-900 rounded-2xl overflow-hidden mb-6 flex items-center justify-center group cursor-pointer" onClick={() => backInputRef.current?.click()}>
                            <div className="absolute inset-4 border-2 border-dashed border-slate-500 opacity-50 rounded-xl transition-all group-hover:border-emerald-500"></div>
                            <div className="absolute top-4 left-4 border-t-4 border-l-4 border-white w-8 h-8 rounded-tl-xl transition-all group-hover:border-emerald-500 group-hover:w-10 group-hover:h-10"></div>
                            <div className="absolute top-4 right-4 border-t-4 border-r-4 border-white w-8 h-8 rounded-tr-xl transition-all group-hover:border-emerald-500 group-hover:w-10 group-hover:h-10"></div>
                            <div className="absolute bottom-4 left-4 border-b-4 border-l-4 border-white w-8 h-8 rounded-bl-xl transition-all group-hover:border-emerald-500 group-hover:w-10 group-hover:h-10"></div>
                            <div className="absolute bottom-4 right-4 border-b-4 border-r-4 border-white w-8 h-8 rounded-br-xl transition-all group-hover:border-emerald-500 group-hover:w-10 group-hover:h-10"></div>

                            <div className="absolute w-full h-1 bg-emerald-500/50 blur-sm top-1/2 animate-[scan_2s_ease-in-out_infinite]"></div>

                            <div className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-2 backdrop-blur-md">
                                <span className="material-symbols-outlined text-[16px]">crop_free</span>
                                <span>Align the back of your ID</span>
                            </div>
                        </div>

                        <div className="flex justify-center mb-6">
                            <button disabled={isSubmitting} onClick={() => backInputRef.current?.click()} className="w-16 h-16 rounded-full bg-emerald-500 border-4 border-white outline outline-2 outline-emerald-500 flex items-center justify-center transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-wait">
                                {isSubmitting ? (
                                    <span className="material-symbols-outlined text-white animate-spin">refresh</span>
                                ) : null}
                            </button>
                        </div>

                        <div className="text-center">
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                ref={backInputRef}
                                onChange={(e) => handleFileUpload(e, "back")}
                            />
                            <button disabled={isSubmitting} onClick={() => backInputRef.current?.click()} className="text-sm font-semibold text-slate-500 hover:text-slate-700 flex items-center justify-center mx-auto space-x-2 disabled:opacity-50">
                                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                <span>{isSubmitting ? "Uploading..." : "Upload photo from device"}</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* 5. Selfie Capture */}
                {step === 5 && (
                    <div className="p-8">
                        <div className="flex justify-center space-x-1 mb-6">
                            <div className="h-1.5 w-6 rounded-full bg-emerald-500"></div>
                            <div className="h-1.5 w-6 rounded-full bg-emerald-500"></div>
                            <div className="h-1.5 w-6 rounded-full bg-emerald-500"></div>
                            <div className="h-1.5 w-6 rounded-full bg-emerald-500"></div>
                            <div className="h-1.5 w-6 rounded-full bg-slate-200"></div>
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900 text-center mb-1">Take a clear selfie</h1>
                        <p className="text-slate-500 text-sm text-center mb-6">We'll match this photo with your ID document.</p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-bold text-center">
                                {error}
                            </div>
                        )}

                        <div className="relative aspect-square bg-slate-800 rounded-2xl overflow-hidden mb-6 flex items-center justify-center group cursor-pointer" onClick={() => selfieInputRef.current?.click()}>

                            <div className="absolute top-4 bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full flex items-center space-x-2 backdrop-blur-md">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                <span>Camera Active</span>
                            </div>

                            <div className="w-48 h-48 rounded-full border border-white/30 relative">
                                <div className="absolute -top-2 -left-2 border-t-4 border-l-4 border-emerald-500 w-8 h-8 rounded-tl-xl"></div>
                                <div className="absolute -top-2 -right-2 border-t-4 border-r-4 border-emerald-500 w-8 h-8 rounded-tr-xl"></div>
                                <div className="absolute -bottom-2 -left-2 border-b-4 border-l-4 border-emerald-500 w-8 h-8 rounded-bl-xl"></div>
                                <div className="absolute -bottom-2 -right-2 border-b-4 border-r-4 border-emerald-500 w-8 h-8 rounded-br-xl"></div>
                            </div>
                        </div>

                        <div className="bg-white border text-center border-slate-100 shadow-sm rounded-xl p-4 mb-6 relative z-10 -mt-12 mx-4">
                            <div className="flex border-b border-slate-100 pb-3 mb-3">
                                <div className="flex-1 border-r border-slate-100 px-2 flex flex-col items-center">
                                    <span className="material-symbols-outlined text-yellow-500 bg-yellow-50 p-1.5 rounded-full mb-2">light_mode</span>
                                    <p className="text-[10px] font-bold text-slate-800 mb-0.5">Ensure good lighting</p>
                                    <p className="text-[9px] text-slate-500 leading-tight">Avoid shadows and glare</p>
                                </div>
                                <div className="flex-1 px-2 flex flex-col items-center">
                                    <span className="material-symbols-outlined text-slate-600 bg-slate-100 p-1.5 rounded-full mb-2">face</span>
                                    <p className="text-[10px] font-bold text-slate-800 mb-0.5">Remove accessories</p>
                                    <p className="text-[9px] text-slate-500 leading-tight">Take off glasses or hats</p>
                                </div>
                            </div>
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            capture="user"
                            className="hidden"
                            ref={selfieInputRef}
                            onChange={async (e) => {
                                await handleFileUpload(e, "selfie");
                                proceedToProcessing();
                            }}
                        />
                        <button disabled={isSubmitting} onClick={() => selfieInputRef.current?.click()} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] transition-all text-white font-bold rounded-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-wait">
                            <span className="material-symbols-outlined">{isSubmitting ? "refresh" : "photo_camera"}</span>
                            <span>{isSubmitting ? "Uploading..." : "Take Selfie"}</span>
                        </button>
                    </div>
                )}

                {/* 6. Processing step acts as a bridge! Provide a manual button to submit or auto-submit */}
                {step === 6 && (
                    <div className="p-12 text-center h-[400px] flex flex-col items-center justify-center">
                        <div className="relative w-24 h-24 mb-8">
                            <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl text-emerald-500">verified</span>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Documents Uploaded</h1>
                        <p className="text-slate-500 text-sm mb-6">Ready to securely verify your identity...</p>

                        <div className="mb-4">
                            {error && <div className="text-red-500 text-sm mb-4 font-bold max-w-xs">{error}</div>}
                            <button onClick={proceedToProcessing} disabled={isSubmitting} className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all active:scale-[0.98]">
                                Confirm and Submit
                            </button>
                        </div>

                        <p className="text-xs text-slate-400 max-w-xs mx-auto">
                            Please do not close your browser or refresh the page while we secure your data.
                        </p>
                    </div>
                )}

                {/* 7. Success */}
                {step === 7 && (
                    <div className="p-10 text-center">
                        <div className="w-20 h-20 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center mx-auto mb-6 transition-all scale-in">
                            <span className="material-symbols-outlined text-4xl text-white">check</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-3">Verification submitted</h1>
                        <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                            Your information has been securely submitted. You may now close this window. Results will be sent to the organization.
                        </p>

                        <button className="w-full py-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all text-white font-bold rounded-xl mb-4">
                            Close Window
                        </button>

                        <button className="text-sm font-semibold text-slate-500 hover:text-slate-700">
                            Return to merchant
                        </button>
                    </div>
                )}

                {/* Global Footer inside Card */}
                {step !== 1 && step !== 6 && step !== 7 && (
                    <div className="border-t border-slate-100 p-4 bg-slate-50 flex items-center justify-center space-x-2 text-xs text-slate-400">
                        <span className="material-symbols-outlined text-[16px]">verified_user</span>
                        <span>Encrypted & securely processed</span>
                    </div>
                )}
            </div>

            {/* Global Outside Footer */}
            <div className="w-full max-w-lg flex justify-between text-xs text-slate-400 font-medium px-2">
                <div className="flex items-center space-x-1.5">
                    <span className="material-symbols-outlined text-[14px]">shield</span>
                    <span>BANK-GRADE SECURITY</span>
                </div>
                <div>Powered by Tchedés Infrastructure</div>
            </div>

        </div>
    );
}

// Wrapper to avoid Next.js useSearchParams errors
export default function HostedFlowPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
            <VerifyFlow />
        </Suspense>
    );
}
