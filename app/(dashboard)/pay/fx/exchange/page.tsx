import { ArrowRightLeft, Coins, Wallet, History, Search, ArrowUpRight, ArrowDownRight, Settings2, CheckCircle2 } from "lucide-react";

export default function FXChangePage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            {/* ── Page Header ────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">FX Change</h2>
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">Internal Swap</span>
                    </div>
                    <p className="text-slate-500 mt-1">Convertissez vos soldes internes instantanément via le FX Quote Engine.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-full font-medium hover:bg-slate-50 transition shadow-sm text-sm flex items-center gap-2">
                        <History className="w-4 h-4" />
                        Historique des Swaps
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* FX SWAP COMPONENT (Left Column) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
                                Convertir des Fonds
                            </h3>
                            <button className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full transition-colors border border-slate-200">
                                <Settings2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-2 relative z-10">
                            {/* FROM */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-colors focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-bold text-slate-500">De (Débit)</label>
                                    <span className="text-xs font-medium text-slate-400">Solde: $4,250,000</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input 
                                        type="text" 
                                        value="5,000.00" 
                                        className="bg-transparent text-4xl font-black text-slate-900 w-full outline-none"
                                        readOnly
                                    />
                                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm shrink-0 cursor-pointer hover:bg-slate-50 transition-colors">
                                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold">USD</div>
                                        <span className="font-bold text-slate-700">USD</span>
                                    </div>
                                </div>
                            </div>

                            {/* SWAP BUTTON */}
                            <div className="flex justify-center -my-4 relative z-20">
                                <button className="w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-md text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all hover:scale-105">
                                    <ArrowDownRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* TO */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-colors focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-bold text-slate-500">Vers (Crédit)</label>
                                    <span className="text-xs font-medium text-slate-400">Solde: 850,000,000 XOF</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input 
                                        type="text" 
                                        value="3,025,500" 
                                        className="bg-transparent text-4xl font-black text-indigo-900 w-full outline-none"
                                        readOnly
                                    />
                                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm shrink-0 cursor-pointer hover:bg-slate-50 transition-colors">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs text-white font-bold">CFA</div>
                                        <span className="font-bold text-slate-700">XOF</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* QUOTE INFO */}
                        <div className="mt-6 p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 flex flex-col gap-2 relative z-10">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Taux Garanti (15 min)</span>
                                <span className="font-bold text-slate-900">1 USD = 605.10 XOF</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Marge FX Tchedes (Spread)</span>
                                <span className="font-bold text-emerald-600">0.50% inclus</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Frais de réseau</span>
                                <span className="font-bold text-slate-900">Gratuit (Interne)</span>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 relative z-10 group">
                            Confirmer la Conversion
                            <ArrowRightLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Internal Wallets (Right Column) */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                            <Wallet className="w-32 h-32" />
                        </div>
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2 bg-indigo-500/20 rounded-xl">
                                <Wallet className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 className="text-lg font-bold">Vos Wallets Internes</h3>
                        </div>
                        
                        <div className="space-y-4 relative z-10">
                            {[
                                { currency: "USD", symbol: "$", balance: "4,250,000", type: "Fiat" },
                                { currency: "EUR", symbol: "€", balance: "2,840,000", type: "Fiat" },
                                { currency: "XOF", symbol: "CFA", balance: "850,000,000", type: "Mobile Money" },
                                { currency: "USDC", symbol: "USDC", balance: "5,100,000", type: "Stablecoin" },
                            ].map((pool, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-slate-300 text-xs">
                                            {pool.currency}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-200">{pool.currency}</div>
                                            <div className="text-[10px] text-slate-400">{pool.type}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-white">{pool.symbol}{pool.balance}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Les échanges internes (FX Change) sont réglés instantanément et n'engendrent aucun frais de réseau externe. Le taux affiché inclut la marge Tchedes.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* ── HISTORIQUE DES SWAPS INTERNES ───────────────────── */}
            <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Historique des Swaps</h3>
                        <p className="text-sm text-slate-500 mt-1">Vos conversions récentes entre portefeuilles internes.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">
                            Filtrer
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="py-4 px-6">ID Swap</th>
                                    <th className="py-4 px-6">Débit (From)</th>
                                    <th className="py-4 px-6">Crédit (To)</th>
                                    <th className="py-4 px-6">Taux Garanti</th>
                                    <th className="py-4 px-6">Date</th>
                                    <th className="py-4 px-6 text-right">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { id: "SWP-1045", from: "$5,000", to: "3,025,500 XOF", rate: "1 USD = 605.10 XOF", date: "Aujourd'hui, 10:14", status: "COMPLETED" },
                                    { id: "SWP-1044", from: "€12,000", to: "13,022.40 USDC", rate: "1 EUR = 1.0852 USDC", date: "Hier, 16:30", status: "COMPLETED" },
                                    { id: "SWP-1043", from: "5,000,000 NGN", to: "$3,447.80", rate: "1 USD = 1,450.20 NGN", date: "19 Juin, 09:45", status: "COMPLETED" },
                                    { id: "SWP-1042", from: "$1,500", to: "€1,385.00", rate: "1 USD = 0.9233 EUR", date: "18 Juin, 14:20", status: "COMPLETED" },
                                ].map((swap, i) => (
                                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                        <td className="py-4 px-6 font-mono text-indigo-600 font-bold group-hover:underline">{swap.id}</td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-900">{swap.from}</div>
                                            <div className="text-[10px] text-slate-500">Wallet Interne</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-900">{swap.to}</div>
                                            <div className="text-[10px] text-slate-500">Wallet Interne</div>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600 font-medium">{swap.rate}</td>
                                        <td className="py-4 px-6 text-slate-500 font-medium">{swap.date}</td>
                                        <td className="py-4 px-6 text-right">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                                                <CheckCircle2 className="w-3 h-3" />
                                                {swap.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
