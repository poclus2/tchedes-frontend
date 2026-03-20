import Link from "next/link";

export default function ResetPasswordPage() {
    return (
        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-card overflow-hidden flex min-h-[700px]">
            {/* Left Column - Form */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                <div className="mb-10">
                    <Link className="flex items-center space-x-2 mb-8" href="/">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-display font-bold text-xl">T</div>
                        <span className="text-2xl font-bold font-display tracking-tight text-slate-900">Tchedés</span>
                    </Link>
                    <h1 className="text-3xl font-bold font-display text-slate-900 mb-2">Create new password</h1>
                    <p className="text-slate-500 text-lg">Your new password must be different from previous used passwords.</p>
                </div>
                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="password">New Password</label>
                        <input className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400 outline-none" id="password" placeholder="Min. 8 characters" type="password" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="confirm-password">Confirm Password</label>
                        <input className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder-slate-400 outline-none" id="confirm-password" placeholder="Min. 8 characters" type="password" />
                    </div>

                    <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] mt-6" type="button">
                        Reset password
                    </button>

                    <Link href="/login" className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-4">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to login
                    </Link>
                </form>

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
                    <div className="bg-white rounded-2xl p-6 shadow-2xl transform -translate-x-4 border border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-slate-900 font-bold text-lg">API Performance</h3>
                            <span className="material-symbols-outlined text-slate-400">monitoring</span>
                        </div>
                        <div className="flex items-end space-x-2 h-24 mb-2">
                            <div className="w-1/5 bg-slate-100 rounded-t-md h-[40%]"></div>
                            <div className="w-1/5 bg-slate-100 rounded-t-md h-[65%]"></div>
                            <div className="w-1/5 bg-slate-100 rounded-t-md h-[50%]"></div>
                            <div className="w-1/5 bg-green-100 rounded-t-md h-[85%] relative group">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">24ms Latency</div>
                            </div>
                            <div className="w-1/5 bg-primary rounded-t-md h-[95%]"></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 font-medium">
                            <span>Mon</span>
                            <span>Fri</span>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <h2 className="text-2xl font-display font-bold text-white mb-3">Enterprise-Grade Infrastructure</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Join over 500+ fintechs using Tchedés to handle compliance, identity verification, and fraud prevention at scale.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
