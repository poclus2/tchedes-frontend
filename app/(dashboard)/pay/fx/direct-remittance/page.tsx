import { ArrowRightLeft, ArrowUpRight, ArrowDownRight, CheckCircle2, TrendingUp, TrendingDown, Zap, ShieldCheck, Activity } from "lucide-react";
import { GlobeMap } from "@/components/ui/globe-map";

export default function DirectRemittancePage() {
    return (
        <div className="flex-1 space-y-10 p-8 pt-6 max-w-7xl mx-auto">
            {/* ── Page Header ────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Direct Remittance</h2>
                        <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black border border-blue-100 flex items-center gap-1.5 shadow-sm">
                            <Zap className="w-3 h-3 fill-blue-600" />
                            Transak + PawaPay
                        </span>
                    </div>
                    <p className="text-slate-500 mt-1 font-medium">L'infrastructure Web3 pour des transferts fiat-to-mobile money instantanés.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm text-sm">
                        Documentation API
                    </button>
                    <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-md shadow-slate-200 text-sm flex items-center gap-2 group">
                        Nouveau Transfert
                        <ArrowRightLeft className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                </div>
            </div>

            {/* ── HERO SECTION: Generator & Globe ────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
                {/* Background ambient light */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent pointer-events-none"></div>
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Left: Transak Generator Glass Card */}
                <div className="relative z-10 w-full max-w-md mx-auto lg:mx-0">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                        {/* Shimmer effect inside card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                        
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div>
                                <h3 className="text-xl font-bold text-white">Générateur Onramp</h3>
                                <p className="text-xs text-slate-400 mt-1">Lien de paiement hébergé</p>
                            </div>
                            <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white flex items-center gap-2 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Live
                            </div>
                        </div>
                        
                        <div className="space-y-6 relative z-10">
                            {/* FIAT INPUT */}
                            <div>
                                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                    <span>Paiement Client (Fiat)</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl transition-colors hover:bg-white/10">
                                    <span className="text-3xl font-black text-white">1,000</span>
                                    <div className="flex items-center gap-2 bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow-sm">
                                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">€</div>
                                        <span className="font-bold text-sm">EUR</span>
                                    </div>
                                </div>
                            </div>

                            {/* COLLATERAL (USDC) */}
                            <div className="relative">
                                <div className="absolute left-6 -top-4 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent"></div>
                                <div className="pl-14">
                                    <div className="flex items-center gap-3 text-xs font-medium text-slate-400 mb-1">
                                        <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                                        Conversion automatique (Transak)
                                    </div>
                                    <div className="text-white font-bold">
                                        + 1,085.20 <span className="text-blue-400">USDC</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Fonds bloqués sur le Wallet Tchedes (Escrow)</p>
                                </div>
                            </div>
                            
                            {/* PAYOUT OUTPUT */}
                            <div>
                                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                    <span>Décaissement Mobile Money</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-indigo-500/20 border border-indigo-400/30 rounded-2xl shadow-inner shadow-indigo-500/10">
                                    <span className="text-3xl font-black text-white">650,500</span>
                                    <div className="flex items-center gap-2 bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow-sm">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">C</div>
                                        <span className="font-bold text-sm">XOF</span>
                                    </div>
                                </div>
                                <div className="text-xs text-indigo-300 mt-3 flex justify-between font-medium">
                                    <span>Taux Tchedes : 1 USDC = 599.42 XOF</span>
                                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Garanti 15m</span>
                                </div>
                            </div>

                            <button className="w-full mt-4 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group">
                                Générer le Lien Transak
                                <ArrowRightLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: The Interactive Globe */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[400px]">
                    <GlobeMap />
                    <div className="absolute bottom-4 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs text-white/70 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        Visualisation des flux transfrontaliers en temps réel
                    </div>
                </div>
            </div>

            {/* ── HISTORIQUE DES LIENS & TRANSACTIONS ───────────────────── */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Liens & Transactions Remittance</h3>
                        <p className="text-sm text-slate-500 mt-1">Historique des liens Onramp générés et leur statut d'exécution.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">
                            Filtrer
                        </button>
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">
                            Exporter
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="py-4 px-6">ID Lien</th>
                                    <th className="py-4 px-6">Client (Fiat)</th>
                                    <th className="py-4 px-6">Bénéficiaire (MoMo)</th>
                                    <th className="py-4 px-6">Date de Création</th>
                                    <th className="py-4 px-6 text-right">Statut Onramp</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { id: "L-9842", fiat: "€1,000", momo: "650,500 XOF", date: "Aujourd'hui, 14:30", status: "COMPLETED", color: "emerald" },
                                    { id: "L-9841", fiat: "$500", momo: "65,200 KES", date: "Aujourd'hui, 11:15", status: "PENDING_FIAT", color: "amber" },
                                    { id: "L-9840", fiat: "€2,500", momo: "1,626,250 XOF", date: "Hier, 18:45", status: "COMPLETED", color: "emerald" },
                                    { id: "L-9839", fiat: "£800", momo: "1,450,000 NGN", date: "Hier, 09:20", status: "EXPIRED", color: "slate" },
                                    { id: "L-9838", fiat: "€150", momo: "97,500 XOF", date: "19 Juin, 16:00", status: "COMPLETED", color: "emerald" },
                                ].map((link, i) => (
                                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                        <td className="py-4 px-6 font-mono text-indigo-600 font-bold group-hover:underline">{link.id}</td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-900">{link.fiat}</div>
                                            <div className="text-[10px] text-slate-500">Transak</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-900">{link.momo}</div>
                                            <div className="text-[10px] text-slate-500">PawaPay</div>
                                        </td>
                                        <td className="py-4 px-6 text-slate-500 font-medium">{link.date}</td>
                                        <td className="py-4 px-6 text-right">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                link.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                                                link.color === 'amber' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                                                'bg-slate-100 text-slate-500 border border-slate-200'
                                            }`}>
                                                {link.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3" />}
                                                {link.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
                        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Voir tout l'historique</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
