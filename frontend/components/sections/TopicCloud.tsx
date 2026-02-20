"use client";
import React from "react";
import { motion } from "framer-motion";
import { CLOUD_TOPICS } from "@/constants";
import { DotPattern } from "@/components/ui/dot-pattern";

// Deterministic float offsets using index
const getFloatClass = (i: number) => {
    const classes = [
        "animate-[float1_6s_ease-in-out_infinite]",
        "animate-[float2_7s_ease-in-out_infinite]",
        "animate-[float3_5.5s_ease-in-out_infinite]",
        "animate-[float1_8s_ease-in-out_infinite]",
        "animate-[float2_6.5s_ease-in-out_infinite]",
    ];
    return classes[i % classes.length];
};

export const TopicCloud = () => {
    return (
        <section className="relative py-24 bg-background border-b border-border ">
            <DotPattern
                width={28}
                height={28}
                cr={2}
                className="text-[#FF6B2C]/10 [mask-image:radial-gradient(ellipse_90%_60%_at_50%_0%,black_40%,transparent_100%)]"
            />
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono tracking-[0.3em] text-[#FF6B2C] uppercase">Explore Topics</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">What can you learn?</h2>
                    <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm font-light">
                        From fundamental concepts to advanced patterns — anything you need, in 60 seconds.
                    </p>
                </motion.div>

                <div className="flex flex-wrap gap-3 justify-center">
                    {CLOUD_TOPICS.map((topic, i) => (
                        <motion.span
                            key={topic}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04, duration: 0.4 }}
                            whileHover={{ scale: 1.12, color: "#FF6B2C", borderColor: "#FF6B2C" }}
                            className={`gsap-cloud-tag cursor-target inline-block px-4 py-2 text-sm font-mono font-medium border border-border text-muted-foreground hover:text-[#FF6B2C] hover:border-[#FF6B2C] hover:bg-[#FF6B2C]/5 transition-all duration-200 cursor-default select-none ${getFloatClass(i)}`}
                            style={{
                                animationDelay: `${(i * 0.37) % 3}s`,
                            }}
                        >
                            {topic}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
};
