import Link from 'next/link';

export default function WorkflowsPage() {
    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between space-y-2 mb-2">
                <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Workflows</h2>
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-sm h-9">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Create Workflow
                </button>
            </div>
            <p className="text-slate-500 mb-8">
                Manage your verification workflows. Design custom steps and dynamic routing based on user risk.
            </p>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trigger Type</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">Standard KYC (Tier 1)</td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">Active</span></td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-medium">Hosted Link</td>
                            <td className="px-6 py-4 text-sm text-right">
                                <Link href="/workflows/std-1" className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">edit</span> Edit Graph
                                </Link>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">High Risk KYC (Tier 2)</td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wider">Inactive</span></td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-medium">API</td>
                            <td className="px-6 py-4 text-sm text-right flex items-center justify-end gap-4">
                                <Link href="/workflows/hr-2" className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">edit</span> Edit Graph
                                </Link>
                                <button className="text-slate-500 hover:text-slate-900 font-medium inline-flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">play_circle</span> Set Active
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
