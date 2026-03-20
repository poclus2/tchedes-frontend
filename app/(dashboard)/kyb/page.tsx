"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import Link from 'next/link'

export default function KYBVerifications() {
    const [sessions, setSessions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true)
                setSessions([
                    { id: 'kyb_1234abc', reference_id: 'REF-8392-CM', company_name: 'Harestech LLC', country: 'CM', registration_number: 'RC/DLA/2021/B/123', status: 'verified', confidence_score: 98, createdAt: new Date().toISOString() },
                    { id: 'kyb_5678def', reference_id: 'REF-1192-CM', company_name: 'NeoBank S.A.', country: 'CM', registration_number: 'RC/YDE/2023/M/456', status: 'review_required', confidence_score: 82, createdAt: new Date(Date.now() - 86400000).toISOString() },
                    { id: 'kyb_9999xyz', reference_id: 'REF-7741-NG', company_name: 'Crypto Trading Inc', country: 'NG', registration_number: 'BN-1234567', status: 'rejected', confidence_score: 45, createdAt: new Date(Date.now() - 172800000).toISOString() },
                    { id: 'kyb_4444lmn', reference_id: 'REF-2290-CM', company_name: 'Logistics Pro', country: 'CM', registration_number: 'RC/DLA/2024/B/789', status: 'processing', confidence_score: null, createdAt: new Date().toISOString() }
                ])

            } catch (error) {
                console.error("Failed to fetch KYB sessions", error)
            } finally {
                setLoading(false)
            }
        }

        fetchSessions()
    }, [])

    const filteredSessions = sessions.filter(
        (session) =>
            session.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.registration_number?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "created": return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600";
            case "processing": return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 animate-pulse";
            case "review_required": return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800";
            case "verified": return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800";
            case "rejected": return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800";
            default: return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800";
        }
    };

    const getScoreColor = (score: number | null) => {
        if (score === null) return "bg-slate-400";
        if (score > 80) return "bg-emerald-500";
        if (score > 50) return "bg-amber-500";
        return "bg-red-500";
    };

    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">KYB Verifications</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage and review corporate identity verifications & UBOs.
                    </p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4 mb-6">
                <div className="flex-1 min-w-[240px] relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                    <input
                        className="w-full pl-10 pr-4 py-2 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200"
                        placeholder="Search company or RCCM..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="w-44">
                    <select className="w-full py-2 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 px-3 h-9">
                        <option>All Statuses</option>
                        <option>Verified</option>
                        <option>Processing</option>
                        <option>Rejected</option>
                        <option>Review Required</option>
                    </select>
                </div>
                <div className="w-56">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_month</span>
                        <input className="w-full pl-10 pr-4 py-2 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary bg-slate-50 cursor-pointer outline-none ring-1 ring-slate-200 h-9" placeholder="Date range" type="text" value="Last 30 Days" readOnly />
                    </div>
                </div>
                <Link href="/kyb/create">
                    <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-sm h-9">
                        <span className="material-symbols-outlined text-sm">business</span>
                        Create Business Verification
                    </button>
                </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reference ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company Info</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Confidence</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted At</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center h-24 text-slate-500">Loading Business Verifications...</td>
                            </tr>
                        ) : filteredSessions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center h-24 text-slate-500">No matching business verifications found.</td>
                            </tr>
                        ) : (
                            filteredSessions.map((session) => {
                                const prefixId = session.id.substring(0, 11);

                                return (
                                    <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-mono text-sm font-bold text-slate-900">{session.reference_id}</div>
                                            <div className="text-[10px] text-slate-400">{prefixId}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900 text-sm">{session.company_name}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">{session.country}</span>
                                                <span className="text-xs text-slate-500 font-mono">{session.registration_number}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={getStatusStyle(session.status)}>
                                                {session.status === 'review_required' ? 'Review Required' : session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                                    <div className={`${getScoreColor(session.confidence_score)} h-full`} style={{ width: \`\${session.confidence_score || 0}%\` }}></div>
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{session.confidence_score != null ? \`\${session.confidence_score}%\` : '--'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {format(new Date(session.createdAt), "MMM d, yyyy · HH:mm")}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={\`/kyb/\${session.id}\`} className="text-slate-400 hover:text-primary p-1 inline-flex">
                                                <span className="material-symbols-outlined text-lg">visibility</span>
                                            </Link>
                                            <button className="text-slate-400 hover:text-slate-600 p-1">
                                                <span className="material-symbols-outlined text-lg">more_vert</span>
                                            </button>
                                        </td>
                </tr>
                );
                            })
                        )}
            </tbody>
        </table>
            </div >
        </div >
    )
}
