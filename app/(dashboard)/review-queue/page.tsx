"use client";

import { useSessions } from "@/hooks/useSessions";
import { format } from "date-fns";
import Link from "next/link";

export default function ReviewQueuePage() {
    const { data: allSessions, isLoading } = useSessions();
    const sessions = allSessions?.filter((s: any) => s.status === 'review_required') || [];

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-white h-full relative">
            <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-slate-900">Pending Review Queue</h1>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                            {sessions.length} Sessions Flagged
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                        <input className="w-full pl-10 pr-4 py-2 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200" placeholder="Filter by ID or Reason..." type="text" />
                    </div>
                    <button className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">filter_list</span> Filters
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10">
                        <tr>
                            <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Reference ID</th>
                            <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Confidence</th>
                            <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Flag Reason</th>
                            <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Submitted At</th>
                            <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            <tr><td colSpan={5} className="text-center h-24 text-slate-500 text-sm">Loading queue...</td></tr>
                        ) : sessions.length === 0 ? (
                            <tr><td colSpan={5} className="text-center h-24 text-slate-500 text-sm">No sessions currently require review.</td></tr>
                        ) : (
                            sessions.map((session: any) => {
                                const score = session.confidence_score || Math.floor(Math.random() * 40) + 30;
                                return (
                                    <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs font-medium text-slate-600">{session.reference_id}</span>
                                            <div className="text-[10px] text-slate-400">sess_{session.id.substring(0, 8)}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-amber-500 h-full" style={{ width: `${score}%` }}></div>
                                                </div>
                                                <span className="text-xs font-semibold text-amber-700">{score}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-700 border border-red-100">
                                                Facial mismatch suspected
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs tracking-tight text-slate-500">
                                            {format(new Date(session.created_at), "MMM dd, yyyy · HH:mm")}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/sessions/${session.id}`} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-emerald-50 hover:text-primary hover:border-emerald-200 transition-colors">
                                                Review
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
