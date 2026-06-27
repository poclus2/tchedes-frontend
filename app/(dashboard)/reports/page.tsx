export default function ReportsPage() {
    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between space-y-2 mb-2">
                <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Reports & Analytics</h2>
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-sm h-9">
                    <span className="material-symbols-outlined text-sm">download</span> Generate New Report
                </button>
            </div>
            <p className="text-slate-500 mb-8">
                Request asynchronous reports for audits or deep-dive analysis. Reports will be processed in the background.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-slate-900">Approval Rate</h4>
                        <span className="material-symbols-outlined text-slate-400">bar_chart</span>
                    </div>
                    <div className="text-3xl font-bold text-emerald-500">87.5%</div>
                    <p className="text-xs font-medium text-slate-500 mt-2">+2.4% from last week</p>
                </div>
            </div>

            <h3 className="text-xl font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history</span> Recent Report Jobs
            </h3>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Report Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Format</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Range</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-500 text-lg">description</span>
                                Q3 KYC Audits (All Tiers)
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-medium">CSV</td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-medium text-xs flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px] text-slate-400">calendar_today</span> Jul 1 - Sep 30
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">Completed</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right">
                                <button className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">download</span> Download
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500 text-lg">description</span>
                                Weekly Fraud Analysis
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-medium">PDF</td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-medium text-xs flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px] text-slate-400">calendar_today</span> Last 7 Days
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider animate-pulse">Processing (65%)</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right">
                                <button className="text-slate-400 cursor-not-allowed font-medium inline-flex items-center gap-1" disabled>
                                    <span className="material-symbols-outlined text-sm">hourglass_empty</span> Processing
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
