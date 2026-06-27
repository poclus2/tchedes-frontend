"use client"

import { format } from "date-fns"
import CheckoutForm from "@/components/billing/CheckoutForm"

// Fake data pour l'aperçu
const recentTransactions = [
    { id: "trx_8fa92b1c", date: "2026-06-08T14:32:00Z", desc: "Recharge Mobile Money", amount: "+ 10,000 FCFA", status: "verified" },
    { id: "trx_9xb21k0p", date: "2026-06-05T09:15:00Z", desc: "Frais KYC (Mai 2026)", amount: "- 4,500 FCFA", status: "verified" },
    { id: "trx_1nc76m3z", date: "2026-06-01T11:00:00Z", desc: "Recharge Carte Bancaire", amount: "+ 25,000 FCFA", status: "verified" },
    { id: "trx_5pq09v4r", date: "2026-05-28T16:45:00Z", desc: "Recharge Mobile Money", amount: "+ 5,000 FCFA", status: "rejected" },
]

export default function BillingPage() {
    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Facturation & Paiements</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Gérez votre solde, vos recharges et consultez votre historique de transactions.
                    </p>
                </div>
            </div>

            {/* Layout Grid: Stats + Checkout Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Left Column: Stats */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Solde Actuel - Dark Card */}
                        <div className="stat-card-dark text-white">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-slate-400 font-medium text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                                    Solde Actuel
                                </h3>
                                <span className="status-pill status-verified bg-[rgba(16,185,129,0.15)] text-emerald-400 border border-emerald-500/20">
                                    Actif
                                </span>
                            </div>
                            <div className="text-4xl font-display font-bold tracking-tight mb-1">
                                45,500 <span className="text-xl text-slate-400 font-normal">FCFA</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-4">
                                Vous êtes sur la facturation <strong className="text-white">Prépayée (Pay-as-you-go)</strong>.
                            </p>
                            
                            {/* Decorative glow */}
                            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary rounded-full blur-[80px] opacity-30 pointer-events-none"></div>
                        </div>

                        {/* Coût Estimé - Light Card */}
                        <div className="stat-card-light">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-slate-500 font-medium text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">trending_up</span>
                                    Conso. ce mois
                                </h3>
                            </div>
                            <div className="text-3xl font-display font-bold text-slate-900 mb-1">
                                12,400 <span className="text-lg text-slate-500 font-normal">FCFA</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-4">
                                Basé sur 124 vérifications KYC réussies.
                            </p>
                        </div>
                    </div>

                    {/* Historique Transactions */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900">Historique des Transactions</h3>
                            <button className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">Voir tout</button>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Montant</th>
                                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentTransactions.map((trx) => (
                                    <tr key={trx.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {format(new Date(trx.date), "dd MMM yyyy")}
                                            <div className="text-[11px] text-slate-400 mt-0.5">{format(new Date(trx.date), "HH:mm")}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900 text-sm">{trx.desc}</div>
                                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">{trx.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm font-bold ${trx.amount.startsWith("+") ? "text-emerald-600" : "text-slate-900"}`}>
                                                {trx.amount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`status-pill status-${trx.status}`}>
                                                {trx.status === "verified" ? "Succès" : "Échoué"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column: Checkout Form */}
                <div className="lg:col-span-1">
                    <CheckoutForm />
                </div>
            </div>
        </div>
    )
}
