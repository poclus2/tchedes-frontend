"use client";

import { useState, useEffect } from "react";
import { Send, Plus, ArrowUpRight, Activity, Building2, Smartphone, Search, Filter, Download, MoreVertical, Zap } from "lucide-react";
import { format } from "date-fns";

export default function PayoutsPage() {
    const [payouts, setPayouts] = useState<any[]>([]);

    useEffect(() => {
        const mockData = Array.from({ length: 8 }).map((_, i) => ({
            id: `PO-${2026062100 + i}`,
            recipient: i % 4 === 0 ? "Orange Business" : i % 3 === 0 ? "Salaires Juin" : "Fournisseur A",
            subtext: i % 4 === 0 ? "Bank Transfer" : i % 3 === 0 ? "Mass Payout (45)" : "Mobile Money",
            amount: `${(Math.random() * 2000000 + 50000).toFixed(0)} XOF`,
            status: i === 1 ? "PENDING" : i === 4 ? "FAILED" : "COMPLETED",
            date: new Date(Date.now() - i * 14400000),
            type: i % 4 === 0 ? "BANK" : i % 3 === 0 ? "BULK" : "MOBILE",
        }));
        setPayouts(mockData);
    }, []);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "BANK": return <Building2 size={16} className="text-blue-500" />;
            case "BULK": return <Zap size={16} className="text-purple-500" />;
            default: return <Smartphone size={16} className="text-emerald-500" />;
        }
    };

    if (payouts.length === 0) {
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
                            Décaissements
                        </span>
                    </div>
                    <h1 className="font-black text-black" style={{ fontSize: 28, letterSpacing: "-0.03em" }}>
                        Payouts
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Gérez vos flux sortants vers les comptes bancaires et portefeuilles mobiles.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-slate-700 bg-white border border-slate-200 transition-all hover:shadow-md hover:bg-slate-50 active:scale-95">
                        <Download size={14} />
                        Exporter
                    </button>
                    <button 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all active:scale-95 group relative overflow-hidden"
                        style={{ background: "#0a0f1e" }}
                    >
                        {/* Glow effect inside button */}
                        <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                        <Send size={14} className="text-emerald-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        Nouveau Payout
                    </button>
                </div>
            </div>

            {/* ── Liquidity & Volume Bento Box ───────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Available Balance Card (Dark Premium) */}
                <div 
                    className="col-span-1 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group transition-transform hover:-translate-y-1"
                    style={{ 
                        background: "#0a0f1e",
                        boxShadow: "0 20px 40px -10px rgba(16,185,129,0.15)"
                    }}
                >
                    <div 
                        className="absolute top-0 right-0 w-64 h-64 opacity-20 transition-transform duration-700 group-hover:scale-110"
                        style={{ background: "radial-gradient(circle at top right, #10b981 0%, transparent 60%)" }}
                    />
                    
                    <div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                                Liquidité Disponible
                            </span>
                            <Activity size={14} className="text-emerald-400 opacity-50" />
                        </div>
                        <div className="relative z-10">
                            <div className="text-5xl font-black text-white tracking-tight leading-none mb-2">
                                45.2M
                            </div>
                            <div className="text-sm font-bold text-white/50">
                                XOF · Solde Principal
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 relative z-10">
                        <button className="w-full py-3 rounded-xl text-sm font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                            Alimenter le compte <ArrowUpRight size={14} className="opacity-70" />
                        </button>
                    </div>
                </div>

                {/* Monthly Volume Card */}
                <div 
                    className="col-span-1 rounded-3xl p-8 bg-white border border-slate-100 flex flex-col justify-between relative overflow-hidden group transition-transform hover:-translate-y-1"
                    style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.02)" }}
                >
                    <div 
                        className="absolute bottom-0 left-0 w-full h-1/2 opacity-5"
                        style={{ background: "linear-gradient(to top, #6366f1 0%, transparent 100%)" }}
                    />
                    <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-4">
                            Volume Sortant (Mois)
                        </span>
                        <div className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                            128.4M
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                            <ArrowUpRight size={10} /> +14.2% vs M-1
                        </div>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-4">
                        <div className="flex-1">
                            <div className="text-[10px] font-bold text-slate-400 mb-1">MOBILES (65%)</div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[65%]" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="text-[10px] font-bold text-slate-400 mb-1">BANQUES (35%)</div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[35%]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Tasks & Alerts */}
                <div 
                    className="col-span-1 rounded-3xl p-6 bg-white border border-slate-100 flex flex-col gap-3 relative transition-transform hover:-translate-y-1"
                    style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.02)" }}
                >
                    <div className="flex-1 rounded-2xl bg-amber-50/50 border border-amber-100 p-4 flex items-center justify-between">
                        <div>
                            <div className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mb-1">En Cours</div>
                            <div className="text-2xl font-black text-amber-700">12</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-amber-100/50 flex items-center justify-center text-amber-500">
                            <Activity size={18} />
                        </div>
                    </div>

                    <div className="flex-1 rounded-2xl bg-red-50/50 border border-red-100 p-4 flex items-center justify-between">
                        <div>
                            <div className="text-[10px] text-red-600 font-bold uppercase tracking-widest mb-1">Échecs</div>
                            <div className="text-2xl font-black text-red-700">3</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-red-100/50 flex items-center justify-center text-red-500">
                            <Activity size={18} />
                        </div>
                    </div>
                </div>
                
            </div>

            {/* ── Payouts List ───────────────────────────────────────── */}
            <div className="mt-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <div className="flex gap-1 p-1 bg-slate-100/50 rounded-xl border border-slate-200/50">
                        <button className="px-5 py-2 text-xs font-bold bg-white text-slate-900 rounded-lg shadow-sm border border-slate-200/50">Tous</button>
                        <button className="px-5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 rounded-lg transition-colors">Mass Payouts</button>
                        <button className="px-5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 rounded-lg transition-colors">Réussis</button>
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                            type="text" 
                            placeholder="Rechercher une opération..." 
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {payouts.map((po) => (
                        <div 
                            key={po.id} 
                            className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between group hover:border-slate-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-4 w-1/3">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                                    {getTypeIcon(po.type)}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900 mb-0.5">{po.recipient}</div>
                                    <div className="text-xs text-slate-400 font-medium">{po.subtext}</div>
                                </div>
                            </div>

                            <div className="w-1/4">
                                <div className="text-[11px] font-mono font-bold text-slate-500 mb-1">{po.id}</div>
                                <div className="text-[11px] text-slate-400 font-medium">{format(po.date, "dd MMM yyyy, HH:mm")}</div>
                            </div>

                            <div className="w-1/4 text-right">
                                <div className="text-base font-black text-slate-900 mb-1">{po.amount}</div>
                                <div>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                        po.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 
                                        po.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 
                                        'bg-red-50 text-red-600'
                                    }`}>
                                        {po.status}
                                    </span>
                                </div>
                            </div>

                            <div className="w-12 flex justify-end">
                                <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
