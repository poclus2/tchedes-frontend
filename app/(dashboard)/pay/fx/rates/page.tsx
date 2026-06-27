import { Activity, ArrowRightLeft, Search, TrendingDown, TrendingUp, AlertCircle, Clock, LineChart, SlidersHorizontal } from "lucide-react";

export default function FXRatesPage() {
    // Mock data for FX rates
    const rates = [
        { pair: "USD/XOF", rate: "605.10", inverse: "0.00165", spread: "0.50%", change24h: "+0.12%", trend: "up", type: "Fiat" },
        { pair: "EUR/XOF", rate: "655.95", inverse: "0.00152", spread: "0.40%", change24h: "0.00%", trend: "neutral", type: "Fiat" },
        { pair: "USDC/XOF", rate: "599.42", inverse: "0.00166", spread: "0.20%", change24h: "+0.05%", trend: "up", type: "Crypto" },
        { pair: "USD/NGN", rate: "1,450.20", inverse: "0.00068", spread: "1.50%", change24h: "-1.40%", trend: "down", type: "Fiat" },
        { pair: "GBP/KES", rate: "165.40", inverse: "0.00604", spread: "1.20%", change24h: "+0.80%", trend: "up", type: "Fiat" },
        { pair: "EUR/USD", rate: "1.08", inverse: "0.92592", spread: "0.10%", change24h: "-0.20%", trend: "down", type: "Fiat" },
    ];

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
            {/* ── Page Header ────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">FX Rates</h2>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-100 flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live Market Data
                        </span>
                    </div>
                    <p className="text-slate-500 mt-1 font-medium">Consultez en temps réel les taux de change et les spreads appliqués par Tchedes.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher une paire..." 
                            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow w-64 shadow-sm"
                        />
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm text-sm flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filtres
                    </button>
                </div>
            </div>

            {/* ── Market Overview Cards ──────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <Activity className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Paires Actives</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <span className="text-4xl font-black text-slate-900">42</span>
                        <p className="text-sm text-slate-500 mt-2 font-medium">Couvrant 18 pays africains.</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <ArrowRightLeft className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Spread Moyen</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-slate-900">0.85%</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-2 font-medium">Moyenne pondérée Tchedes.</p>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
                    <div className="flex items-center justify-between z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-300 border border-white/5">
                                <Clock className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">Mise à jour</span>
                        </div>
                    </div>
                    <div className="mt-6 z-10">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-white">15ms</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-2 font-medium">Latence du Quote Engine.</p>
                    </div>
                </div>
            </div>

            {/* ── Rates Table ────────────────────────────────────────── */}
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900">Taux de Change Tchedes</h3>
                    <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-2">
                        <LineChart className="w-4 h-4" />
                        Historique des Taux
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider bg-white">
                                <th className="py-4 px-6">Paire de Devises</th>
                                <th className="py-4 px-6">Type</th>
                                <th className="py-4 px-6">Taux Actuel</th>
                                <th className="py-4 px-6">Taux Inverse</th>
                                <th className="py-4 px-6">Spread Tchedes</th>
                                <th className="py-4 px-6 text-right">Évolution (24h)</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {rates.map((rate, i) => {
                                const [base, quote] = rate.pair.split("/");
                                return (
                                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex -space-x-2">
                                                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold z-10 shadow-sm">{base}</div>
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] text-slate-600 font-bold shadow-sm">{quote}</div>
                                                </div>
                                                <span className="font-bold text-slate-900">{rate.pair}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                rate.type === 'Crypto' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                {rate.type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-black text-slate-900">{rate.rate}</div>
                                            <div className="text-[10px] font-medium text-slate-400">1 {base} = {rate.rate} {quote}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-slate-700">{rate.inverse}</div>
                                            <div className="text-[10px] font-medium text-slate-400">1 {quote} = {rate.inverse} {base}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md text-xs">{rate.spread}</span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className={`flex items-center gap-1 font-bold text-xs ${
                                                    rate.trend === 'up' ? 'text-emerald-600' :
                                                    rate.trend === 'down' ? 'text-red-500' : 'text-slate-500'
                                                }`}>
                                                    {rate.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
                                                    {rate.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
                                                    {rate.trend === 'neutral' && <span className="w-2 h-0.5 bg-slate-400 rounded-full mx-1"></span>}
                                                    {rate.change24h}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <AlertCircle className="w-4 h-4 text-slate-400" />
                    Les taux incluent la marge Tchedes (Spread) et sont rafraîchis via le réseau décentralisé.
                </div>
            </div>
        </div>
    );
}
