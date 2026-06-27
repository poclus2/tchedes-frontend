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
    GitMerge,
    FileText,
    ShieldAlert,
    BarChart3,
    Palette,
    // Pay module icons
    CreditCard,
    ArrowDownUp,
    Wallet,
    Globe,
    FileBarChart2,
    ChevronDown,
    Zap,
    Shield,
    AlertOctagon,
    Briefcase,
    ArrowRightLeft,
} from "lucide-react";

// ── Module Definitions ───────────────────────────────────────────────────────

type Module = {
    id: 'identity' | 'pay';
    label: string;
    description: string;
    accentColor: string;
    glowColor: string;
    badge?: string;
};

const MODULES: Module[] = [
    {
        id: 'identity',
        label: 'Tchedes Identity',
        description: 'KYC · KYB · AML Profil',
        accentColor: '#635bff',
        glowColor: 'rgba(99,91,255,0.25)',
    },
    {
        id: 'pay',
        label: 'Tchedes Pay',
        description: 'Paiements · Payouts · AML TX',
        accentColor: '#10b981',
        glowColor: 'rgba(16,185,129,0.25)',
        badge: 'NEW',
    },
];

// ── Nav Definitions per Module ───────────────────────────────────────────────

const NAV_IDENTITY_MAIN = [
    { name: "Vue d'ensemble", href: "/overview", icon: LayoutDashboard },
    { name: "Sessions KYC", href: "/sessions", icon: Users },
    { name: "Vérifications KYB", href: "/kyb", icon: Building2 },
    { name: "File de revue", href: "/review-queue", icon: AlertTriangle, badge: "12" },
];

const NAV_IDENTITY_ORCHESTRATION = [
    { name: "Workflows", href: "/workflows", icon: GitMerge },
    { name: "Questionnaires", href: "/questionnaires", icon: FileText },
    { name: "Listes Anti-Fraude", href: "/lists", icon: ShieldAlert },
];

const NAV_IDENTITY_SETTINGS = [
    { name: "API & Webhooks", href: "/developer", icon: Code2 },
    { name: "Branding UI", href: "/customization", icon: Palette },
    { name: "Rapports & Logs", href: "/reports", icon: BarChart3 },
];

const NAV_PAY_MAIN = [
    { name: "Vue d'ensemble Pay", href: "/pay/overview", icon: LayoutDashboard },
    { name: "Transactions", href: "/pay/transactions", icon: ArrowDownUp },
    { name: "Payouts", href: "/pay/payouts", icon: Zap },
    { name: "Wallets & Soldes", href: "/pay/wallets", icon: Wallet },
];

const NAV_PAY_COMPLIANCE = [
    { name: "Alertes AML", href: "/pay/aml/alerts", icon: AlertOctagon, badgeDynamic: true },
    { name: "Cases", href: "/pay/aml/cases", icon: Shield },
    { name: "Profils de risque", href: "/pay/aml/profiles", icon: Activity },
];

const NAV_PAY_SETTINGS = [
    { name: "API & Webhooks", href: "/pay/developer", icon: Code2 },
    { name: "Rapports", href: "/pay/reports", icon: FileBarChart2 },
];

const NAV_PAY_FX = [
    { name: "Direct Remittance", href: "/pay/fx/direct-remittance", icon: Globe },
    { name: "FX Change", href: "/pay/fx/exchange", icon: ArrowRightLeft },
    { name: "FX Rates", href: "/pay/fx/rates", icon: Activity },
];

// ── Module Switcher ──────────────────────────────────────────────────────────

