"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WhyThisExists } from "@/components/sections/WhyThisExists";
import { FeatureShowcaseGrid } from "@/components/sections/FeatureShowcaseGrid";
import { TopicCloud } from "@/components/sections/TopicCloud";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
    { label: "Why This Exists", Component: WhyThisExists },
    { label: "Built for Developers", Component: FeatureShowcaseGrid },
    { label: "Explore Topics", Component: TopicCloud },
];

const PEEK_H = 48; 

export function StackedSections() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            const panelEls = gsap.utils.toArray<HTMLElement>(".stack-panel", container);

            panelEls.forEach((panel, i) => {
                ScrollTrigger.create({
                    trigger: panel,
                    start: `top ${i * PEEK_H}px`,
                    endTrigger: container,
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: false,
                    id: `stack-${i}`,
                    invalidateOnRefresh: true,
                });
            });
        }, container);

        return () => ctx.revert();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div ref={containerRef} className="relative">
            {PANELS.map(({ label, Component }, i) => (
                <div
                    key={i}
                    className="stack-panel relative w-full bg-background flex flex-col overflow-hidden"
                    style={{ zIndex: 10 + i, height: "100vh" }}
                >
                    <div
                        className="flex-shrink-0 w-full flex items-center gap-3 px-8 bg-background border-b border-[#FF6B2C]/20"
                        style={{ height: PEEK_H }}
                    >
                        <div className="flex gap-1">
                            {Array.from({ length: i + 1 }).map((_, d) => (
                                <span
                                    key={d}
                                    className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C]"
                                    style={{ opacity: 1 - d * 0.2 }}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#FF6B2C]">
                            {label}
                        </span>
                    </div>

                    {/* Section content fills remaining panel height */}
                    <div className="flex-1 overflow-y-auto">
                        <Component />
                    </div>
                </div>
            ))}
        </div>
    );
}
