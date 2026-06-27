"use client";

import { useState } from "react";
import { Activity, ShieldCheck, Settings, Globe, Zap, AlertTriangle, Fingerprint, Database, Check, X, ShieldAlert, ArrowRight } from "lucide-react";
import { GlobeMap } from "@/components/ui/globe-map";

export default function AmlProfilesPage() {
    // Mock data for Risk Rules
    const [rules, setRules] = useState([
        { id: "RULE-01", name: "Vélocité Journalière", type: "VELOCITY", limit: "500,000 XOF", action: "BLOCK", active: true, desc: "Bloque les transactions dépassant le plafond journalier." },
        { id: "RULE-02", name: "Screening Sanctions (OFAC)", type: "SANCTIONS", limit: "Fuzzy 85%", action: "REVIEW", active: true, desc: "Place en revue manuelle les correspondances partielles." },
        { id: "RULE-03", name: "Connexion Pays Haut Risque", type: "GEO", limit: "Liste Rouge", action: "BLOCK", active: true, desc: "Rejette les flux provenant de zones géographiques interdites." },
        { id: "RULE-04", name: "Micro-Transactions Répétées", type: "STRUCTURING", limit: "10 TX / 1h", action: "REVIEW", active: true, desc: "Détecte les tentatives de contournement des seuils (Structuring)." },
        { id: "RULE-05", name: "Changement de Device", type: "DEVICE", limit: "N/A", action: "ALLOW", active: false, desc: "Log simplement les nouveaux appareils sans bloquer le flux." },
    ]);

    const toggleRule = (id: string) => {
        setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "VELOCITY": return <Zap size={16} className="text-amber-500" />;
            case "SANCTIONS": return <Database size={16} className="text-red-500" />;
            case "GEO": return <Globe size={16} className="text-indigo-500" />;
            case "STRUCTURING": return <Activity size={16} className="text-orange-500" />;
            default: return <Fingerprint size={16} className="text-slate-500" />;
        }
    };

    const getActionStyle = (action: string) => {
        switch (action) {
            case "BLOCK": return "bg-red-50 text-red-700 border-red-200";
            case "REVIEW": return "bg-amber-50 text-amber-700 border-amber-200";
            case "ALLOW": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            default: return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    return (
        <div className="p-8 space-y-8 min-h-full bg-[#f8fafc]">
            {/* ── Page header ────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-px" style={{ background: "#0ea5e9" }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#0ea5e9" }}>
                            Moteur de Règles AML
                        </span>
                    </div>
                    <h1 className="font-black text-black flex items-center gap-3" style={{ fontSize: 28, letterSpacing: "-0.03em" }}>
                        <ShieldCheck className="text-sky-500" size={28} />
                        Profils de Risque
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                        Configurez les seuils de tolérance et les actions automatisées du moteur de screening en fonction de votre appétit au risque.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                        <Settings size={16} />
                        Paramètres Avancés
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 rounded-xl text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-md active:scale-95 group">
                        <Activity size={16} className="text-sky-400 group-hover:rotate-180 transition-transform duration-500" />
                        Nouvelle Règle
                    </button>
                </div>
            </div>

            {/* ── Matrices de Risque (Bento) ─────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Risk Appetite Score */}
                <div className="rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group h-56 bg-sky-950 border border-sky-900 shadow-xl">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500 rounded-full blur-[80px] opacity-20 pointer-events-none" />
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <div className="text-[10px] text-sky-400 font-bold uppercase tracking-widest mb-1">
                                Appétit au Risque
                            </div>
                            <div className="text-xs text-white/50 font-medium">Calibrage Global</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md">
                            <Activity size={18} />
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="text-4xl font-black text-white tracking-tight mb-2">
                            MODÉRÉ
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-sky-200">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            Taux de Friction: 4.2%
                        </div>
                    </div>
                </div>

                {/* Geo Matrix */}
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col h-56 transition-shadow hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <Globe size={18} className="text-indigo-500" />
                            <span className="font-bold text-slate-800">Matrice Géographique</span>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3 justify-center">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-500">Pays Bloqués (Blacklist)</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-50 text-red-600 border border-red-100">14 PAYS</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-500">Pays à Haut Risque</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-50 text-amber-600 border border-amber-100">28 PAYS</span>
                        </div>
                    </div>
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mt-auto">
                        Gérer les listes <ArrowRight size={12} />
                    </button>
                </div>

                {/* Sanctions & PEP */}
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col h-56 transition-shadow hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <ShieldAlert size={18} className="text-red-500" />
                            <span className="font-bold text-slate-800">Screening (OFAC/UN)</span>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="text-3xl font-black text-slate-900 mb-1">85%</div>
                        <div className="text-xs font-semibold text-slate-500">Seuil de tolérance (Fuzzy Matching)</div>
                        <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 w-[85%]" />
                        </div>
                    </div>
                </div>

            </div>

            {/* ── 3D Globe Security Map ──────────────────────────────── */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm relative flex flex-col md:flex-row items-center p-8 gap-8">
                <div className="w-full md:w-1/3 flex flex-col justify-center z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                            Live Threat Map
                        </h2>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mb-6">
                        Localisation en temps réel des transactions bloquées et des zones géographiques sous surveillance active.
                    </p>

                    <div className="flex flex-col gap-3">
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alertes Détectées</div>
                                <div className="text-base font-black text-slate-900">12 Cas Actifs</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-2/3 flex items-center justify-center relative">
                    {/* The globe naturally sizes to 1:1 aspect ratio inside this container */}
                    <GlobeMap />
                </div>
            </div>

            {/* ── Active Rules Engine ────────────────────────────────── */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h2 className="text-lg font-black text-slate-900">Règles Déployées</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Configuration active sur le moteur transactionnel.</p>
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {rules.map(rule => (
                        <div key={rule.id} className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                            
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${rule.active ? 'bg-slate-50 border-slate-200' : 'bg-slate-50 opacity-50 border-transparent'}`}>
                                    {getTypeIcon(rule.type)}
                                </div>
                                
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className={`text-sm font-bold ${rule.active ? 'text-slate-900' : 'text-slate-400'}`}>
                                            {rule.name}
                                        </h3>
                                        <span className="text-[10px] font-mono font-bold text-slate-400">{rule.id}</span>
                                    </div>
                                    <p className={`text-xs ${rule.active ? 'text-slate-500' : 'text-slate-400 opacity-60'} max-w-xl`}>
                                        {rule.desc}
                                    </p>
                                    
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${rule.active ? 'bg-slate-100 text-slate-600 border-slate-200' : 'opacity-50'}`}>
                                            {rule.type}
                                        </div>
                                        {rule.limit !== "N/A" && (
                                            <div className={`text-[10px] font-bold uppercase text-slate-500 ${!rule.active && 'opacity-50'}`}>
                                                SEUIL: <span className="text-slate-700">{rule.limit}</span>
                                            </div>
                                        )}
                                        <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${rule.active ? getActionStyle(rule.action) : 'opacity-50'}`}>
                                            ACTION: {rule.action}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Toggle Switch */}
                            <div className="flex-shrink-0">
                                <button 
                                    onClick={() => toggleRule(rule.id)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                                        rule.active ? 'bg-sky-500' : 'bg-slate-200'
                                    }`}
                                >
                                    <span 
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            rule.active ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
