"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    Users,
    Building2,
    AlertTriangle,
    Code2,
    LogOut,
    Activity,
} from "lucide-react";

const NAV_MAIN = [
    { name: "Vue d'ensemble", href: "/overview", icon: LayoutDashboard },
    { name: "Sessions KYC", href: "/sessions", icon: Users },
    { name: "Vérifications KYB", href: "/kyb", icon: Building2 },
    { name: "File de revue", href: "/review-queue", icon: AlertTriangle, badge: "12" },
];

const NAV_DEV = [
    { name: "API & Webhooks", href: "/developer", icon: Code2 },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("tchedes_user");
        if (storedUser) {
            try { setUser(JSON.parse(storedUser)); }
            catch (e) { console.error("Failed to parse user data"); }
        }
    }, []);

    const handleLogout = () => {
        document.cookie = 'tchedes_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.removeItem("tchedes_auth_token");
        localStorage.removeItem("tchedes_user");
        router.push("/login");
    };

    const getInitials = () => {
        if (!user) return "JD";
        if (user.company_name) return user.company_name.substring(0, 2).toUpperCase();
        if (user.first_name && user.last_name) return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
        return "UU";
    };
    const getDisplayName = () => {
        if (!user) return "John Doe";
        if (user.company_name) return user.company_name;
        if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
        return user.email;
    };
    const getDisplayRole = () => {
        if (!user) return "Risk Officer";
        if (user.role) return user.role.charAt(0).toUpperCase() + user.role.slice(1);
        return "User";
    };

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    return (
        <aside
            className="w-64 flex flex-col fixed h-full z-50 shrink-0"
            style={{
                background: "#0a0f1e",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "'Sora', sans-serif",
            }}
        >
            {/* Grid texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />
            {/* Top glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none"
                style={{ background: "radial-gradient(ellipse,rgba(99,91,255,0.18) 0%,transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col h-full">

                {/* Logo */}
                <div className="px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <Link href="/overview" className="flex items-center gap-3">
                        <img src="/logo.svg" alt="Tchedes Logo" className="w-auto h-8" />
                        <span className="font-black text-lg tracking-wider" style={{ color: "#635bff" }}>TCHEDES</span>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {/* Section label */}
                    <div className="px-3 pb-2">
                        <span className="text-[9px] font-bold uppercase tracking-[0.15em]"
                            style={{ color: "rgba(255,255,255,0.2)" }}>
                            Workspace
                        </span>
                    </div>

                    {NAV_MAIN.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                                style={{
                                    background: active ? "rgba(99,91,255,0.15)" : "transparent",
                                    color: active ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                                    border: active ? "1px solid rgba(99,91,255,0.25)" : "1px solid transparent",
                                    fontWeight: active ? 700 : 500,
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                        e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                                    }
                                }}
                            >
                                <Icon
                                    size={15}
                                    style={{ color: active ? "#635bff" : "rgba(255,255,255,0.25)", flexShrink: 0 }}
                                />
                                <span className="flex-1">{link.name}</span>
                                {link.badge && (
                                    <span
                                        className="px-2 py-0.5 rounded-full text-[9px] font-black"
                                        style={{ background: "rgba(251,146,60,0.2)", color: "#fb923c" }}
                                    >
                                        {link.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}

                    {/* Developer section */}
                    <div className="px-3 pt-6 pb-2">
                        <span className="text-[9px] font-bold uppercase tracking-[0.15em]"
                            style={{ color: "rgba(255,255,255,0.2)" }}>
                            Développeurs
                        </span>
                    </div>

                    {NAV_DEV.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                                style={{
                                    background: active ? "rgba(99,91,255,0.15)" : "transparent",
                                    color: active ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                                    border: active ? "1px solid rgba(99,91,255,0.25)" : "1px solid transparent",
                                    fontWeight: active ? 700 : 500,
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                        e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                                    }
                                }}
                            >
                                <Icon size={15} style={{ color: active ? "#635bff" : "rgba(255,255,255,0.25)", flexShrink: 0 }} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Status indicator */}
                <div className="px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <div
                        className="flex items-center gap-2 px-3 py-2 rounded-xl"
                        style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">API connectée</span>
                    </div>
                </div>

                {/* User area */}
                <div className="px-3 pb-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group mt-3"
                        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                        <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0"
                            style={{ background: "rgba(99,91,255,0.2)", color: "#a5b4fc", border: "1px solid rgba(99,91,255,0.25)" }}
                        >
                            {getInitials()}
                        </div>
                        <div className="overflow-hidden flex-1 text-left">
                            <p className="text-xs font-bold truncate" style={{ color: "rgba(255,255,255,0.8)" }}>
                                {getDisplayName()}
                            </p>
                            <p className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.3)" }}>
                                {getDisplayRole()}
                            </p>
                        </div>
                        <LogOut
                            size={13}
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            style={{ color: "rgba(248,113,113,0.8)" }}
                        />
                    </button>
                </div>
            </div>
        </aside>
    );
}