function ModuleSwitcher({ activeModule, onSwitch }: {
    activeModule: Module;
    onSwitch: (mod: Module) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const otherModules = MODULES.filter(m => m.id !== activeModule.id);

    return (
        <div className="relative" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <button
                onClick={() => setIsOpen(o => !o)}
                className="w-full flex items-center gap-3 px-5 py-4 transition-colors group"
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
                {/* Module color dot */}
                <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                        background: `${activeModule.accentColor}20`,
                        border: `1px solid ${activeModule.accentColor}40`,
                        boxShadow: `0 0 12px ${activeModule.glowColor}`,
                    }}
                >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: activeModule.accentColor }} />
                </div>

                <div className="flex-1 text-left overflow-hidden">
                    <div className="text-[11px] font-black text-white truncate" style={{ letterSpacing: '-0.01em' }}>
                        {activeModule.label}
                    </div>
                    <div className="text-[9px] text-white/30 truncate mt-0.5">
                        {activeModule.description}
                    </div>
                </div>

                <ChevronDown
                    size={13}
                    style={{
                        color: "rgba(255,255,255,0.3)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                        flexShrink: 0,
                    }}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute left-3 right-3 z-50 rounded-xl overflow-hidden"
                    style={{
                        top: "calc(100% + 4px)",
                        background: "#0f1629",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    }}
                >
                    {/* Current module */}
                    <div
                        className="flex items-center gap-3 px-4 py-3 mx-2 mt-2 rounded-lg"
                        style={{
                            background: `${activeModule.accentColor}12`,
                            border: `1px solid ${activeModule.accentColor}25`,
                        }}
                    >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: activeModule.accentColor }} />
                        <div>
                            <div className="text-[10px] font-bold text-white">{activeModule.label}</div>
                            <div className="text-[9px] text-white/30">Module actif</div>
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="mx-4 my-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />
                    <div className="px-4 pb-1">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">
                            Changer de module
                        </span>
                    </div>

                    {/* Other modules */}
                    {otherModules.map(mod => (
                        <button
                            key={mod.id}
                            onClick={() => { onSwitch(mod); setIsOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 mx-0 transition-all mb-2"
                            style={{ borderRadius: "0 0 12px 12px" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                            <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: `${mod.accentColor}15`, border: `1px solid ${mod.accentColor}30` }}
                            >
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: mod.accentColor }} />
                            </div>
                            <div className="flex-1 text-left">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-white/70">{mod.label}</span>
                                    {mod.badge && (
                                        <span
                                            className="text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase"
                                            style={{ background: `${mod.accentColor}25`, color: mod.accentColor }}
                                        >
                                            {mod.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="text-[9px] text-white/25 mt-0.5">{mod.description}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Nav Item ─────────────────────────────────────────────────────────────────

function NavItem({ link, isActive, accentColor }: {
    link: { name: string; href: string; icon: any; badge?: string; badgeDynamic?: boolean };
    isActive: boolean;
    accentColor: string;
}) {
    const Icon = link.icon;
    return (
        <Link
            href={link.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={{
                background: isActive ? `${accentColor}18` : "transparent",
                color: isActive ? "#e2e8f0" : "rgba(255,255,255,0.4)",
                border: isActive ? `1px solid ${accentColor}30` : "1px solid transparent",
                fontWeight: isActive ? 700 : 500,
            }}
            onMouseEnter={e => {
                if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                }
            }}
            onMouseLeave={e => {
                if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                }
            }}
        >
            <Icon size={14} style={{ color: isActive ? accentColor : "rgba(255,255,255,0.22)", flexShrink: 0 }} />
            <span className="flex-1">{link.name}</span>
            {link.badge && (
                <span
                    className="px-2 py-0.5 rounded-full text-[8px] font-black"
                    style={{ background: "rgba(251,146,60,0.2)", color: "#fb923c" }}
                >
                    {link.badge}
                </span>
            )}
        </Link>
    );
}

// ── Section Label ─────────────────────────────────────────────────────────────

function NavSection({ label }: { label: string }) {
    return (
        <div className="px-3 pt-5 pb-2">
            <span className="text-[8px] font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.18)" }}>
                {label}
            </span>
        </div>
    );
}

// ── Main Sidebar ──────────────────────────────────────────────────────────────

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [activeModule, setActiveModule] = useState<Module>(MODULES[0]);

    const [isSwitching, setIsSwitching] = useState<{ active: boolean; target?: Module }>({ active: false });

    // Détection automatique du module selon la route
    useEffect(() => {
        if (pathname.startsWith('/pay/')) {
            setActiveModule(MODULES[1]); // Tchedes Pay
        } else {
            setActiveModule(MODULES[0]); // Tchedes Identity
        }
    }, [pathname]);

    useEffect(() => {
        const storedUser = localStorage.getItem("tchedes_user");
        if (storedUser) {
            try { setUser(JSON.parse(storedUser)); } catch { }
        }
    }, []);

    const handleModuleSwitch = (mod: Module) => {
        if (mod.id === activeModule.id) return;
        
        setIsSwitching({ active: true, target: mod });
        
        // Attendre 3 secondes avant de rediriger
        setTimeout(() => {
            setActiveModule(mod);
            setIsSwitching({ active: false });
            if (mod.id === 'pay') {
                router.push('/pay/overview');
            } else {
                router.push('/overview');
            }
        }, 3000);
    };

    const handleLogout = () => {
        document.cookie = 'tchedes_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.removeItem("tchedes_auth_token");
        localStorage.removeItem("tchedes_user");
        router.push("/login");
    };

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    const accentColor = activeModule.accentColor;

    const getInitials = () => {
        if (!user) return "JD";
        if (user.company_name) return user.company_name.substring(0, 2).toUpperCase();
        if (user.first_name && user.last_name) return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
        return "UU";
    };

    return (
        <>
            {/* Loading Overlay pour le changement de module */}
            {isSwitching.active && isSwitching.target && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-md transition-all duration-300">
                    <div className="bg-slate-900 p-10 rounded-3xl border border-slate-700/50 shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 relative overflow-hidden">
                        {/* Ambient glow inside card */}
                        <div 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 blur-[60px] opacity-30 rounded-full"
                            style={{ background: isSwitching.target.accentColor }}
                        />
                        
                        {/* Spinner */}
                        <div className="relative mb-6 z-10">
                            <div className="w-16 h-16 rounded-full border-4 border-slate-700/30"></div>
                            <div 
                                className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
                                style={{ borderRightColor: isSwitching.target.accentColor, borderBottomColor: isSwitching.target.accentColor, borderLeftColor: 'transparent' }}
                            ></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <img src="/logo.svg" alt="Tchedes" className="w-6 h-6 brightness-0 invert opacity-80" />
                            </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 z-10 text-center">
                            Chargement de {isSwitching.target.label}
                        </h3>
                        <p className="text-sm text-slate-400 z-10 text-center">
                            Préparation de votre espace de travail sécurisé...
                        </p>
                    </div>
                </div>
            )}

            <aside
                className="w-64 flex flex-col fixed h-full z-50 shrink-0 overflow-y-auto"
                style={{
                    background: "#0a0f1e",
                    borderRight: "1px solid rgba(255,255,255,0.05)",
                    fontFamily: "'Sora', sans-serif",
                }}
            >
                {/* Grid texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.022]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* Top accent glow — color changes with module */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none transition-all duration-700"
                    style={{ background: `radial-gradient(ellipse,${activeModule.glowColor} 0%,transparent 70%)` }}
                />

                <div className="relative z-10 flex flex-col h-full">

                    {/* Logo */}
                    <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <Link href="/overview" className="flex items-center gap-3">
                            <img src="/logo.svg" alt="Tchedes Logo" className="w-auto h-7" />
                            <span className="font-black text-base tracking-wider" style={{ color: accentColor }}>
                                TCHEDES
                            </span>
                        </Link>
                    </div>

                    {/* ── Module Switcher — Le point central ─────────────────── */}
                    <ModuleSwitcher activeModule={activeModule} onSwitch={handleModuleSwitch} />

                    {/* ── Navigation contextuelle ─────────────────────────────── */}
                    <nav className="flex-1 px-3 py-3 overflow-y-auto">

                        {activeModule.id === 'identity' ? (
                            <>
                                <NavSection label="Workspace" />
                                {NAV_IDENTITY_MAIN.map(link => (
                                    <NavItem key={link.href} link={link} isActive={isActive(link.href)} accentColor={accentColor} />
                                ))}
                                <NavSection label="Orchestration" />
                                {NAV_IDENTITY_ORCHESTRATION.map(link => (
                                    <NavItem key={link.href} link={link} isActive={isActive(link.href)} accentColor={accentColor} />
                                ))}
                                <NavSection label="Paramètres" />
                                {NAV_IDENTITY_SETTINGS.map(link => (
                                    <NavItem key={link.href} link={link} isActive={isActive(link.href)} accentColor={accentColor} />
                                ))}
                            </>
                        ) : (
                            <>
                                <NavSection label="Paiements" />
                                {NAV_PAY_MAIN.map(link => (
                                    <NavItem key={link.href} link={link} isActive={isActive(link.href)} accentColor={accentColor} />
                                ))}
                                <NavSection label="Conformité AML" />
                                {NAV_PAY_COMPLIANCE.map(link => (
                                    <NavItem key={link.href} link={link} isActive={isActive(link.href)} accentColor={accentColor} />
                                ))}
                                <NavSection label="Cross-Border & FX" />
                                {NAV_PAY_FX.map(link => (
                                    <NavItem key={link.href} link={link} isActive={isActive(link.href)} accentColor={accentColor} />
                                ))}
                                <NavSection label="Configuration" />
                                {NAV_PAY_SETTINGS.map(link => (
                                    <NavItem key={link.href} link={link} isActive={isActive(link.href)} accentColor={accentColor} />
                                ))}
                            </>
                        )}
                    </nav>

                    {/* Status indicator */}
                    <div className="px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                        <div
                            className="flex items-center gap-2 px-3 py-2 rounded-xl"
                            style={{
                                background: `${accentColor}0d`,
                                border: `1px solid ${accentColor}20`,
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: accentColor }} />
                            <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>
                                {activeModule.id === 'identity' ? 'Identity' : 'Pay'} · Connecté
                            </span>
                        </div>
                    </div>

                    {/* User area */}
                    <div className="px-3 pb-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group mt-3"
                            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                            <div
                                className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0"
                                style={{
                                    background: `${accentColor}20`,
                                    color: accentColor,
                                    border: `1px solid ${accentColor}30`,
                                }}
                            >
                                {getInitials()}
                            </div>
                            <div className="overflow-hidden flex-1 text-left">
                                <p className="text-xs font-bold truncate" style={{ color: "rgba(255,255,255,0.8)" }}>
                                    {user?.company_name || user?.first_name || "Mon compte"}
                                </p>
                                <p className="text-[9px] truncate" style={{ color: "rgba(255,255,255,0.3)" }}>
                                    {activeModule.label}
                                </p>
                            </div>
                            <LogOut
                                size={12}
                                className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                style={{ color: "rgba(248,113,113,0.7)" }}
                            />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
