"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";

const Globe = dynamic(() => import("react-globe.gl"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-blue-500 animate-spin"></div>
        </div>
    ),
});

export function GlobeMap() {
    const [mounted, setMounted] = useState(false);
    const [countries, setCountries] = useState({ features: [] });
    const globeRef = useRef<any>(null);

    useEffect(() => {
        setMounted(true);
        // Fetch GeoJSON for the countries to create the dotted hexagons
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(setCountries);
    }, []);

    useEffect(() => {
        if (mounted && globeRef.current) {
            // Zoom in
            setTimeout(() => {
                globeRef.current.pointOfView({ altitude: 1.8 }, 2000);
            }, 500);

            // Auto-rotate
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.5;
            globeRef.current.controls().enableZoom = false;
        }
    }, [mounted]);

    if (!mounted) return null;

    // AML Zones
    const pointsData = [
        { lat: 37.7595, lng: -122.4367, size: 0.1, color: '#3b82f6', label: 'San Francisco' },
        { lat: 5.30966, lng: -4.01266, size: 0.3, color: '#ef4444', label: 'Abidjan (Alerte)' },
        { lat: 14.6928, lng: -17.4467, size: 0.1, color: '#f97316', label: 'Dakar' },
        { lat: 12.6392, lng: -8.00288, size: 0.25, color: '#ef4444', label: 'Bamako (Alerte)' },
        { lat: 48.8566, lng: 2.3522, size: 0.1, color: '#3b82f6', label: 'Paris' },
        { lat: 25.2048, lng: 55.2708, size: 0.2, color: '#f97316', label: 'Dubai' },
    ];

    // Transaction flows
    const arcsData = [
        { startLat: 5.30966, startLng: -4.01266, endLat: 48.8566, endLng: 2.3522, color: ['#ef4444', '#3b82f6'] },
        { startLat: 12.6392, startLng: -8.00288, endLat: 25.2048, endLng: 55.2708, color: ['#ef4444', '#f97316'] },
        { startLat: 14.6928, startLng: -17.4467, endLat: 37.7595, endLng: -122.4367, color: ['#f97316', '#3b82f6'] },
    ];

    // Pulsing rings for active investigations
    const ringsData = [
        { lat: 5.30966, lng: -4.01266, color: '#ef4444' },
        { lat: 12.6392, lng: -8.00288, color: '#ef4444' }
    ];

    return (
        <div className="w-full max-w-[450px] mx-auto aspect-square relative z-10 flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing">
            <Globe
                ref={globeRef}
                backgroundColor="rgba(0,0,0,0)"
                
                // Dark Grey Sphere base (no texture image, pure color via globeMaterial if needed or just use default dark blue)
                // We use a dark earth texture to provide a nice dark background for the dots
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                
                // Hexagon Dots (This creates the Cobe style!)
                hexPolygonsData={countries.features}
                hexPolygonResolution={3} // Resolution of the dots (3 is good for performance and looks)
                hexPolygonMargin={0.7} // High margin shrinks the hexes into dots!
                hexPolygonColor={() => '#ffffff'} // White dots
                
                // AML Arcs
                arcsData={arcsData}
                arcColor="color"
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashInitialGap={() => Math.random()}
                arcDashAnimateTime={1500}
                arcStroke={1.5}
                
                // AML Alert Points
                pointsData={pointsData}
                pointColor="color"
                pointAltitude="size"
                pointRadius={0.5}
                pointsMerge={true}
                
                // Rings Configuration
                ringsData={ringsData}
                ringColor={() => '#ef4444'}
                ringMaxRadius={5}
                ringPropagationSpeed={2}
                ringRepeatPeriod={1000}
                
                width={450}
                height={450}
            />
        </div>
    );
}
