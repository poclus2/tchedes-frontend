"use client";

import { useState, useEffect } from "react";
import { Wallet, ArrowDownUp, Plus, ArrowUpRight, ArrowDownLeft, Settings, History, RefreshCcw, Landmark, CreditCard, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export default function WalletsPage() {
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const mockData = Array.from({ length: 6 }).map((_, i) => ({
            id: `WTX-${2026062100 + i}`,
            type: i % 3 === 0 ? "DEPOSIT" : i % 2 === 0 ? "WITHDRAWAL" : "CONVERSION",
            amount: i % 3 === 0 ? "+5,000,000 XOF" : i % 2 === 0 ? "-250,000 XOF" : "1,000 USD → XOF",
            status: i === 5 ? "PENDING" : "COMPLETED",
            date: new Date(Date.now() - i * 86400000),
            desc: i % 3 === 0 ? "Rechargement Bancaire" : i % 2 === 0 ? "Retrait vers Banque" : "Conversion Stablecoin",
        }));
        setTransactions(mockData);
    }, []);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "DEPOSIT": return <ArrowDownLeft size={16} className="text-emerald-500" />;
            case "WITHDRAWAL": return <ArrowUpRight size={16} className="text-rose-500" />;
            case "CONVERSION": return <RefreshCcw size={16} className="text-indigo-500" />;
            default: return <History size={16} className="text-slate-500" />;
        }
    };

    if (transactions.length === 0) {
        return (
            <div className="p-8 flex items-center justify-center min-h-full">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 min-h-full">
            
            {/* ── Page header ────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-px" style={{ background: "#10b981" }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#10b981" }}>
                            Trésorerie
                        </span>
                    </div>
                    <h1 className="font-black text-black" style={{ fontSize: 28, letterSpacing: "-0.03em" }}>
                        Wallets & Soldes
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Consultez vos soldes disponibles, effectuez des conversions et gérez vos comptes virtuels.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-slate-700 bg-white border border-slate-200 transition-all hover:shadow-md hover:bg-slate-50 active:scale-95">
                        <ArrowDownUp size={14} />
                        Convertir
                    </button>
                    <button 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all active:scale-95 group relative overflow-hidden"
                        style={{ background: "#10b981" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
                    >
                        <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                        Alimenter
                    </button>
                </div>
            </div>

            {/* ── Wallets Grid ───────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Principal XOF Wallet (Glassmorphism Emerald) */}
                <div className="rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group transition-transform hover:-translate-y-1 h-64 border border-emerald-500/20 shadow-xl shadow-emerald-500/5 bg-gradient-to-br from-slate-900 to-slate-800">
                    {/* Background glow & mesh */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">
                                Portefeuille Principal
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[9px] font-black bg-white/10 text-white">XOF</span>
                                <span className="text-xs text-white/50 font-medium">Franc CFA (BCEAO)</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md">
                            <Landmark size={18} />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
                            45.2M
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-xs font-medium text-emerald-100/70">
                                ≈ $74,800 USD
                            </div>
                            <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white backdrop-blur-md">
                                <Settings size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stablecoin / Remittance Wallet (Indigo Premium) */}
                <div className="rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group transition-transform hover:-translate-y-1 h-64 border border-indigo-500/20 shadow-xl shadow-indigo-500/5 bg-gradient-to-br from-indigo-950 to-slate-900">
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">
                                Compte Remittance
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[9px] font-black bg-white/10 text-white">USD</span>
                                <span className="text-xs text-white/50 font-medium">USDC / Transak</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md">
                            <Wallet size={18} />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
                            12,450.00
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-xs font-medium text-indigo-100/70">
                                0.00 bloqués en réserve
                            </div>
                            <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white backdrop-blur-md">
                                <Settings size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add New Wallet CTA */}
                <button className="rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center group h-64 border-2 border-dashed border-slate-200 hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all">
                    <div className="w-14 h-14 rounded-full bg-slate-100 group-hover:bg-emerald-100 text-slate-400 group-hover:text-emerald-500 flex items-center justify-center transition-colors mb-4">
                        <Plus size={24} />
                    </div>
                    <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-700 transition-colors">
                        Ouvrir un nouveau compte
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                        EUR, GBP, ou Devises Locales
                    </span>
                </button>
            </div>

            {/* ── Transaction History (Wallet Context) ──────────────── */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-black text-slate-900">Activité des Comptes</h2>
                    <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1">
                        Voir tout l'historique <ChevronRight size={16} />
                    </button>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                    <div className="divide-y divide-slate-100">
                        {transactions.map((tx) => (
                            <div 
                                key={tx.id} 
                                className="p-4 hover:bg-slate-50/80 transition-colors flex items-center gap-4 cursor-pointer group"
                            >
                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    tx.type === 'DEPOSIT' ? 'bg-emerald-50 border border-emerald-100' :
                                    tx.type === 'WITHDRAWAL' ? 'bg-rose-50 border border-rose-100' :
                                    'bg-indigo-50 border border-indigo-100'
                                }`}>
                                    {getTypeIcon(tx.type)}
                                </div>

                                {/* Main Info */}
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-slate-900 mb-0.5">{tx.desc}</div>
                                    <div className="text-[11px] text-slate-400 font-medium">
                                        {format(tx.date, "dd MMM yyyy, HH:mm")} · {tx.id}
                                    </div>
                                </div>

                                {/* Amount & Status */}
                                <div className="text-right">
                                    <div className={`text-base font-black mb-1 ${
                                        tx.type === 'DEPOSIT' ? 'text-emerald-600' :
                                        tx.type === 'WITHDRAWAL' ? 'text-slate-900' :
                                        'text-indigo-600'
                                    }`}>
                                        {tx.amount}
                                    </div>
                                    <div>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                            tx.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
