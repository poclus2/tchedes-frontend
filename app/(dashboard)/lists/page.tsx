import Link from 'next/link';

export default function ListsPage() {
    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between space-y-2 mb-2">
                <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Watchlists & Anti-Fraud</h2>
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-sm h-9">
                    <span className="material-symbols-outlined text-sm">add</span> Create List
                </button>
            </div>
            <p className="text-slate-500 mb-8">
                Manage your Blocklists and Allowlists. Entries like Biometric embeddings, IP addresses, and emails will be automatically intercepted during KYC.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100">
                        <span className="material-symbols-outlined text-2xl">shield_error</span>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-slate-900">124</h4>
                        <p className="text-sm font-medium text-slate-500">Total Blocked Attempts</p>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                        <span className="material-symbols-outlined text-2xl">person_cancel</span>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-slate-900">45</h4>
                        <p className="text-sm font-medium text-slate-500">Biometric Matches</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4 mb-6">
                <div className="flex-1 min-w-[240px] relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                    <input 
                        type="text" 
                        placeholder="Search in lists..." 
                        className="w-full pl-10 pr-4 py-2 text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none ring-1 ring-slate-200"
                    />
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Entries</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">Global Fraudsters (Faces)</td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 uppercase tracking-wider">BLOCKLIST</span></td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-medium">45 items</td>
                            <td className="px-6 py-4 text-sm text-right">
                                <Link href="/lists/global-fraudsters" className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">settings</span> Manage Entries
                                </Link>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">VIP Corporate Clients</td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">ALLOWLIST</span></td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-medium">12 items</td>
                            <td className="px-6 py-4 text-sm text-right">
                                <Link href="/lists/vip" className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">settings</span> Manage Entries
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
