"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerBusiness, registerIndividual } from "@/lib/api";

export default function RegisterPage() {
    const [accountType, setAccountType] = useState<"individual" | "business">("business");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        password: "",
        role: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            let result;
            if (accountType === "business") {
                result = await registerBusiness({
                    companyName: formData.companyName,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                });
            } else {
                result = await registerIndividual({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                });
            }

            if (result.token) {
                // Set cookie for Next.js Middleware
                document.cookie = `tchedes_auth_token=${result.token}; path=/; max-age=86400; SameSite=Lax`;

                localStorage.setItem("tchedes_auth_token", result.token);
                localStorage.setItem("tchedes_user", JSON.stringify(result.user));
                router.push("/overview");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred during registration.");
        } finally {
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
                    <h1 className="text-3xl font-bold font-display text-slate-900 mb-2">Create your Tchedés account</h1>
                    <p className="text-slate-500 text-lg">Start building compliant products in minutes.</p>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
                    <button
                        onClick={() => { setAccountType("individual"); setError(null); }}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${accountType === "individual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                        type="button"
                    >
                        Individual
                    </button>
                    <button
                        onClick={() => { setAccountType("business"); setError(null); }}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${accountType === "business" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                        type="button"
                    >
                        Business
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-bold animate-pulse">
                        {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleRegister}>
                    {accountType === "business" ? (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="companyName">Company name</label>
                                <input required value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400 outline-none" id="companyName" placeholder="e.g. Acme Fintech" type="text" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">Work email</label>
                                <input required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400 outline-none" id="email" placeholder="name@company.com" type="email" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="role">I am a...</label>
                                <div className="relative">
                                    <select required value={formData.role} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 appearance-none bg-white outline-none" id="role">
                                        <option disabled value="">Select your role</option>
                                        <option value="founder">Founder / Admin</option>
                                        <option value="compliance">Compliance Officer</option>
                                        <option value="developer">Developer</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <span className="material-symbols-outlined text-xl">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="firstName">First name</label>
                                    <input required value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400 outline-none" id="firstName" placeholder="John" type="text" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="lastName">Last name</label>
                                    <input required value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400 outline-none" id="lastName" placeholder="Doe" type="text" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">Email address</label>
                                <input required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400 outline-none" id="email" placeholder="you@example.com" type="email" />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="password">Password</label>
                        <input required value={formData.password} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400 outline-none" id="password" placeholder="Min. 8 characters" type="password" />
                    </div>
                    <div className="flex items-start pt-2">
                        <div className="flex items-center h-5">
                            <input required className="w-4 h-4 border border-slate-300 rounded bg-slate-50 outline-none accent-primary cursor-pointer" id="terms" type="checkbox" />
                        </div>
                        <label className="ml-2 text-sm text-slate-600" htmlFor="terms">
                            I authorize Tchedés to process my {accountType === "business" ? "business" : "personal"} data for verification purposes in accordance with the <a className="text-primary hover:text-primary-dark font-medium hover:underline" href="#">Privacy Policy</a>.
                        </label>
                    </div>
                    <button disabled={isLoading} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] mt-4 disabled:opacity-50" type="submit">
                        {isLoading ? "Creating account..." : `Create ${accountType === "business" ? "company" : "personal"} account`}
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?
                        <Link className="text-primary font-bold hover:text-primary-dark hover:underline ml-1" href="/login">Log in</Link>
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
