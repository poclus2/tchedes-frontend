"use client";

import { useState, useMemo } from "react";
import { useSessions } from "@/hooks/useSessions";
import { format, subDays, isAfter } from "date-fns";
import Link from "next/link";
import CreateVerificationDrawer from "@/components/ui/CreateVerificationDrawer";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function OverviewPage() {
    const { data: sessions, isLoading, refetch } = useSessions();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleSuccess = (url: string) => {
        refetch(); // refresh sessions list
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "created": return "status-pill status-created";
            case "processing": return "status-pill status-processing";
            case "review_required": return "status-pill status-review_required";
            case "verified": return "status-pill status-verified";
            case "rejected": return "status-pill status-rejected";
            default: return "status-pill bg-slate-100 text-slate-800";
        }
    };

    const chartData = useMemo(() => {
        if (!sessions || sessions.length === 0) return [];

        const thirtyDaysAgo = subDays(new Date(), 30);
        const recentSessions = sessions.filter((s: any) => isAfter(new Date(s.created_at), thirtyDaysAgo));

        // Group by day (e.g. "MMM dd")
        const grouped: Record<string, { name: string, verified: number, rejected: number }> = {};

        recentSessions.forEach((s: any) => {
            const dateStr = format(new Date(s.created_at), "MMM dd").toUpperCase();
            if (!grouped[dateStr]) {
                grouped[dateStr] = { name: dateStr, verified: 0, rejected: 0 };
            }
            if (s.status === "verified") grouped[dateStr].verified += 1;
            if (s.status === "rejected") grouped[dateStr].rejected += 1;
        });

        // Convert to array and sort by date conceptually (here they are just appended as they appear since they come sorted descending usually from API)
        // For line chart, we should reverse to chronological
        return Object.values(grouped).reverse();
    }, [sessions]);

    return (
        <div className="p-8 space-y-8">
            <CreateVerificationDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onSuccess={handleSuccess}
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
                    <p className="text-sm text-slate-500">Welcome back. Here's your KYC activity summary.</p>
                </div>
                <button onClick={() => setIsDrawerOpen(true)} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 active:scale-95 shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    <span>Create Verification</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 hover:border-slate-200 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 text-sm font-medium">Total KYC Sessions</span>
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-400 text-lg">assessment</span>
                        </div>
                    </div>
                    <div className="flex items-end gap-3">
                        <h3 className="text-3xl font-bold text-slate-900">{isLoading ? '--' : sessions?.length || 0}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 hover:border-slate-200 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 text-sm font-medium">Verified</span>
                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-lg">verified</span>
                        </div>
                    </div>
                    <div className="flex items-end gap-3">
                        <h3 className="text-3xl font-bold text-slate-900">
                            {isLoading ? '--' : sessions?.filter((s: any) => s.status === 'verified').length || 0}
                        </h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 hover:border-slate-200 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 text-sm font-medium">Review Required</span>
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-amber-500 text-lg">rate_review</span>
                        </div>
                    </div>
                    <div className="flex items-end gap-3">
                        <h3 className="text-3xl font-bold text-slate-900">
                            {isLoading ? '--' : sessions?.filter((s: any) => s.status === 'review_required').length || 0}
                        </h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 hover:border-slate-200 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 text-sm font-medium">Rejected</span>
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-red-500 text-lg">block</span>
                        </div>
                    </div>
                    <div className="flex items-end gap-3">
                        <h3 className="text-3xl font-bold text-slate-900">
                            {isLoading ? '--' : sessions?.filter((s: any) => s.status === 'rejected').length || 0}
                        </h3>
                    </div>
                </div>
            </div>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">KYC Activity</h2>
                        <p className="text-xs text-slate-500">Submissions over the last 30 days</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-primary"></span>
                            <span className="text-xs font-medium text-slate-600">Verified</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-red-400"></span>
                            <span className="text-xs font-medium text-slate-600">Rejected</span>
                        </div>
                        <select className="text-xs font-semibold bg-slate-50 border-none rounded-lg focus:ring-primary h-8 px-2">
                            <option>Last 30 days</option>
                            <option>Last 7 days</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 h-[300px] w-full">
                    {/* Falling back to Recharts as injecting raw SVG is completely static and React works better with recharts. But keeping original padding/border container. */}
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                            <Tooltip cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />
                            <Line type="monotone" dataKey="verified" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
                            <Line type="monotone" strokeDasharray="4 4" dataKey="rejected" stroke="#f87171" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#f87171', stroke: '#fff', strokeWidth: 2 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Recent Sessions</h2>
                    <Link href="/sessions" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Session ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reference ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Confidence</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Created Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading && (
                                <tr><td colSpan={6} className="px-6 py-4 text-center text-slate-500 text-sm">Loading recent sessions...</td></tr>
                            )}
                            {!isLoading && (!sessions || sessions.length === 0) && (
                                <tr><td colSpan={6} className="px-6 py-4 text-center text-slate-500 text-sm">No recent sessions found.</td></tr>
                            )}
                            {!isLoading && sessions?.slice(0, 5).map((session: any) => {
                                const prefixId = session.id.substring(0, 8);
                                const score = session.confidence_score;

                                return (
                                    <tr key={session.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-mono text-slate-600">sess_{prefixId}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-900 font-medium">{session.reference_id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={getStatusStyle(session.status)}>{session.status === 'review_required' ? 'Review Required' : session.status.charAt(0).toUpperCase() + session.status.slice(1)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-sm font-bold ${session.status === 'created' ? 'text-slate-400' : session.status === 'rejected' ? 'text-red-600' : session.status === 'review_required' ? 'text-amber-600' : 'text-slate-900'}`}>
                                                {score != null ? `${score}%` : '--'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {format(new Date(session.created_at || session.createdAt || new Date()), "MMM dd, HH:mm")}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/sessions/${session.id}`} className="p-1 hover:bg-white rounded-lg transition-colors group inline-flex">
                                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">visibility</span>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
