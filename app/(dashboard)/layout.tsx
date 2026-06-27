"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isPayModule = pathname.startsWith('/pay/');
    const activeColor = isPayModule ? '#10b981' : '#635bff';
    const moduleName = isPayModule ? 'Tchedes Pay' : 'Dashboard';

    return (
        <div className="flex min-h-screen" style={{ fontFamily: "'Sora', sans-serif" }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <main className="flex-1 ml-64 min-h-screen flex flex-col" style={{ background: "#f9f9f7" }}>

                {/* Top Header */}
                <header
                    className="h-14 sticky top-0 z-10 px-8 flex items-center justify-between"
                    style={{
                        background: "rgba(249,249,247,0.85)",
                        backdropFilter: "blur(12px)",
                        borderBottom: "1px solid rgba(0,0,0,0.06)",
                    }}
                >
                    {/* Left — breadcrumb area */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: activeColor }} />
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: activeColor }}>
                                Live
                            </span>
                        </div>
                        <div className="w-px h-4 bg-gray-200" />
                        <span className="text-xs font-medium text-gray-400">{moduleName}</span>
                    </div>

                    {/* Right — actions */}
                    <div className="flex items-center gap-3">
                        {/* API status */}
                        <div
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold"
                            style={{
                                background: "rgba(16,185,129,0.08)",
                                border: "1px solid rgba(16,185,129,0.15)",
                                color: "#10b981",
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            API Connectée
                        </div>

                        {/* Notifications */}
                        <button
                            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                            style={{ border: "1px solid rgba(0,0,0,0.07)", background: "#fff" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f0")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                        >
                            <span className="material-symbols-outlined text-gray-400" style={{ fontSize: 17 }}>
                                notifications
                            </span>
                        </button>

                        {/* Help */}
                        <button
                            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                            style={{ border: "1px solid rgba(0,0,0,0.07)", background: "#fff" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f0")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                        >
                            <span className="material-symbols-outlined text-gray-400" style={{ fontSize: 17 }}>
                                help
                            </span>
                        </button>
                    </div>
                </header>

                {/* Page content */}
                {children}
            </main>
        </div>
    );
}
