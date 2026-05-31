"use client";

import { useState, useMemo } from "react";
import { useSessions } from "@/hooks/useSessions";
import { format, subDays, isAfter } from "date-fns";
import Link from "next/link";
import CreateVerificationDrawer from "@/components/ui/CreateVerificationDrawer";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, Plus, CheckCircle2, AlertTriangle, XCircle, LayoutDashboard } from "lucide-react";

export default function OverviewPage() {
    const { data: sessions, isLoading, refetch } = useSessions();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleSuccess = (url: string) => { refetch(); };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "created":        return "status-pill status-created";
            case "processing":     return "status-pill status-processing";
            case "review_required": return "status-pill status-review_required";
            case "verified":       return "status-pill status-verified";
            case "rejected":       return "status-pill status-rejected";
            default:               return "status-pill bg-slate-100 text-slate-800";
        }
    };

    const getStatusLabel = (status: string) => {
        const map: Record<string, string> = {
            created: "Créé",
            processing: "En cours",
            review_required: "À réviser",
            verified: "Vérifié",
            rejected: "Rejeté",
        };
        return map[status] || status;
    };

    const chartData = useMemo(() => {
        if (!sessions || sessions.length === 0) return [];
        const thirtyDaysAgo = subDays(new Date(), 30);
        const recent = sessions.filter((s: any) => isAfter(new Date(s.created_at), thirtyDaysAgo));
        const grouped: Record<string, { name: string; verified: number; rejected: number }> = {};
        recent.forEach((s: any) => {
            const dateStr = format(new Date(s.created_at), "MMM dd").toUpperCase();
            if (!grouped[dateStr]) grouped[dateStr] = { name: dateStr, verified: 0, rejected: 0 };
            if (s.status === "verified") grouped[dateStr].verified += 1;
            if (s.status === "rejected") grouped[dateStr].rejected += 1;
        });
        return Object.values(grouped).reverse();
    }, [sessions]);

    const total   = sessions?.length || 0;
    const verified = sessions?.filter((s: any) => s.status === "verified").length || 0;
    const review  = sessions?.filter((s: any) => s.status === "review_required").length || 0;
    const rejected = sessions?.filter((s: any) => s.status === "rejected").length || 0;

    const stats = [
        { value: isLoading ? "—" : total,    label: "Sessions KYC",  sub: "Total all-time",    dark: true,  accent: "#635bff" },
        { value: isLoading ? "—" : verified, label: "Vérifiées",     sub: "Statut : Approved",  dark: false, accent: "#10b981" },
        { value: isLoading ? "—" : review,   label: "À réviser",     sub: "Action requise",    dark: false, accent: "#fb923c" },
        { value: isLoading ? "—" : rejected, label: "Rejetées",      sub: "Statut : Rejected",  dark: true,  accent: "#f87171" },
    ];

    return (
        <div className="p-8 space-y-8 min-h-full" style={{ fontFamily: "'Sora', sans-serif" }}>
            <CreateVerificationDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onSuccess={handleSuccess}
            />

            {/* ── Page header ────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-px" style={{ background: "#635bff" }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#635bff" }}>
                            Vue d'ensemble
                        </span>
                    </div>
                    <h1 className="font-black text-black" style={{ fontSize: 28, letterSpacing: "-0.03em" }}>
                        Dashboard KYC
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">Bienvenue. Voici le résumé de votre activité.</p>
                </div>
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white transition-all active:scale-95"
                    style={{ background: "#0a0f1e" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1a2236")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#0a0f1e")}
                >
                    <Plus size={14} />
                    Nouvelle vérification
                </button>
            </div>

            {/* ── Stat cards bento ───────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div
                        key={s.label}
                        className="rounded-2xl p-6 flex flex-col gap-2 relative overflow-hidden"
                        style={{
                            background: s.dark ? "#0a0f1e" : "#ffffff",
                            border: s.dark ? "none" : "1px solid rgba(0,0,0,0.05)",
                        }}
                    >
                        {/* Glow dot */}
                        <div
                            className="absolute top-4 right-4 w-6 h-6 rounded-full opacity-40"
                            style={{ background: `radial-gradient(circle,${s.accent} 0%,transparent 70%)` }}
                        />
                        <div
                            className="font-black leading-none"
                            style={{
                                fontSize: "clamp(32px, 4vw, 48px)",
                                letterSpacing: "-0.04em",
                                color: s.dark ? "#fff" : s.accent,
                            }}
                        >
                            {s.value}
                        </div>
                        <div
                            className="text-xs font-bold uppercase tracking-widest"
                            style={{ color: s.dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.5)" }}
                        >
                            {s.label}
                        </div>
                        <div
                            className="text-[10px]"
                            style={{ color: s.dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)" }}
                        >
                            {s.sub}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── KYC Activity chart ─────────────────────────────────── */}
            <section
                className="rounded-2xl overflow-hidden"
                style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.05)" }}
            >
                <div
                    className="px-6 py-5 flex items-center justify-between"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                >
                    <div>
                        <h2 className="font-black text-black text-base" style={{ letterSpacing: "-0.02em" }}>
                            Activité KYC
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">Sessions sur les 30 derniers jours</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vérifiés</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ background: "#f87171" }} />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rejetés</span>
                        </div>
                        <select
                            className="text-[10px] font-bold rounded-full px-3 py-1.5 outline-none"
                            style={{
                                background: "#f5f5f0",
                                border: "1px solid rgba(0,0,0,0.06)",
                                color: "#0a0f1e",
                                cursor: "pointer",
                            }}
                        >
                            <option>30 derniers jours</option>
                            <option>7 derniers jours</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 h-[260px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: "rgba(0,0,0,0.3)", fontFamily: "Sora, sans-serif" }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: "rgba(0,0,0,0.3)", fontFamily: "Sora, sans-serif" }}
                            />
                            <Tooltip
                                cursor={{ stroke: "rgba(0,0,0,0.06)", strokeWidth: 1 }}
                                contentStyle={{
                                    background: "#0a0f1e",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: 12,
                                    fontSize: 11,
                                    fontFamily: "Sora, sans-serif",
                                    color: "#fff",
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="verified"
                                stroke="#10b981"
                                strokeWidth={2.5}
                                dot={false}
                                activeDot={{ r: 5, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
                            />
                            <Line
                                type="monotone"
                                strokeDasharray="4 4"
                                dataKey="rejected"
                                stroke="#f87171"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, fill: "#f87171", stroke: "#fff", strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* ── Recent Sessions table ──────────────────────────────── */}
            <section
                className="rounded-2xl overflow-hidden"
                style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.05)" }}
            >
                <div
                    className="px-6 py-5 flex items-center justify-between"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                >
                    <h2 className="font-black text-black text-base" style={{ letterSpacing: "-0.02em" }}>
                        Sessions récentes
                    </h2>
                    <Link
                        href="/sessions"
                        className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
                        style={{ color: "#635bff" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#4f46e5")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#635bff")}
                    >
                        Voir tout <ArrowUpRight size={12} />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr style={{ background: "rgba(0,0,0,0.02)" }}>
                                {["Session ID", "Référence", "Statut", "Confiance", "Date", ""].map((h) => (
                                    <th
                                        key={h}
                                        className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest"
                                        style={{ color: "rgba(0,0,0,0.3)" }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-400">
                                        Chargement…
                                    </td>
                                </tr>
                            )}
                            {!isLoading && (!sessions || sessions.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-400">
                                        Aucune session trouvée.
                                    </td>
                                </tr>
                            )}
                            {!isLoading &&
                                sessions?.slice(0, 5).map((session: any) => {
                                    const prefixId = session.id.substring(0, 8);
                                    const score = session.confidence_score;

                                    return (
                                        <tr
                                            key={session.id}
                                            className="transition-colors"
                                            style={{ borderTop: "1px solid rgba(0,0,0,0.03)" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.01)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                        >
                                            <td className="px-6 py-4">
                                                <span
                                                    className="text-xs font-mono px-2.5 py-1 rounded-lg"
                                                    style={{ background: "#f5f5f0", color: "#0a0f1e" }}
                                                >
                                                    sess_{prefixId}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-black">
                                                {session.reference_id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={getStatusStyle(session.status)}>
                                                    {getStatusLabel(session.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className="text-sm font-bold"
                                                    style={{
                                                        color:
                                                            session.status === "created"
                                                                ? "rgba(0,0,0,0.2)"
                                                                : session.status === "rejected"
                                                                ? "#f87171"
                                                                : session.status === "review_required"
                                                                ? "#fb923c"
                                                                : "#10b981",
                                                    }}
                                                >
                                                    {score != null ? `${score}%` : "—"}
                                                </span>
                                            </td>
                                            <td
                                                className="px-6 py-4 text-xs font-mono"
                                                style={{ color: "rgba(0,0,0,0.35)" }}
                                            >
                                                {format(
                                                    new Date(session.created_at || session.createdAt || new Date()),
                                                    "dd MMM · HH:mm"
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/sessions/${session.id}`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-colors"
                                                    style={{
                                                        background: "rgba(99,91,255,0.08)",
                                                        color: "#635bff",
                                                        border: "1px solid rgba(99,91,255,0.15)",
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,91,255,0.14)")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(99,91,255,0.08)")}
                                                >
                                                    Voir <ArrowUpRight size={10} />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
