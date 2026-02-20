"use client";
import React from "react";
import { motion } from "framer-motion";
import { LIVE_PREVIEW_TOPICS } from "@/constants";

const TopicChip = ({ label, onClick }: { label: string; onClick?: () => void }) => (
    <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        className="cursor-target relative flex-shrink-0 px-4 py-2 text-sm font-medium text-foreground border border-[#FF6B2C]/30 bg-background hover:border-[#FF6B2C] hover:bg-[#FF6B2C]/5 hover:text-[#FF6B2C] transition-all duration-200 cursor-pointer group"
    >
        <span className="relative z-10 whitespace-nowrap font-mono">{label}</span>
        {/* Glow effect */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(255,107,44,0.3)] pointer-events-none" />
    </motion.button>
);

interface LivePreviewStripProps {
    onTopicClick?: (topic: string) => void;
}

export const LivePreviewStrip = ({ onTopicClick }: LivePreviewStripProps) => {
    return (
        <section className="py-12 bg-background border-y border-border overflow-hidden relative">
            {/* Label */}
            <div className="flex items-center justify-center mb-6 gap-3">
                <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#FF6B2C]">
                    ⚡ Live Topics
                </span>
                <span className="text-xs text-muted-foreground font-mono">— Click any to generate instantly</span>
            </div>

            {/* Fade gradients on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Scrolling Row 1 */}
            <div className="flex gap-3 mb-3 animate-[marquee_30s_linear_infinite]" style={{ width: "max-content" }}>
                {[...LIVE_PREVIEW_TOPICS, ...LIVE_PREVIEW_TOPICS].map((t, i) => (
                    <TopicChip key={i} label={t} onClick={() => onTopicClick?.(t)} />
                ))}
            </div>

            {/* Scrolling Row 2 — reversed */}
            <div className="flex gap-3 animate-[marquee_35s_linear_infinite_reverse]" style={{ width: "max-content" }}>
                {[...LIVE_PREVIEW_TOPICS.slice(10), ...LIVE_PREVIEW_TOPICS.slice(0, 10), ...LIVE_PREVIEW_TOPICS.slice(10), ...LIVE_PREVIEW_TOPICS.slice(0, 10)].map((t, i) => (
                    <TopicChip key={i} label={t} onClick={() => onTopicClick?.(t)} />
                ))}
            </div>
        </section>
    );
};
