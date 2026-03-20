"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function LoginPage() {
    const [accountType, setAccountType] = useState<"individual" | "business">("business");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const result = await login({ email, password });
            if (result.token) {
                // Set cookie for Next.js Middleware (expires in 24 hours for MVP)
                document.cookie = `tchedes_auth_token=${result.token}; path=/; max-age=86400; SameSite=Lax`;

                // For MVP: Also keep in localStorage for easy client-side access if needed
                localStorage.setItem("tchedes_auth_token", result.token);
                // Also store user info for dashboard header/sidebar
                localStorage.setItem("tchedes_user", JSON.stringify(result.user));

                setIsSuccess(true);
                // Delay redirect to show success animation
                setTimeout(() => {
                    router.push("/overview");
                }, 1500);
            }
        } catch (err: any) {
            setError(err.message || "An error occurred during login.");
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-card overflow-hidden flex min-h-[700px]">
            {/* Left Column - Form */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                <div className="mb-8">
                    <Link className="flex items-center space-x-2 mb-8" href="/">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-display font-bold text-xl">T</div>
                        <span className="text-2xl font-bold font-display tracking-tight text-slate-900">Tchedés</span>
                    </Link>
                    <h1 className="text-3xl font-bold font-display text-slate-900 mb-2">Welcome back</h1>
                    <p className="text-slate-500 text-lg">Log in to manage your compliance engine.</p>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
                    <button
                        onClick={() => { setAccountType("individual"); setError(null); }}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${accountType === "individual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        Individual
                    </button>
                    <button
                        onClick={() => { setAccountType("business"); setError(null); }}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${accountType === "business" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        Business
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-bold animate-pulse">
                        {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleLogin}>
                    {accountType === "business" ? (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="work-email">Work email</label>
                            <input required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400 outline-none" id="work-email" placeholder="name@company.com" type="email" />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">Email address</label>
                            <input required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400 outline-none" id="email" placeholder="you@example.com" type="email" />
                        </div>
                    )}

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
                            <Link href="/forgot-password" className="text-sm font-bold text-primary hover:text-primary-dark">Forgot password?</Link>
                        </div>
                        <input required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400 outline-none" id="password" placeholder="Enter your password" type="password" />
                    </div>

                    <button disabled={isLoading || isSuccess} className={`w-full font-bold py-3.5 rounded-xl shadow-lg transition-all transform active:scale-[0.98] mt-4 disabled:opacity-80 flex items-center justify-center space-x-2 ${isSuccess ? 'bg-emerald-500 shadow-emerald-500/30 text-white' : 'bg-primary hover:bg-primary-dark shadow-primary/30 text-white'}`} type="submit">
                        {isSuccess ? (
                            <>
                                <span>Sign in successful! Redirecting...</span>
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            </>
                        ) : isLoading ? (
                            <>
                                <span>Signing in...</span>
                                <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </button>

                    <div className="flex items-center gap-4 my-6">
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <span className="text-sm text-slate-400 font-medium">OR CONTINUE WITH</span>
                        <div className="h-px bg-slate-200 flex-1"></div>
                    </div>

                    <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2" type="button">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 bg-white rounded-full" />
                        Sign in with Google
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        Don't have an account?
                        <Link className="text-primary font-bold hover:text-primary-dark hover:underline ml-1" href="/register">Sign up</Link>
                    </p>
                </div>
                <div className="mt-auto pt-10 text-xs text-slate-400">
                    © 2023 Tchedés Compliance Engine. All rights reserved.
                </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
                <div className="relative z-10 w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6 transform translate-x-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">Identity Verification</h3>
                                    <p className="text-slate-400 text-xs">Automated KYC Checks</p>
                                </div>
                            </div>
                            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">LIVE</span>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 bg-white/10 rounded-full w-3/4"></div>
                            <div className="h-2 bg-white/10 rounded-full w-1/2"></div>
                        </div>
                        <div className="mt-6 flex justify-between items-end">
                            <div className="text-3xl font-bold text-white">99.9%</div>
                            <div className="text-green-400 text-sm font-medium">+12% Accuracy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
