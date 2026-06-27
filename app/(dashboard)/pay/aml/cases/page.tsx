"use client";

import { useState, useEffect } from "react";
import { Shield, Search, Filter, AlertTriangle, Clock, ChevronRight, UserCircle2, Briefcase, MessagesSquare, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

export default function AmlCasesPage() {
    const [cases, setCases] = useState<any[]>([]);

    useEffect(() => {
        const mockData = [
            { id: "CASE-2026-089", entity: "Ousmane Sonko", type: "INDIVIDUAL", risk: "CRITICAL", status: "INVESTIGATING", assignee: "A. Diallo", alertsCount: 3, slaHours: 2, lastUpdate: new Date(Date.now() - 15 * 60000) },
            { id: "CASE-2026-088", entity: "Marchand Express SA", type: "CORPORATE", risk: "HIGH", status: "WAITING_INFO", assignee: "K. Touré", alertsCount: 5, slaHours: 14, lastUpdate: new Date(Date.now() - 120 * 60000) },
            { id: "CASE-2026-087", entity: "+225 0102030405", type: "INDIVIDUAL", risk: "HIGH", status: "OPEN", assignee: "Unassigned", alertsCount: 1, slaHours: 23, lastUpdate: new Date(Date.now() - 300 * 60000) },
            { id: "CASE-2026-086", entity: "Global Trade CI", type: "CORPORATE", risk: "MEDIUM", status: "INVESTIGATING", assignee: "A. Diallo", alertsCount: 2, slaHours: 48, lastUpdate: new Date(Date.now() - 1440 * 60000) },
            { id: "CASE-2026-085", entity: "M. Ndiaye", type: "INDIVIDUAL", risk: "LOW", status: "RESOLVED", assignee: "S. Kone", alertsCount: 1, slaHours: 0, lastUpdate: new Date(Date.now() - 2880 * 60000) },
        ];
        setCases(mockData);
    }, []);

    const getRiskStyle = (risk: string) => {
        switch (risk) {
            case "CRITICAL": return "text-red-600 bg-red-50 border-red-200";
            case "HIGH": return "text-orange-600 bg-orange-50 border-orange-200";
            case "MEDIUM": return "text-amber-600 bg-amber-50 border-amber-200";
            default: return "text-blue-600 bg-blue-50 border-blue-200";
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "OPEN": return "text-slate-700 bg-slate-100 border-slate-200";
            case "INVESTIGATING": return "text-indigo-700 bg-indigo-50 border-indigo-200";
            case "WAITING_INFO": return "text-amber-700 bg-amber-50 border-amber-200";
            case "RESOLVED": return "text-emerald-700 bg-emerald-50 border-emerald-200";
            default: return "text-slate-500 bg-slate-50 border-slate-200";
        }
    };

    if (cases.length === 0) {
        return (
            <div className="p-8 flex items-center justify-center min-h-full">
                <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 min-h-full bg-[#fcfcfd]">
            {/* ── Page header ────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-px" style={{ background: "#4f46e5" }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#4f46e5" }}>
                            Investigations AML
                        </span>
                    </div>
                    <h1 className="font-black text-black flex items-center gap-3" style={{ fontSize: 28, letterSpacing: "-0.03em" }}>
                        <Shield className="text-indigo-500" size={28} />
                        Cases (Dossiers)
                    </h1>
                    <p className="text-sm text-gray-400 mt-1 max-w-2xl">
                        Gérez les enquêtes approfondies sur les entités suspectes. Consolidez les alertes, demandez des informations (RFI) et clôturez les dossiers.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-full text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95 group">
                        <Briefcase size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                        Nouveau Dossier Manuel
                    </button>
                </div>
            </div>

            {/* ── KPI & SLA Grid (Linear/Asana Style) ────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Dossiers Actifs", val: "24", sub: "+3 aujourd'hui", color: "text-slate-900" },
                    { label: "SLA < 24h", val: "5", sub: "Attention requise", color: "text-red-500" },
                    { label: "En Attente Client (RFI)", val: "8", sub: "Relances programmées", color: "text-amber-500" },
                    { label: "Temps Résolution Moy.", val: "3.2j", sub: "Mois en cours", color: "text-indigo-500" }
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{s.label}</div>
                        <div>
                            <div className={`text-3xl font-black tracking-tight mb-1 ${s.color}`}>{s.val}</div>
                            <div className="text-xs font-semibold text-slate-400">{s.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Cases Board List ───────────────────────────────────── */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[600px]">
                
                {/* List Toolbar */}
                <div className="p-3 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 gap-4">
                    <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
                        <button className="px-5 py-2 text-xs font-bold bg-white text-slate-900 rounded-lg shadow-sm">Mes Dossiers (12)</button>
                        <button className="px-5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 rounded-lg transition-colors">Non Assignés (3)</button>
                        <button className="px-5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 rounded-lg transition-colors">Tous les Actifs</button>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input 
                                type="text" 
                                placeholder="Rechercher entité ou ID..." 
                                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <button className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50">
                            <Filter size={16} />
                        </button>
                    </div>
                </div>

                {/* List Headers */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100 bg-slate-50/30 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="col-span-3">Dossier / Entité</div>
                    <div className="col-span-2">Risque</div>
                    <div className="col-span-2">Statut & SLA</div>
                    <div className="col-span-2">Assigné à</div>
                    <div className="col-span-2">Activité</div>
                    <div className="col-span-1"></div>
                </div>

                {/* List Content */}
                <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
                    {cases.map(c => (
                        <div key={c.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-indigo-50/30 transition-colors items-center group cursor-pointer">
                            
                            {/* Dossier / Entité */}
                            <div className="col-span-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                                        {c.type === 'CORPORATE' ? <Briefcase size={16} /> : <UserCircle2 size={18} />}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-0.5 truncate">{c.entity}</div>
                                        <div className="text-[10px] font-mono font-bold text-slate-400">{c.id} · {c.alertsCount} Alertes</div>
                                    </div>
                                </div>
                            </div>

                            {/* Risque */}
                            <div className="col-span-2">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getRiskStyle(c.risk)}`}>
                                    {c.risk === 'CRITICAL' && <AlertTriangle size={10} />}
                                    {c.risk}
                                </span>
                            </div>

                            {/* Statut & SLA */}
                            <div className="col-span-2 flex flex-col gap-2">
                                <div>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusStyle(c.status)}`}>
                                        {c.status.replace('_', ' ')}
                                    </span>
                                </div>
                                {c.status !== 'RESOLVED' && (
                                    <div className="flex items-center gap-1 text-[10px] font-bold">
                                        <Clock size={10} className={c.slaHours < 24 ? "text-red-500" : "text-amber-500"} />
                                        <span className={c.slaHours < 24 ? "text-red-500" : "text-slate-500"}>
                                            SLA: {c.slaHours}h rest.
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Assigné à */}
                            <div className="col-span-2">
                                <div className="flex items-center gap-2">
                                    {c.assignee !== 'Unassigned' ? (
                                        <>
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[9px] font-black border border-indigo-200">
                                                {c.assignee.charAt(0)}{c.assignee.split(' ')[1]?.charAt(0) || ''}
                                            </div>
                                            <span className="text-xs font-semibold text-slate-700">{c.assignee}</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 border-dashed flex items-center justify-center text-slate-300">
                                                <UserCircle2 size={12} />
                                            </div>
                                            <span className="text-xs font-semibold text-slate-400 italic">Non assigné</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Activité */}
                            <div className="col-span-2">
                                <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mb-0.5">
                                    <MessagesSquare size={12} className="text-slate-400" />
                                    Mis à jour
                                </div>
                                <div className="text-[10px] font-medium text-slate-400">
                                    {format(c.lastUpdate, "dd MMM, HH:mm")}
                                </div>
                            </div>

                            {/* Action */}
                            <div className="col-span-1 flex justify-end">
                                <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
