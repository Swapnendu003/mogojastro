"use client";
import React from "react";
import { motion } from "framer-motion";
import { Zap, FlipHorizontal, Brain, Layers } from "lucide-react";
import { FEATURE_CARDS } from "@/constants";
import PixelCard from "@/components/PixelCard";
import { DotPattern } from "@/components/ui/dot-pattern";

const ICON_MAP = { Zap, FlipHorizontal, Brain, Layers } as const;
type IconName = keyof typeof ICON_MAP;

export const FeatureShowcaseGrid = () => {
    return (
        <section className="relative pt-4 pb-8 bg-background border-b border-border overflow-hidden">

            <DotPattern
                width={20}
                height={20}
                cr={1}
                className="text-[#FF6B2C]/20 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]"
            />
            <div className="container mx-auto px-4 max-w-6xl relative z-10 h-[50rem]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 gsap-heading"
                >
                    <span className="text-xs font-mono tracking-[0.3em] text-[#FF6B2C] uppercase">What Makes It Different</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 tracking-tight">Built for developers</h2>
                    <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm font-light">
                        Every detail is intentional. Speed, clarity, and beautiful interaction baked into one tool.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border border-border">
                    {FEATURE_CARDS.map((feature, i) => {
                        const Icon = ICON_MAP[feature.iconName as IconName];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.5 }}
                                className="gsap-feature-card border-r border-border last:border-r-0"
                            >
                                <PixelCard
                                    variant="orange"
                                    gap={8}
                                    speed={50}
                                    className="w-full h-full min-h-[300px] border-0 rounded-none"
                                >
                                    {/* Content sits above the pixel canvas */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none z-10">
                                        {/* Top: tag + icon */}
                                        <div>
                                            <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF6B2C] uppercase mb-4 block">
                                                {feature.tag}
                                            </span>
                                            <div className="mb-5 w-10 h-10 bg-[#FF6B2C]/10 border border-[#FF6B2C]/20 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-[#FF6B2C]" />
                                            </div>
                                            <h3 className="font-bold text-base mb-2 text-foreground">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                                        </div>

                                        {/* Bottom glow line on hover */}
                                        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#FF6B2C]/40 to-transparent" />
                                    </div>
                                </PixelCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
