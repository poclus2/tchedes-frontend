"use client";

import React from 'react';

export function CitySkyline() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* ── CLOUDS LAYER ────────────────────────────────────── */}
            <div className="absolute top-0 left-0 w-full h-[50%] opacity-40">
                <Cloud top="10%" scale={1.5} duration="40s" delay="0s" />
                <Cloud top="25%" scale={0.8} duration="55s" delay="-20s" />
                <Cloud top="15%" scale={1.2} duration="45s" delay="-10s" />
                <Cloud top="35%" scale={1.8} duration="60s" delay="-35s" />
            </div>

            {/* ── BACKGROUND LAYER (Slow, Dimmer) ──────────────────── */}
            <div className="absolute bottom-0 left-0 w-[200%] h-[300px] flex animate-city-scroll opacity-30">
                <div className="w-1/2 h-full relative">
                    <CityBlocksGroup variant="bg" />
                </div>
                <div className="w-1/2 h-full relative">
                    <CityBlocksGroup variant="bg" />
                </div>
            </div>

            {/* ── FOREGROUND LAYER (Fast, Sharper) ─────────────────── */}
            <div className="absolute bottom-0 left-0 w-[200%] h-[200px] flex animate-city-scroll-fast opacity-60">
                <div className="w-1/2 h-full relative">
                    <CityBlocksGroup variant="fg" />
                </div>
                <div className="w-1/2 h-full relative">
                    <CityBlocksGroup variant="fg" />
                </div>
            </div>
            
            {/* ── GRADIENT BLEND ───────────────────────────────────── */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
    );
}

function Cloud({ top, scale, duration, delay }: { top: string, scale: number, duration: string, delay: string }) {
    return (
        <div 
            className="absolute rounded-full bg-indigo-100/10 blur-xl"
            style={{ 
                top, 
                width: `${150 * scale}px`, 
                height: `${40 * scale}px`,
                animation: `floatCloud ${duration} linear infinite ${delay}`,
                boxShadow: '0 0 40px 10px rgba(255,255,255,0.05)'
            }}
        ></div>
    );
}

function CityBlocksGroup({ variant }: { variant: 'bg' | 'fg' }) {
    // Generate a beautiful sequence of CSS-based modern buildings
    // Each building is an absolute div with glassmorphism gradients and borders
    const isBg = variant === 'bg';
    
    return (
        <>
            <Building left="0%" width="4%" height="60%" type={1} isBg={isBg} />
            <Building left="5%" width="6%" height="85%" type={4} isBg={isBg} />
            <Building left="12%" width="3%" height="45%" type={2} isBg={isBg} />
            <Building left="16%" width="5%" height="95%" type={3} isBg={isBg} />
            <Building left="23%" width="4%" height="55%" type={1} isBg={isBg} />
            <Building left="28%" width="7%" height="70%" type={2} isBg={isBg} />
            <Building left="36%" width="3%" height="40%" type={4} isBg={isBg} />
            <Building left="40%" width="5%" height="80%" type={1} isBg={isBg} />
            <Building left="47%" width="6%" height="65%" type={3} isBg={isBg} />
            <Building left="54%" width="4%" height="90%" type={4} isBg={isBg} />
            <Building left="60%" width="8%" height="50%" type={2} isBg={isBg} />
            <Building left="70%" width="3%" height="75%" type={1} isBg={isBg} />
            <Building left="74%" width="5%" height="35%" type={3} isBg={isBg} />
            <Building left="80%" width="6%" height="85%" type={4} isBg={isBg} />
            <Building left="88%" width="4%" height="60%" type={2} isBg={isBg} />
            <Building left="94%" width="5%" height="70%" type={1} isBg={isBg} />
        </>
    );
}

function Building({ left, width, height, type, isBg }: { left: string, width: string, height: string, type: number, isBg: boolean }) {
    // Premium glassmorphism / neon edge styles
    const baseColor = isBg ? 'from-slate-900 to-indigo-800/30' : 'from-slate-900 to-indigo-600/40';
    const borderColor = isBg ? 'border-indigo-400/10' : 'border-indigo-400/30';
    
    return (
        <div 
            className={`absolute bottom-0 rounded-t-[2px] border-t ${borderColor} bg-gradient-to-t ${baseColor} overflow-hidden`}
            style={{ left, width, height, borderLeftWidth: '1px', borderRightWidth: '1px', borderLeftColor: isBg ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.1)', borderRightColor: isBg ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.1)' }}
        >
            {/* Type 1: Vertical window slits */}
            {type === 1 && !isBg && (
                <div className="absolute inset-x-2 top-4 bottom-0 flex justify-between">
                    <div className="w-[1px] h-full bg-indigo-300/20 shadow-[0_0_5px_rgba(165,180,252,0.5)]"></div>
                    <div className="w-[1px] h-full bg-indigo-300/20 shadow-[0_0_5px_rgba(165,180,252,0.5)]"></div>
                </div>
            )}

            {/* Type 2: Horizontal office window blocks */}
            {type === 2 && !isBg && (
                <div className="absolute inset-0 flex flex-col justify-evenly py-6 items-center">
                    <div className="w-1/2 h-1 bg-indigo-200/20 rounded-full"></div>
                    <div className="w-1/2 h-1 bg-indigo-200/20 rounded-full"></div>
                    <div className="w-1/2 h-1 bg-indigo-200/10 rounded-full"></div>
                </div>
            )}

            {/* Type 3: Glowing top crown */}
            {type === 3 && (
                <div className={`absolute top-0 inset-x-0 h-4 ${isBg ? 'bg-indigo-500/10' : 'bg-indigo-400/30 blur-[2px]'}`}></div>
            )}

            {/* Type 4: Spire/Antenna */}
            {type === 4 && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-gradient-to-t from-indigo-300/50 to-transparent">
                    {/* Blinking red beacon on top of the antenna if it's foreground */}
                    {!isBg && (
                        <div className="absolute -top-1 -left-0.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                    )}
                </div>
            )}
        </div>
    );
}
