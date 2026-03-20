"use client";

import { useState } from "react";

export default function DeveloperPage() {
    const [showSecret, setShowSecret] = useState(false);
    const [copied, setCopied] = useState("");

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(""), 2000);
    };

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
            <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
                <h1 className="text-lg font-semibold dark:text-white">Developer Settings</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300 tracking-wide">API LIVE</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined text-slate-500">account_circle</span>
                    </div>
                </div>
            </header>

            <div className="p-8 max-w-7xl mx-auto space-y-8 w-full">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 flex items-start gap-4">
                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">warning</span>
                    <div>
                        <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300">Security Warning</h4>
                        <p className="text-sm text-amber-700 dark:text-amber-400">Never expose live API keys in client-side production environments. Use server-side proxying or edge functions for all production transactions.</p>
                    </div>
                </div>

                <section className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1">
                        <h2 className="text-lg font-bold dark:text-white mb-1">API Settings</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Configure your connection endpoints and manage authentication credentials.</p>
                    </div>
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-6 space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Environment</label>
                                    <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 w-fit">
                                        <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white">Live</button>
                                        <button className="px-4 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700">Sandbox</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">API Base URL</label>
                                    <div className="relative">
                                        <input className="w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono text-slate-600 dark:text-slate-400 focus:ring-emerald-500 focus:border-emerald-500" readOnly type="text" value="https://api.tchedes.com/v1" />
                                        <button className="absolute right-2 top-1.5 p-1 text-slate-400 hover:text-emerald-500 transition-colors">
                                            <span className="material-symbols-outlined text-base">content_copy</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Secret Key</label>
                                <div className="flex gap-3">
                                    <div className="relative flex-grow">
                                        <input className="w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono text-slate-600 dark:text-slate-400" readOnly type={showSecret ? "text" : "password"} value="sk_test_harestech_mvp_123" />
                                        <button onClick={() => setShowSecret(!showSecret)} className="absolute right-2 top-1.5 p-1 text-slate-400 hover:text-emerald-500 transition-colors">
                                            <span className="material-symbols-outlined text-base">{showSecret ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">autorenew</span>
                                        Rotate Secret
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold dark:text-white">Webhook Activity</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Monitor event delivery to your application endpoint.</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-all shadow-sm">
                            <span className="material-symbols-outlined text-lg">add</span>
                            Add Endpoint
                        </button>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Event ID</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Event Type</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Session ID</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Timestamp</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400">evt_8k2n9m1</td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">kyc.verified</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400">sess_902k1l</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Success</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">2023-11-24 14:22:10</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">View Payload</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400">evt_2x8l4p0</td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded">kyb.updated</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400">sess_118k3q</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                                                <span className="text-sm text-rose-600 dark:text-rose-400 font-medium">Failed</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">2023-11-24 14:18:05</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">View Payload</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
