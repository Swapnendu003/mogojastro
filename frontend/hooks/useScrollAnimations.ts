"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollAnimations
 * Sets up GSAP ScrollTrigger animations for all key page sections.
 * Call this once from the root page component.
 */
export function useScrollAnimations() {
    useEffect(() => {
        const ctx = gsap.context(() => {

            // ─── 1. Section headings — slide up + fade with stagger ───────────────
            gsap.utils.toArray<HTMLElement>(".gsap-heading").forEach((el) => {
                gsap.fromTo(
                    el,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            end: "top 40%",
                            scrub: false,
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            // ─── 2. Feature grid cards — staggered reveal from bottom ────────────
            gsap.utils.toArray<HTMLElement>(".gsap-feature-card").forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { y: 80, opacity: 0, scale: 0.96 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            // ─── 3. Why This Exists — left column slides in from left ────────────
            gsap.utils.toArray<HTMLElement>(".gsap-slide-left").forEach((el) => {
                gsap.fromTo(
                    el,
                    { x: -60, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            // ─── 4. Why This Exists — right card stack slides in from right ───────
            gsap.utils.toArray<HTMLElement>(".gsap-slide-right").forEach((el) => {
                gsap.fromTo(
                    el,
                    { x: 60, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            // ─── 5. Topic cloud tags — stagger pop-in ─────────────────────────────
            gsap.utils.toArray<HTMLElement>(".gsap-cloud-tag").forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { scale: 0.7, opacity: 0, y: 20 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: i * 0.025,
                        ease: "back.out(1.4)",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 92%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            // ─── 6. Live Preview Strip — fade up ──────────────────────────────────
            gsap.utils.toArray<HTMLElement>(".gsap-strip").forEach((el) => {
                gsap.fromTo(
                    el,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            // ─── 7. Horizontal ruler lines — width reveal ─────────────────────────
            gsap.utils.toArray<HTMLElement>(".gsap-rule").forEach((el) => {
                gsap.fromTo(
                    el,
                    { scaleX: 0, transformOrigin: "left" },
                    {
                        scaleX: 1,
                        duration: 1.2,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

        });

        return () => ctx.revert();
    }, []);
}
