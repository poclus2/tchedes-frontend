"use client";

import React, { useState, useEffect } from 'react';

export default function CustomizationEditor() {
    const [settings, setSettings] = useState({
        primaryColor: '#0052FF',
        primaryHover: '#0042CC',
        backgroundColor: '#F9FAFB',
        surfaceColor: '#FFFFFF',
        textPrimary: '#111827',
        borderRadius: 8,
        fontFamily: 'Inter',
        appPublicName: 'Tchedes Verification',
        hideProgressBar: false,
    });

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // En vrai, un fetch d'API serait fait ici.
        // fetch('http://localhost:9001/v1/branding')
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setSettings(s => ({
            ...s,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        // await fetch('http://localhost:9001/v1/branding', { method: 'PUT', body: JSON.stringify({...}) });
        setTimeout(() => setIsSaving(false), 800);
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Editor Panel */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">palette</span> Appearance Settings
                </h3>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">App Public Name</label>
                        <input 
                            type="text" 
                            name="appPublicName"
                            value={settings.appPublicName}
                            onChange={handleChange}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none bg-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Primary Color</label>
                            <div className="flex gap-2">
                                <input 
                                    type="color" 
                                    name="primaryColor"
                                    value={settings.primaryColor}
                                    onChange={handleChange}
                                    className="h-9 w-12 rounded border border-slate-200 cursor-pointer p-1 bg-white"
                                />
                                <input type="text" value={settings.primaryColor} readOnly className="flex-1 border border-slate-200 rounded-lg px-2 text-xs text-slate-500 bg-slate-50" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Background Color</label>
                            <div className="flex gap-2">
                                <input 
                                    type="color" 
                                    name="backgroundColor"
                                    value={settings.backgroundColor}
                                    onChange={handleChange}
                                    className="h-9 w-12 rounded border border-slate-200 cursor-pointer p-1 bg-white"
                                />
                                <input type="text" value={settings.backgroundColor} readOnly className="flex-1 border border-slate-200 rounded-lg px-2 text-xs text-slate-500 bg-slate-50" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Surface Color</label>
                            <div className="flex gap-2">
                                <input 
                                    type="color" 
                                    name="surfaceColor"
                                    value={settings.surfaceColor}
                                    onChange={handleChange}
                                    className="h-9 w-12 rounded border border-slate-200 cursor-pointer p-1 bg-white"
                                />
                                <input type="text" value={settings.surfaceColor} readOnly className="flex-1 border border-slate-200 rounded-lg px-2 text-xs text-slate-500 bg-slate-50" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Text Color</label>
                            <div className="flex gap-2">
                                <input 
                                    type="color" 
                                    name="textPrimary"
                                    value={settings.textPrimary}
                                    onChange={handleChange}
                                    className="h-9 w-12 rounded border border-slate-200 cursor-pointer p-1 bg-white"
                                />
                                <input type="text" value={settings.textPrimary} readOnly className="flex-1 border border-slate-200 rounded-lg px-2 text-xs text-slate-500 bg-slate-50" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Border Radius ({settings.borderRadius}px)</label>
                        <input 
                            type="range" 
                            name="borderRadius"
                            min="0" max="24"
                            value={settings.borderRadius}
                            onChange={handleChange}
                            className="w-full cursor-pointer accent-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Font Family</label>
                        <select 
                            name="fontFamily"
                            value={settings.fontFamily}
                            onChange={handleChange}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        >
                            <option value="Inter">Inter (Default)</option>
                            <option value="Roboto">Roboto</option>
                            <option value="system-ui">System Default</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            id="hideProgressBar"
                            name="hideProgressBar"
                            checked={settings.hideProgressBar}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-slate-300 accent-primary"
                        />
                        <label htmlFor="hideProgressBar" className="text-sm font-bold text-slate-700">Hide progress bar in Hosted Flow</label>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-sm h-10 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <span className="material-symbols-outlined text-sm animate-spin">sync</span> Saving...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-sm">save</span> Save Settings
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Live Preview Panel */}
            <div className="border rounded-xl bg-gray-50 dark:bg-zinc-900 flex flex-col overflow-hidden relative shadow-inner min-h-[600px]">
                <div className="bg-gray-200 dark:bg-zinc-800 border-b border-border p-3 flex gap-2 items-center text-xs text-gray-500">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <span className="mx-auto bg-white dark:bg-zinc-700 px-4 py-1 rounded shadow-sm text-zinc-900 dark:text-zinc-300">
                        verify.tchedes.com
                    </span>
                </div>
                
                <div 
                    className="flex-1 flex items-center justify-center p-8 transition-colors duration-300"
                    style={{ backgroundColor: settings.backgroundColor, fontFamily: settings.fontFamily }}
                >
                    <div 
                        className="w-full max-w-sm shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300"
                        style={{ 
                            backgroundColor: settings.surfaceColor,
                            borderRadius: `${settings.borderRadius}px`,
                            color: settings.textPrimary
                        }}
                    >
                        <div className="w-16 h-16 rounded-full mb-4 flex items-center justify-center font-bold text-white shadow-sm" style={{ backgroundColor: settings.primaryColor }}>
                            Logo
                        </div>
                        <h2 className="text-xl font-bold mb-2">{settings.appPublicName || 'Tchedes Verification'}</h2>
                        <p className="text-sm mb-8 opacity-70">We need to verify your identity to continue.</p>

                        {!settings.hideProgressBar && (
                            <div className="w-full h-2 bg-black/10 rounded-full mb-8 overflow-hidden relative">
                                <div className="h-full w-1/3 absolute top-0 left-0" style={{ backgroundColor: settings.primaryColor }}></div>
                            </div>
                        )}

                        <button 
                            className="w-full py-3 font-semibold text-white transition-all duration-200 shadow-sm"
                            style={{ 
                                backgroundColor: settings.primaryColor,
                                borderRadius: `${settings.borderRadius}px`
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = settings.primaryHover)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = settings.primaryColor)}
                        >
                            Start Verification
                        </button>

                        <p className="text-xs mt-6 opacity-40">Powered by Tchedes</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
