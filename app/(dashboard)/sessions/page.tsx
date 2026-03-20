"use client";

import { useState } from "react";
import { useSessions } from "@/hooks/useSessions";
import { format } from "date-fns";
import Link from "next/link";
import CreateVerificationDrawer from "@/components/ui/CreateVerificationDrawer";

export default function SessionsPage() {
  const { data: sessions, isLoading, error, refetch } = useSessions();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSuccess = (url: string) => {
    refetch();
  };

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          Failed to load sessions. Please ensure the Core API is running.
        </div>
      </div>
    );
  }

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
      <CreateVerificationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={handleSuccess}
      />
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-1 min-w-[240px] relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
          <input className="w-full pl-10 pr-4 py-2 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200" placeholder="Search by Ref or Session ID..." type="text" />
        </div>
        <div className="w-44">
          <select className="w-full py-2 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200 px-3 h-9">
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
            <option>Under Review</option>
          </select>
        </div>
        <div className="w-56">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_month</span>
            <input className="w-full pl-10 pr-4 py-2 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary bg-slate-50 cursor-pointer outline-none ring-1 ring-slate-200 h-9" placeholder="Date range" type="text" value="Last 30 Days" readOnly />
          </div>
        </div>
        <button onClick={() => setIsDrawerOpen(true)} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-sm h-9">
          <span className="material-symbols-outlined text-sm">add</span>
          Create New Verification
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reference ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Document Type</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Confidence Score</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted At</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center h-24 text-slate-500">Loading sessions...</td>
              </tr>
            ) : !sessions || sessions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center h-24 text-slate-500">No sessions found.</td>
              </tr>
            ) : (
              sessions.map((session: any) => {
                const prefixId = session.id.substring(0, 8);
                const score = session.confidence_score;
                const docType = 'CM_CNI'; // Default for MVP

                return (
                  <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm font-bold text-slate-900">{session.reference_id}</div>
                      <div className="text-[10px] text-slate-400">sess_{prefixId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">{docType}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusStyle(session.status)}>
                        {session.status === 'review_required' ? 'Review Required' : session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className={`${getScoreColor(score)} h-full`} style={{ width: `${score || 0}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-slate-700">{score != null ? `${score}%` : '--'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {format(new Date(session.created_at || session.createdAt || new Date()), "MMM d, yyyy · HH:mm")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/sessions/${session.id}`} className="text-slate-400 hover:text-primary p-1 inline-flex">
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
      </div>
    </div>
  );
}
