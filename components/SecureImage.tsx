"use client";

import { useState, useEffect } from "react";


interface SecureImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackIcon?: React.ReactNode;
}

export function SecureImage({ src, alt, className, fallbackIcon }: SecureImageProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let objectUrl: string | null = null;
        let isMounted = true;

        const fetchImage = async () => {
            if (!src) return;
            try {
                const token = typeof window !== "undefined" ? localStorage.getItem("tchedes_auth_token") : "";
                const response = await fetch(src, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to load image");
                }

                const blob = await response.blob();
                if (isMounted) {
                    objectUrl = URL.createObjectURL(blob);
                    setImageSrc(objectUrl);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(true);
                    setLoading(false);
                }
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [src]);

    if (loading && !error) {
        return (
            <div className={`flex items-center justify-center ${className || ''} bg-slate-100 dark:bg-slate-900 animate-pulse`}>
                <span className="material-symbols-outlined text-slate-300">downloading</span>
            </div>
        );
    }

    if (error || !imageSrc) {
        return (
            <div className={`flex items-center justify-center ${className || ''} bg-slate-100 dark:bg-slate-900`}>
                {fallbackIcon || <span className="material-symbols-outlined text-slate-300">broken_image</span>}
            </div>
        );
    }

    return (
        <img src={imageSrc} alt={alt} className={`object-cover ${className || ''}`} />
    );
}
