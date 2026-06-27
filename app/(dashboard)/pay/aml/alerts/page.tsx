"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Search, Filter, AlertOctagon, CheckCircle2, FileText, ChevronRight, Activity, Globe, Zap, AlertTriangle, Fingerprint } from "lucide-react";
import { format } from "date-fns";

export default function AmlAlertsPage() {
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        setAlerts([
            { id: "ALT-2026-0001", type: "VELOCITY_BREACH", severity: "HIGH", customer: "+225 0102030405", status: "NEW", date: new Date(), desc: "Dépassement seuil de 500,000 XOF en 24h", score: 85 },
            { id: "ALT-2026-0002", type: "SANCTIONS_HIT", severity: "CRITICAL", customer: "Ousmane Sonko", status: "IN_REVIEW", date: new Date(Date.now() - 3600000), desc: "Correspondance Fuzzy 85% avec liste OFAC", score: 98 },
            { id: "ALT-2026-0003", type: "HIGH_RISK_GEO", severity: "MEDIUM", customer: "+221 771234567", status: "NEW", date: new Date(Date.now() - 7200000), desc: "Connexion depuis zone à risque (Mali)", score: 65 },
            { id: "ALT-2026-0004", type: "STRUCTURING", severity: "HIGH", customer: "+228 90123456", status: "CLOSED", date: new Date(Date.now() - 86400000), desc: "3 transactions de 190,000 XOF (sous le seuil de KYC)", score: 80 },
            { id: "ALT-2026-0005", type: "NEW_DEVICE", severity: "LOW", customer: "+225 0506070809", status: "CLOSED", date: new Date(Date.now() - 172800000), desc: "Connexion sur un nouvel appareil non reconnu", score: 35 },
        ]);
    }, []);

    const getSeverityStyle = (severity: string) => {
        switch (severity) {
            case "CRITICAL": return "text-red-500 bg-red-500/10 border-red-500/20";
            case "HIGH": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
            case "MEDIUM": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
            case "LOW": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
            default: return "text-slate-500 bg-slate-500/10 border-slate-500/20";
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "VELOCITY_BREACH": return <Zap size={16} />;
            case "SANCTIONS_HIT": return <AlertTriangle size={16} />;
            case "HIGH_RISK_GEO": return <Globe size={16} />;
            case "STRUCTURING": return <Activity size={16} />;
            case "NEW_DEVICE": return <Fingerprint size={16} />;
            default: return <ShieldAlert size={16} />;
        }
    };

    if (alerts.length === 0) {
        return (
            <div className="p-8 flex items-center justify-center min-h-full">
                <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 min-h-full">
            {/* ── Page header ────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-px" style={{ background: "#f59e0b" }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#f59e0b" }}>
                            SOC & Conformité
                        </span>
                    </div>
                    <h1 className="font-black text-black flex items-center gap-3" style={{ fontSize: 28, letterSpacing: "-0.03em" }}>
                        <ShieldAlert className="text-amber-500" size={28} />
                        Alertes AML
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Surveillance en temps réel des risques de blanchiment et de financement du terrorisme.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 rounded-full text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 group">
                        <FileText size={16} className="text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
                        Générer Rapport STR
                    </button>
                </div>
            </div>

            {/* ── Security Bento Grid ────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Global Threat Level (Span 4) */}
                <div className="col-span-1 md:col-span-4 rounded-3xl p-6 bg-slate-900 relative overflow-hidden flex flex-col justify-between border border-slate-800 shadow-[0_20px_40px_-10px_rgba(245,158,11,0.15)] group transition-transform hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/20 rounded-full blur-[60px] pointer-events-none group-hover:bg-amber-500/30 transition-colors duration-700" />
                    
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                                Niveau de Menace Global
                            </span>
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                            </span>
                        </div>
                        
                        <div className="text-4xl font-black text-white mb-1">
                            ÉLEVÉ
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                            Score de risque agrégé : <span className="text-amber-400 font-bold">72/100</span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[10%]" />
                        </div>
                        <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[40%]" />
                        </div>
                        <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-[50%]" />
                        </div>
                    </div>
                </div>

                {/* KPI Metrics (Span 8) */}
                <div className="col-span-1 md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "À Traiter", val: "12", color: "text-red-500", bg: "bg-red-50 border-red-100", icon: <AlertOctagon size={16} className="text-red-500" /> },
                        { label: "En Revue", val: "5", color: "text-amber-500", bg: "bg-amber-50 border-amber-100", icon: <Activity size={16} className="text-amber-500" /> },
                        { label: "Escaladés (Compliance)", val: "2", color: "text-orange-600", bg: "bg-orange-50 border-orange-100", icon: <ShieldAlert size={16} className="text-orange-500" /> },
                        { label: "Faux Positifs (7j)", val: "48", color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-100", icon: <CheckCircle2 size={16} className="text-emerald-500" /> }
                    ].map(s => (
                        <div key={s.label} className={`rounded-3xl p-5 border flex flex-col justify-between transition-transform hover:-translate-y-1 ${s.bg}`}>
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
                                {s.icon}
                            </div>
                            <div>
                                <div className={`text-3xl font-black tracking-tight mb-1 ${s.color}`}>{s.val}</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Alerts Data List ───────────────────────────────────── */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                
                {/* List Toolbar */}
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 gap-4">
                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-xs font-bold bg-white text-slate-900 border border-slate-200 rounded-lg shadow-sm">Toutes les alertes</button>
                        <button className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 border border-transparent rounded-lg transition-colors">Criticité Haute</button>
                        <button className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 border border-transparent rounded-lg transition-colors">En Attente</button>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input 
                                type="text" 
                                placeholder="Rechercher ID, Client, Motif..." 
                                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                            />
                        </div>
                        <button className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50">
                            <Filter size={16} />
                        </button>
                    </div>
                </div>

                {/* List Content */}
                <div className="divide-y divide-slate-100">
                    {alerts.map(alert => (
                        <div key={alert.id} className="p-5 hover:bg-slate-50/80 transition-colors flex items-center gap-6 cursor-pointer group">
                            
                            {/* Score Ring */}
                            <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
                                <svg className="w-12 h-12 transform -rotate-90">
                                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                                        strokeDasharray={125} 
                                        strokeDashoffset={125 - (125 * alert.score) / 100}
                                        className={
                                            alert.score >= 90 ? "text-red-500" : 
                                            alert.score >= 70 ? "text-orange-500" : 
                                            alert.score >= 50 ? "text-amber-500" : "text-blue-500"
                                        }
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute text-[10px] font-black text-slate-700">{alert.score}</span>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                {/* Core Info */}
                                <div className="md:col-span-4">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-xs font-mono font-bold text-slate-500">{alert.id}</span>
                                        <span className={`flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded border ${getSeverityStyle(alert.severity)}`}>
                                            {alert.severity}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                        <span className={
                                            alert.severity === 'CRITICAL' ? 'text-red-500' :
                                            alert.severity === 'HIGH' ? 'text-orange-500' : 'text-slate-500'
                                        }>
                                            {getTypeIcon(alert.type)}
                                        </span>
                                        {alert.type.replace('_', ' ')}
                                    </h3>
                                </div>

                                {/* Context */}
                                <div className="md:col-span-5">
                                    <p className="text-sm font-semibold text-slate-800">{alert.customer}</p>
                                    <p className="text-xs text-slate-500 mt-0.5 truncate bg-slate-100/50 inline-block px-2 py-0.5 rounded">
                                        <span className="font-semibold text-slate-600">Motif:</span> {alert.desc}
                                    </p>
                                </div>

                                {/* Status & Date */}
                                <div className="md:col-span-3 flex flex-col md:items-end gap-1.5">
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                                        alert.status === 'NEW' ? 'border-red-200 bg-red-50 text-red-700' :
                                        alert.status === 'IN_REVIEW' ? 'border-amber-200 bg-amber-50 text-amber-700' :
                                        'border-slate-200 bg-slate-50 text-slate-500'
                                    }`}>
                                        {alert.status.replace('_', ' ')}
                                    </span>
                                    <span className="text-[11px] font-medium text-slate-400">
                                        {format(alert.date, "dd MMM, HH:mm")}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-shrink-0 text-slate-300 group-hover:text-amber-500 transition-colors w-8 flex justify-end">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
