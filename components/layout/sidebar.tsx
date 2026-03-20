"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    Users,
    AlertCircle,
    Webhook,
    ChevronDown
} from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("tchedes_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user data");
            }
        }
    }, []);

    const handleLogout = () => {
        // Clear cookies and local storage
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

    const links = [
        { name: "Dashboard", href: "/overview", icon: "dashboard" },
        { name: "KYC Sessions", href: "/sessions", icon: "group" },
        { name: "KYB Verifications", href: "/kyb", icon: "corporate_fare" },
        { name: "Review Queue", href: "/review-queue", icon: "assignment_late", badge: "12" },
    ];

    const devLinks = [
        { name: "API Keys & Webhooks", href: "/developer", icon: "api" },
    ];

    return (
        <aside className="w-64 border-r border-slate-200 bg-white flex flex-col fixed h-full z-50 shadow-sm shrink-0">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <Link href="/overview" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-display font-bold text-xl">
                        T
                    </div>
                    <span className="text-2xl font-bold font-display tracking-tight text-slate-900">
                        Tchedés
                    </span>
                </Link>
            </div>

            <div className="px-6 py-2 mt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Workspace
                </span>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2 text-sm transition-all rounded-lg ${isActive
                                ? "text-primary bg-emerald-50 font-bold"
                                : "text-slate-600 hover:bg-slate-50 hover:text-primary font-medium"
                                }`}
                        >
                            <span className={`material-symbols-outlined ${isActive ? "" : "text-slate-400"}`}>
                                {link.icon}
                            </span>
                            {link.name}
                            {link.badge && (
                                <span className="ml-auto bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                    {link.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}

                <div className="pt-6 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                        Developer
                    </span>
                </div>

                {devLinks.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2 text-sm transition-all rounded-lg ${isActive
                                ? "text-primary bg-emerald-50 font-bold"
                                : "text-slate-600 hover:bg-slate-50 hover:text-primary font-medium"
                                }`}
                        >
                            <span className={`material-symbols-outlined ${isActive ? "" : "text-slate-400"}`}>
                                {link.icon}
                            </span>
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100 group relative">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-100 hover:border-slate-300 transition-all text-left"
                >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {getInitials()}
                    </div>
                    <div className="overflow-hidden flex-1">
                        <p className="text-xs font-bold text-slate-900 truncate">{getDisplayName()}</p>
                        <p className="text-[10px] text-slate-500 truncate">{getDisplayRole()}</p>
                    </div>
                    <div className="flex shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-slate-400 text-sm hover:text-red-500" title="Log out">logout</span>
                    </div>
                </button>
            </div>
        </aside>
    );
}
