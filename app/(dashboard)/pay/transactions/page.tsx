"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Download, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

export default function TransactionsPage() {
    // Fix hydration mismatch by only setting mock data on client side
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const mockData = Array.from({ length: 15 }).map((_, i) => ({
            id: `PAY-20260621-${100 + i}`,
            customer: i % 3 === 0 ? "Orange CI - +225 0102030405" : "MTN CI - +225 0506070809",
            amount: `${(Math.random() * 50000 + 1000).toFixed(0)} XOF`,
            status: i === 2 ? "HELD" : i === 5 ? "FAILED" : "COMPLETED",
            amlDecision: i === 2 ? "REVIEW" : i === 5 ? "BLOCK" : "ALLOW",
            date: new Date(Date.now() - i * 3600000),
        }));
        setTransactions(mockData);
    }, []);

    if (transactions.length === 0) {
        return <div className="p-8 space-y-6 min-h-full flex items-center justify-center">
            <span className="text-slate-400">Chargement...</span>
        </div>;
    }

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "COMPLETED": return "status-pill bg-emerald-100 text-emerald-800";
            case "PENDING": return "status-pill bg-slate-100 text-slate-800";
            case "HELD": return "status-pill bg-amber-100 text-amber-800";
            case "FAILED": return "status-pill bg-red-100 text-red-800";
            default: return "status-pill bg-slate-100 text-slate-800";
        }
    };

    return (
        <div className="p-8 space-y-6 min-h-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="font-black text-black" style={{ fontSize: 28, letterSpacing: "-0.03em" }}>
                        Transactions
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">Historique complet des paiements et encaissements.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                        <Filter size={16} />
                        Filtres
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                        <Download size={16} />
                        Exporter
                    </button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Volume du Jour", val: "15.2M", unit: "XOF", color: "text-emerald-600" },
                    { label: "Taux de Succès", val: "99.2", unit: "%", color: "text-emerald-600" },
                    { label: "Rejets Techniques", val: "0.5", unit: "%", color: "text-amber-500" },
                    { label: "Bloquées (AML)", val: "12", unit: "Cas", color: "text-red-500" }
                ].map(s => (
                    <div key={s.label} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</span>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-2xl font-black ${s.color}`}>{s.val}</span>
                            <span className="text-xs font-bold text-slate-400">{s.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex gap-4 items-center w-full max-w-md">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Rechercher par référence, client..." 
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981]"
                        />
                    </div>
                </div>
                <div className="flex gap-2 text-sm font-semibold text-slate-500">
                    <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-900">Toutes</button>
                    <button className="px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Réussies</button>
                    <button className="px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Échouées</button>
                    <button className="px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Bloquées AML</button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Référence</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Montant</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Risque AML</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                            {tx.id}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">
                                        {format(tx.date, "dd MMM yyyy, HH:mm")}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                                        {tx.customer}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black text-slate-900">
                                        {tx.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={getStatusStyle(tx.status)}>{tx.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                            tx.amlDecision === 'ALLOW' ? 'bg-emerald-50 text-emerald-600' :
                                            tx.amlDecision === 'REVIEW' ? 'bg-amber-50 text-amber-600' :
                                            'bg-red-50 text-red-600'
                                        }`}>
                                            {tx.amlDecision}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 text-slate-400 hover:text-emerald-600 transition-colors rounded hover:bg-emerald-50">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Affichage de 1 à 15 sur 2,400</span>
                    <div className="flex gap-1">
                        <button className="p-1.5 border border-slate-200 rounded text-slate-400 hover:bg-slate-50 disabled:opacity-50">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-1.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 font-medium text-sm px-3 bg-slate-50">1</button>
                        <button className="p-1.5 border border-transparent rounded text-slate-600 hover:bg-slate-50 font-medium text-sm px-3">2</button>
                        <button className="p-1.5 border border-transparent rounded text-slate-600 hover:bg-slate-50 font-medium text-sm px-3">3</button>
                        <button className="p-1.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-50">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
