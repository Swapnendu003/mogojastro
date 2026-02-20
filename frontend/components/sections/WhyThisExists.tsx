"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Brain, Clock, RefreshCcw } from "lucide-react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { WHY_PROBLEMS, WHY_STACK_CARDS } from "@/constants";
import { DotPattern } from "@/components/ui/dot-pattern";

const ICON_MAP = { Clock, Brain, RefreshCcw } as const;
type IconName = keyof typeof ICON_MAP;

const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

export const WhyThisExists = () => {
    const [active, setActive] = useState(0);

    const handleNext = () => setActive((prev) => (prev + 1) % WHY_STACK_CARDS.length);
    const handlePrev = () => setActive((prev) => (prev - 1 + WHY_STACK_CARDS.length) % WHY_STACK_CARDS.length);

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(handleNext, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative pt-14 py-24 bg-background border-b border-border overflow-hidden">

            <DotPattern
                width={24}
                height={24}
                cr={2}
                className="text-[#FF6B2C]/15 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_30%,transparent_100%)]"
            />
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 gsap-heading"
                    style={{ marginTop: "-5rem" }}
                >
                    <span className="text-xs font-mono tracking-[0.3em] text-[#FF6B2C] uppercase">The Problem</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">Why this exists</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left: Problem / Solution text blocks */}
                    <div className="space-y-10 gsap-slide-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-[2px] bg-red-500" />
                                <span className="text-xs font-mono tracking-widest uppercase text-red-400">Problem</span>
                            </div>
                            <div className="space-y-4">
                                {WHY_PROBLEMS.map((p, i) => {
                                    const Icon = ICON_MAP[p.iconName as IconName];
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.15 + i * 0.1 }}
                                            className="flex items-start gap-3 p-4 border border-red-500/10 bg-red-500/5 group hover:border-red-500/30 transition-colors"
                                        >
                                            <Icon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-[2px] bg-[#FF6B2C]" />
                                <span className="text-xs font-mono tracking-widest uppercase text-[#FF6B2C]">Solution</span>
                            </div>
                            <div className="p-6 border border-[#FF6B2C]/20 bg-[#FF6B2C]/5">
                                <div className="flex items-center gap-3 mb-3">
                                    <Zap className="w-5 h-5 text-[#FF6B2C]" />
                                    <span className="font-bold text-lg">60-second AI learning loops.</span>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Type any concept. MogojAstro instantly generates explanations, flashcards, and a quiz — so you retain it <em>fast</em>. No fluff. No rabbit holes.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Animated stacked cards (AnimatedTestimonials-style) */}
                    <div className="gsap-slide-right flex flex-col items-center gap-6">
                        {/* Card Stack */}
                        <div className="relative h-80 w-full max-w-sm mx-auto">
                            <AnimatePresence>
                                {WHY_STACK_CARDS.map((card, index) => (
                                    <motion.div
                                        key={card.title}
                                        initial={{ opacity: 0, scale: 0.9, rotate: randomRotateY() }}
                                        animate={{
                                            opacity: index === active ? 1 : 0.6,
                                            scale: index === active ? 1 : 0.95,
                                            rotate: index === active ? 0 : randomRotateY(),
                                            zIndex: index === active ? 40 : WHY_STACK_CARDS.length + 2 - index,
                                            y: index === active ? [0, -10, 0] : 0,
                                        }}
                                        exit={{ opacity: 0, scale: 0.9, rotate: randomRotateY() }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="absolute inset-0 origin-bottom border border-[#FF6B2C]/20 bg-card p-7 flex flex-col justify-between shadow-[0_4px_24px_rgba(255,107,44,0.08)]"
                                    >
                                        {/* Top */}
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#FF6B2C] font-bold">
                                                    {card.tag}
                                                </span>
                                                <Brain className="w-4 h-4 text-[#FF6B2C]/40" />
                                            </div>
                                            <h3 className="text-2xl font-extrabold text-foreground tracking-tight mb-3">
                                                {card.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {card.insight}
                                            </p>
                                        </div>

                                        {/* Bottom: what you get */}
                                        <div className="flex gap-2 flex-wrap mt-4 pt-4 border-t border-border">
                                            {card.topics.map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-[10px] font-mono px-2 py-1 border border-[#FF6B2C]/20 text-[#FF6B2C]/80 bg-[#FF6B2C]/5 tracking-wider"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Arrows */}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handlePrev}
                                className="cursor-target group/button flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-[#FF6B2C]/10 border border-border hover:border-[#FF6B2C]/40 transition-all duration-200"
                            >
                                <IconArrowLeft className="h-4 w-4 text-foreground transition-transform duration-300 group-hover/button:rotate-12" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="cursor-target group/button flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-[#FF6B2C]/10 border border-border hover:border-[#FF6B2C]/40 transition-all duration-200"
                            >
                                <IconArrowRight className="h-4 w-4 text-foreground transition-transform duration-300 group-hover/button:-rotate-12" />
                            </button>
                        </div>

                        {/* Dots indicator */}
                        <div className="flex gap-2">
                            {WHY_STACK_CARDS.map((_: unknown, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className={`h-1 transition-all duration-300 rounded-none ${i === active ? "w-6 bg-[#FF6B2C]" : "w-2 bg-muted-foreground/30"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
