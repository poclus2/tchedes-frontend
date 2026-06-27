"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, AlertOctagon, Wallet, ArrowDownUp, Zap } from "lucide-react";
import { format } from "date-fns";

export default function PayOverviewPage() {
    // Mock Data for MVP Design
    const stats = [
        { value: "42.5M", label: "Volume XOF (30j)", sub: "+12% vs mois dernier", dark: true, accent: "#10b981" },
        { value: "99.8%", label: "Taux de Succès", sub: "Transactions abouties", dark: false, accent: "#10b981" },
        { value: "14", label: "Alertes AML Actives", sub: "Action requise", dark: false, accent: "#f59e0b" },
        { value: "3.2M", label: "Payouts en attente", sub: "XOF", dark: false, accent: "#6366f1" },
    ];

    const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

    useEffect(() => {
        setRecentTransactions([
            { id: "PAY-20260621-1", customer: "+225 0102030405", amount: "25,000 XOF", status: "COMPLETED", aml: "ALLOW", time: new Date() },
            { id: "PAY-20260621-2", customer: "+221 771234567", amount: "150,000 XOF", status: "HELD", aml: "REVIEW", time: new Date(Date.now() - 15 * 60000) },
            { id: "PAY-20260621-3", customer: "+225 0506070809", amount: "10,000 XOF", status: "FAILED", aml: "ALLOW", time: new Date(Date.now() - 60 * 60000) },
            { id: "PAY-20260621-4", customer: "+228 90123456", amount: "5,000,000 XOF", status: "FAILED", aml: "BLOCK", time: new Date(Date.now() - 120 * 60000) },
            { id: "PAY-20260621-5", customer: "John Doe (Card)", amount: "50 USD", status: "COMPLETED", aml: "ALLOW", time: new Date(Date.now() - 150 * 60000) },
        ]);
    }, []);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "COMPLETED": return "status-pill bg-emerald-100 text-emerald-800";
            case "PENDING": return "status-pill bg-slate-100 text-slate-800";
            case "HELD": return "status-pill bg-amber-100 text-amber-800";
            case "FAILED": return "status-pill bg-red-100 text-red-800";
            default: return "status-pill bg-slate-100 text-slate-800";
        }
    };

    const getAmlStyle = (aml: string) => {
        switch (aml) {
            case "ALLOW": return "text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold";
            case "REVIEW": return "text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full text-[10px] font-bold";
            case "BLOCK": return "text-red-500 bg-red-50 px-2 py-0.5 rounded-full text-[10px] font-bold";
            default: return "text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full text-[10px] font-bold";
        }
    };

    return (
        <div className="p-8 space-y-8 min-h-full">
            {/* ── Page header ────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-px" style={{ background: "#10b981" }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#10b981" }}>
                            Vue d'ensemble
                        </span>
                    </div>
                    <h1 className="font-black text-black" style={{ fontSize: 28, letterSpacing: "-0.03em" }}>
                        Dashboard Pay
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">Gérez vos paiements, payouts et alertes AML.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-slate-700 bg-white border border-slate-200 transition-all active:scale-95 hover:bg-slate-50"
                    >
                        <Zap size={14} className="text-indigo-500" />
                        Nouveau Payout
                    </button>
                    <button
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white transition-all active:scale-95"
                        style={{ background: "#10b981" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
                    >
                        <ArrowDownUp size={14} />
                        Créer Lien de Paiement
                    </button>
                </div>
            </div>

            {/* ── Stat cards bento ───────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div
                        key={s.label}
                        className="rounded-2xl p-6 flex flex-col gap-2 relative overflow-hidden group transition-transform hover:-translate-y-1"
                        style={{
                            background: s.dark ? "#0a0f1e" : "#ffffff",
                            border: s.dark ? "none" : "1px solid rgba(0,0,0,0.05)",
                            boxShadow: s.dark ? "0 20px 40px -10px rgba(16,185,129,0.15)" : "0 10px 30px -10px rgba(0,0,0,0.02)",
                        }}
                    >
                        <div
                            className="absolute top-4 right-4 w-12 h-12 rounded-full opacity-40 transition-transform group-hover:scale-150"
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
                            className="text-xs font-bold uppercase tracking-widest mt-2"
                            style={{ color: s.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)" }}
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ── Balances ─────────────────────────────────────────── */}
                <section
                    className="col-span-1 rounded-2xl overflow-hidden flex flex-col"
                    style={{ background: "#0a0f1e", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                    <div className="p-6 pb-2">
                        <div className="flex items-center gap-2 mb-6">
                            <Wallet className="text-[#10b981]" size={18} />
                            <h2 className="font-bold text-white text-sm tracking-wide">MES WALLETS</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="text-[10px] text-emerald-400 font-bold tracking-widest mb-1">COMPTE PRINCIPAL (XOF)</div>
                                <div className="text-4xl font-black text-white tracking-tight">12,500,000</div>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs text-white/50">Réservé: 50,000 XOF</span>
                                </div>
                            </div>
                            
                            <div className="h-px bg-white/10 w-full" />

                            <div>
                                <div className="text-[10px] text-blue-400 font-bold tracking-widest mb-1">COMPTE USD (STABLE)</div>
                                <div className="text-3xl font-black text-white tracking-tight">24,500.00</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-auto p-4 bg-white/5 border-t border-white/5">
                        <button className="w-full text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center justify-center gap-1">
                            Gérer les devises <ArrowUpRight size={14} />
                        </button>
                    </div>
                </section>

                {/* ── Recent Transactions table ────────────────────────── */}
                <section
                    className="col-span-2 rounded-2xl overflow-hidden"
                    style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.05)" }}
                >
                    <div
                        className="px-6 py-5 flex items-center justify-between"
                        style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                    >
                        <h2 className="font-black text-black text-base" style={{ letterSpacing: "-0.02em" }}>
                            Dernières Transactions
                        </h2>
                        <Link
                            href="/pay/transactions"
                            className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors text-emerald-600 hover:text-emerald-700"
                        >
                            Voir tout <ArrowUpRight size={12} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ background: "rgba(0,0,0,0.02)" }}>
                                    {["Réf.", "Client", "Montant", "Statut", "AML", "Date"].map((h) => (
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
                                {recentTransactions.map((tx) => (
                                    <tr
                                        key={tx.id}
                                        className="transition-colors border-t border-slate-100 hover:bg-slate-50/50 cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
                                                {tx.id.replace("PAY-20260621-", "")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-semibold text-slate-800">
                                            {tx.customer}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900">
                                            {tx.amount}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={getStatusStyle(tx.status)}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={getAmlStyle(tx.aml)}>
                                                {tx.aml}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[11px] font-medium text-slate-400">
                                            {format(tx.time, "HH:mm")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
