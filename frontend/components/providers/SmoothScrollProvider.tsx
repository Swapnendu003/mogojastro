"use client";
import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Sync Lenis with GSAP ticker so ScrollTrigger positions are accurate
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Let ScrollTrigger use the Lenis scroll position
        lenis.on("scroll", ScrollTrigger.update);

        return () => {
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
            lenis.destroy();
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef.current}>
            {children}
        </LenisContext.Provider>
    );
}
