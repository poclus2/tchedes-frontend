"use client"

import { useState } from "react"

type PaymentMethod = "mobile_money" | "card"

export default function CheckoutForm() {
    const [method, setMethod] = useState<PaymentMethod>("mobile_money")
    const [isLoading, setIsLoading] = useState(false)
    const [phone, setPhone] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulation d'appel API de paiement
        setTimeout(() => {
            setIsLoading(false)
            alert("Paiement initié avec succès !")
        }, 2000)
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-md w-full mx-auto">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-2">Recharger votre solde</h3>
            <p className="text-sm text-slate-500 mb-6">Sélectionnez une méthode de paiement pour ajouter des crédits à votre compte Tchedes.</p>

            <form onSubmit={handleSubmit}>
                {/* Method Selection (Clickable Cards) */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                        type="button"
                        onClick={() => setMethod("mobile_money")}
                        className={`p-4 rounded-xl border text-left transition-all ${
                            method === "mobile_money"
                                ? "border-primary bg-[rgba(99,91,255,0.03)] ring-1 ring-primary shadow-sm"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className={`material-symbols-outlined ${method === "mobile_money" ? "text-primary" : "text-slate-400"}`}>smartphone</span>
                            {method === "mobile_money" && <span className="material-symbols-outlined text-primary text-sm">check_circle</span>}
                        </div>
                        <h4 className={`font-semibold text-sm ${method === "mobile_money" ? "text-primary" : "text-slate-700"}`}>Mobile Money</h4>
                        <p className="text-[11px] text-slate-500 mt-1">MTN & Orange</p>
                    </button>

                    <button
                        type="button"
                        onClick={() => setMethod("card")}
                        className={`p-4 rounded-xl border text-left transition-all ${
                            method === "card"
                                ? "border-primary bg-[rgba(99,91,255,0.03)] ring-1 ring-primary shadow-sm"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className={`material-symbols-outlined ${method === "card" ? "text-primary" : "text-slate-400"}`}>credit_card</span>
                            {method === "card" && <span className="material-symbols-outlined text-primary text-sm">check_circle</span>}
                        </div>
                        <h4 className={`font-semibold text-sm ${method === "card" ? "text-primary" : "text-slate-700"}`}>Carte Bancaire</h4>
                        <p className="text-[11px] text-slate-500 mt-1">Visa & Mastercard</p>
                    </button>
                </div>

                {/* Amount Input */}
                <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Montant (FCFA)</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">payments</span>
                        <input
                            type="number"
                            required
                            min="500"
                            placeholder="Ex: 5000"
                            className="w-full pl-10 pr-4 py-2.5 text-sm font-semibold border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 transition-all"
                        />
                    </div>
                </div>

                {/* Dynamic Fields based on Method */}
                {method === "mobile_money" && (
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Numéro de téléphone</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">+237</span>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="6XXXXXXXX"
                                className="w-full pl-14 pr-4 py-2.5 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 transition-all"
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">lock</span>
                            Paiement sécurisé. Validez sur votre téléphone.
                        </p>
                    </div>
                )}

                {method === "card" && (
                    <div className="mb-6">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                            <span className="material-symbols-outlined text-slate-400 text-3xl mb-2">lock</span>
                            <p className="text-sm text-slate-600">Vous serez redirigé vers le portail sécurisé de notre partenaire pour renseigner votre carte.</p>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                            Traitement en cours...
                        </>
                    ) : (
                        <>
                            Payer maintenant
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}
