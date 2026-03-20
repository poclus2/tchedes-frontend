import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar (Fixed width 64 = 256px) */}
            <Sidebar />

            {/* Main Content Wrapper */}
            <main className="flex-1 ml-64 min-h-screen flex flex-col">
                {/* Top Header */}
                <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
                        <div className="flex items-center gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Live</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                            <span className="text-xs font-semibold text-primary">API Connected</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-slate-500 text-xl">notifications</span>
                            </button>
                            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-slate-500 text-xl">help</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                {children}
            </main>
        </div>
    );
}
