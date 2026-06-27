"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PortalPage() {
    const [userName, setUserName] = useState("User");
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("tchedes_user");
        if (userData) {
            try {
                const user = JSON.parse(userData);
                if (user.first_name) {
                    setUserName(user.first_name);
                }
            } catch (e) {
                // ignore
            }
        }
    }, []);

    const handleSelectProduct = (productPath: string, productId: string) => {
        // Set the active product in localStorage for the sidebar to pick up
        localStorage.setItem("tchedes_active_product", productId);
        router.push(productPath);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#635bff] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-[#10b981] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <header className="relative z-10 w-full px-8 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="Tchedes Logo" className="w-auto h-8 brightness-0 invert" />
                    <span className="text-xl font-bold font-display tracking-wider uppercase text-white">TCHEDES</span>
                </div>
                <button
                    onClick={() => {
                        document.cookie = "tchedes_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                        localStorage.removeItem("tchedes_auth_token");
                        router.push("/login");
                    }}
                    className="text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                    Log out
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                </button>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 max-w-6xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Welcome back, {userName}
                    </h1>
                    <p className="text-slate-400 text-lg">Select a module to continue</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* Identity Card */}
                    <button
                        onClick={() => handleSelectProduct("/overview", "identity")}
                        className="group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 text-left transition-all hover:bg-slate-800/80 hover:border-[#635bff]/50 hover:shadow-2xl hover:shadow-[#635bff]/20 overflow-hidden transform hover:-translate-y-1"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#635bff]/10 rounded-bl-full transition-transform group-hover:scale-150 group-hover:bg-[#635bff]/20"></div>
                        
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-[#635bff]/20 rounded-2xl flex items-center justify-center mb-6 border border-[#635bff]/30">
                                <span className="material-symbols-outlined text-3xl text-[#8f85ff]">shield_person</span>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-white mb-3">Tchedes Identity</h2>
                            <p className="text-slate-400 mb-8 min-h-[48px]">
                                Manage KYC/KYB verifications, monitor automated compliance checks, and review identity alerts.
                            </p>

                            <div className="flex items-center text-[#8f85ff] font-semibold text-sm group-hover:translate-x-2 transition-transform">
                                Enter module <span className="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                            </div>
                        </div>
                    </button>

                    {/* Pay Card */}
                    <button
                        onClick={() => handleSelectProduct("/pay/overview", "pay")}
                        className="group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 text-left transition-all hover:bg-slate-800/80 hover:border-[#10b981]/50 hover:shadow-2xl hover:shadow-[#10b981]/20 overflow-hidden transform hover:-translate-y-1"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/10 rounded-bl-full transition-transform group-hover:scale-150 group-hover:bg-[#10b981]/20"></div>
                        
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-[#10b981]/20 rounded-2xl flex items-center justify-center mb-6 border border-[#10b981]/30">
                                <span className="material-symbols-outlined text-3xl text-[#34d399]">payments</span>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-white mb-3">Tchedes Pay</h2>
                            <p className="text-slate-400 mb-8 min-h-[48px]">
                                Orchestrate multi-currency payments, execute payouts, and monitor AML velocity rules in real-time.
                            </p>

                            <div className="flex items-center text-[#34d399] font-semibold text-sm group-hover:translate-x-2 transition-transform">
                                Enter module <span className="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                            </div>
                        </div>
                    </button>
                </div>
            </main>
        </div>
    );
}
