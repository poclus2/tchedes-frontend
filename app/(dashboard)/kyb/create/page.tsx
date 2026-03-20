"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

// Inline label to avoid missing @/components/ui/label dependency
const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <label className={\`text-xs font-bold text-slate-500 uppercase tracking-wider \${className}\`}>{children}</label>
)

const STEPS = [
    { id: 1, title: "Company Information", icon: "domain" },
    { id: 2, title: "Directors / UBO", icon: "group" },
    { id: 3, title: "Review & Submit", icon: "check_circle" },
]

const COMPANY_TYPES = ["SARL", "SA", "SAS", "SNC", "GIE", "LLC", "Other"]
const COUNTRIES = [{ code: "CM", name: "Cameroon" }, { code: "NG", name: "Nigeria" }, { code: "SN", name: "Senegal" }, { code: "CI", name: "Côte d'Ivoire" }, { code: "FR", name: "France" }]

type Director = { full_name: string; date_of_birth: string; nationality: string; ownership_percentage: string; id_file: File | null }

const emptyDirector = (): Director => ({ full_name: "", date_of_birth: "", nationality: "CM", ownership_percentage: "", id_file: null })

export default function KYBCreateWizard() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [submitting, setSubmitting] = useState(false)

    // Step 1 state
    const [company, setCompany] = useState({
        company_name: "", country: "CM", registration_number: "",
        company_type: "SARL", incorporation_date: "", registered_address: "", rccm_file: null as File | null
    })

    // Step 2 state
    const [directors, setDirectors] = useState<Director[]>([emptyDirector()])

    const addDirector = () => setDirectors([...directors, emptyDirector()])
    const removeDirector = (i: number) => setDirectors(directors.filter((_, idx) => idx !== i))
    const updateDirector = (i: number, field: keyof Director, value: any) => {
        const updated = [...directors]
        updated[i] = { ...updated[i], [field]: value }
        setDirectors(updated)
    }

    const totalOwnership = directors.reduce((sum, d) => sum + (parseFloat(d.ownership_percentage) || 0), 0)

    const handleSubmit = async () => {
        setSubmitting(true)
        await new Promise(r => setTimeout(r, 1500))
        setSubmitting(false)
        router.push("/kyb")
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-6">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Page Title */}
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">New Business Verification</h2>
                    <p className="text-sm text-slate-500 mt-1">Complete the 3 steps to create a KYB verification for a company.</p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-between w-full mb-8 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-100 z-0"></div>
                    {STEPS.map((s, idx) => {
                        const done = step > s.id;
                        const active = step === s.id;
                        
                        return (
                            <div key={s.id} className="relative z-10 flex flex-col items-center bg-transparent group">
                                <div className={\`flex items-center justify-center w-12 h-12 rounded-full border-4 shrink-0 transition-all duration-300
                                    \${done ? "bg-primary border-white text-white shadow-sm" : 
                                      active ? "border-white bg-emerald-50 text-primary shadow-sm" : 
                                      "border-white bg-slate-50 text-slate-400"}\`}>
                                    <span className={\`material-symbols-outlined \${active ? 'text-[24px]' : 'text-[20px]'}\`}>{s.icon}</span>
                                </div>
                                <div className="absolute -bottom-6 w-32 text-center pointer-events-none">
                                    <p className={\`text-xs font-bold \${active ? "text-primary" : done ? "text-slate-700" : "text-slate-400"}\`}>{s.title}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Container for content to give space for step labels */}
                <div className="pt-6">
                    {/* Step 1 — Company Information */}
                    {step === 1 && (
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-8 space-y-6">
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                                <span className="material-symbols-outlined text-primary">domain</span>
                                <h3 className="text-lg font-bold text-slate-800">Company Details</h3>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                                <div className="space-y-2">
                                    <Label>Company Name *</Label>
                                    <input 
                                        className="w-full h-11 px-4 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200" 
                                        placeholder="e.g. NeoBank S.A." 
                                        value={company.company_name} 
                                        onChange={e => setCompany({ ...company, company_name: e.target.value })} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Country *</Label>
                                    <select 
                                        className="w-full h-11 px-4 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 bg-white" 
                                        value={company.country} 
                                        onChange={e => setCompany({ ...company, country: e.target.value })}
                                    >
                                        {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Registration Number (RCCM) *</Label>
                                    <input 
                                        className="w-full h-11 px-4 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 font-mono" 
                                        placeholder="e.g. RC/DLA/2024/B/123" 
                                        value={company.registration_number} 
                                        onChange={e => setCompany({ ...company, registration_number: e.target.value })} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Company Type *</Label>
                                    <select 
                                        className="w-full h-11 px-4 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 bg-white" 
                                        value={company.company_type} 
                                        onChange={e => setCompany({ ...company, company_type: e.target.value })}
                                    >
                                        {COMPANY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Incorporation Date</Label>
                                    <input 
                                        type="date" 
                                        className="w-full h-11 px-4 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 bg-white" 
                                        value={company.incorporation_date} 
                                        onChange={e => setCompany({ ...company, incorporation_date: e.target.value })} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Registered Address</Label>
                                    <input 
                                        className="w-full h-11 px-4 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200" 
                                        placeholder="Full address" 
                                        value={company.registered_address} 
                                        onChange={e => setCompany({ ...company, registered_address: e.target.value })} 
                                    />
                                </div>
                            </div>
                            
                            {/* Document Upload */}
                            <div className="space-y-2 pt-2">
                                <Label>Certificate of Incorporation (RCCM) *</Label>
                                <div className={\`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer relative \${company.rccm_file ? 'border-primary bg-emerald-50/50' : 'border-slate-300 hover:border-primary hover:bg-slate-50'}\`}>
                                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" onChange={e => setCompany({ ...company, rccm_file: e.target.files?.[0] ?? null })} />
                                    {company.rccm_file ? (
                                        <div className="flex flex-col items-center">
                                            <span className="material-symbols-outlined text-primary text-4xl mb-2">task</span>
                                            <p className="text-sm font-bold text-slate-800">{company.rccm_file.name}</p>
                                            <p className="text-xs text-primary font-semibold mt-1">Ready to upload</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                                                <span className="material-symbols-outlined text-slate-400">upload_file</span>
                                            </div>
                                            <p className="text-slate-700 text-sm font-bold">Click to upload RCCM or Certificate</p>
                                            <p className="text-slate-400 text-xs mt-1">PDF, JPG, PNG — max 10MB</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex justify-end pt-6 border-t border-slate-100">
                                <button
                                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!company.company_name || !company.registration_number || !company.rccm_file}
                                    onClick={() => setStep(2)}
                                >
                                    Next: Add Directors <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2 — Directors / UBO */}
                    {step === 2 && (
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-8 space-y-6">
                            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">group</span>
                                    <h3 className="font-bold text-slate-900 text-lg">Directors / Ultimate Beneficial Owners</h3>
                                </div>
                                <span className={\`text-xs font-bold px-3 py-1.5 rounded-full \${totalOwnership > 100 ? "bg-rose-100 text-rose-700 border border-rose-200" : "bg-slate-100 text-slate-600 border border-slate-200"}\`}>
                                    Total Ownership: {totalOwnership}%
                                </span>
                            </div>

                            <div className="space-y-6">
                                {directors.map((dir, i) => (
                                    <div key={i} className="border border-slate-200 rounded-xl p-6 relative bg-slate-50/50">
                                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                                            <span className="text-sm font-bold text-slate-800 bg-white px-3 py-1 border border-slate-200 rounded-md">Director {i + 1}</span>
                                            {directors.length > 1 && (
                                                <button className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1" onClick={() => removeDirector(i)}>
                                                    <span className="material-symbols-outlined text-[16px]">delete</span> Remove
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                                            <div className="space-y-2">
                                                <Label>Full Name *</Label>
                                                <input className="w-full h-11 px-4 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 bg-white" placeholder="Jean Baptiste Mbeng" value={dir.full_name} onChange={e => updateDirector(i, "full_name", e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Date of Birth</Label>
                                                <input type="date" className="w-full h-11 px-4 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 bg-white" value={dir.date_of_birth} onChange={e => updateDirector(i, "date_of_birth", e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Nationality</Label>
                                                <select className="w-full h-11 px-4 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 bg-white" value={dir.nationality} onChange={e => updateDirector(i, "nationality", e.target.value)}>
                                                    {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Ownership % *</Label>
                                                <input type="number" min="1" max="100" className="w-full h-11 px-4 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 bg-white font-mono" placeholder="e.g. 60" value={dir.ownership_percentage} onChange={e => updateDirector(i, "ownership_percentage", e.target.value)} />
                                            </div>
                                            <div className="space-y-2 col-span-2 pt-2">
                                                <Label>Upload ID Document</Label>
                                                <div className={\`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer relative \${dir.id_file ? 'border-primary bg-emerald-50/30' : 'border-slate-300 hover:border-primary hover:bg-slate-50 bg-white'}\`}>
                                                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" onChange={e => updateDirector(i, "id_file", e.target.files?.[0] ?? null)} />
                                                    {dir.id_file ? (
                                                        <div className="flex items-center justify-center gap-2">
                                                            <span className="material-symbols-outlined text-primary text-xl">insert_drive_file</span>
                                                            <span className="text-sm font-bold text-slate-800">{dir.id_file.name}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-center gap-2 text-slate-500">
                                                            <span className="material-symbols-outlined text-xl">add_photo_alternate</span>
                                                            <span className="text-sm font-bold">Click to upload director's ID document (CNI, Passport...)</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 font-bold hover:border-primary hover:text-primary hover:bg-slate-50 transition-all flex items-center justify-center gap-2" onClick={addDirector}>
                                <span className="material-symbols-outlined">person_add</span> Add Another Director / UBO
                            </button>

                            <div className="flex justify-between pt-6 border-t border-slate-100">
                                <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-sm" onClick={() => setStep(1)}>
                                    <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back
                                </button>
                                <button
                                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={directors.some(d => !d.full_name || !d.ownership_percentage) || totalOwnership > 100}
                                    onClick={() => setStep(3)}
                                >
                                    Next: Review <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3 — Review & Submit */}
                    {step === 3 && (
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-8 space-y-8">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                                <span className="material-symbols-outlined text-primary">fact_check</span>
                                <h3 className="font-bold text-slate-900 text-lg">Final Review</h3>
                            </div>

                            {/* Company Summary */}
                            <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-slate-500 text-sm">domain</span>
                                    <p className="text-sm font-bold text-slate-800 uppercase tracking-wider">Company Overview</p>
                                </div>
                                <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                                    {[
                                        { label: "Company Name", value: company.company_name },
                                        { label: "Country", value: company.country },
                                        { label: "Registration Number", value: company.registration_number, isMono: true },
                                        { label: "Company Type", value: company.company_type },
                                        { label: "Incorporation Date", value: company.incorporation_date || "—" },
                                        { label: "Document", value: company.rccm_file?.name || "Missing Document", alert: !company.rccm_file },
                                    ].map(({ label, value, isMono, alert }) => (
                                        <div key={label}>
                                            <dt className="text-xs text-slate-500 mb-1">{label}</dt>
                                            <dd className={\`text-sm font-bold \${alert ? 'text-rose-500' : 'text-slate-800'} \${isMono ? 'font-mono' : ''}\`}>{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            {/* Directors Summary */}
                            <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-slate-500 text-sm">group</span>
                                    <p className="text-sm font-bold text-slate-800 uppercase tracking-wider">Directors ({directors.length})</p>
                                </div>
                                <div className="space-y-3">
                                    {directors.map((dir, i) => (
                                        <div key={i} className="flex items-center justify-between border-b border-slate-200 last:border-0 pb-3 last:pb-0">
                                            <div>
                                                <p className="font-bold text-sm text-slate-800">{dir.full_name}</p>
                                                <p className="text-xs text-slate-500 font-medium">{dir.nationality} · {dir.date_of_birth || "No date"}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-mono text-sm font-bold text-slate-700">{dir.ownership_percentage}%</p>
                                                <p className={\`text-xs font-semibold \${dir.id_file ? 'text-emerald-600' : 'text-slate-400'}\`}>
                                                    {dir.id_file ? "ID Attached" : "No ID"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                                <span className="material-symbols-outlined text-blue-600 shrink-0 mt-0.5">info</span>
                                <p className="text-sm text-blue-800">
                                    <strong>Ready to submit?</strong> Creating this verification will securely upload the documents and initiate the KYC background checks for all associated directors automatically.
                                </p>
                            </div>

                            <div className="flex justify-between pt-4 border-t border-slate-100">
                                <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-sm" onClick={() => setStep(2)}>
                                    <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back
                                </button>
                                <button
                                    className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Processing...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-[18px]">cloud_upload</span> Submit Verification
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
