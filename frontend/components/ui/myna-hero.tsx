"use client";

import * as React from "react";
import {
  Activity,
  ArrowRight,
  BarChart,
  Bird,
  Brain,
  ChevronDown,
  Menu,
  Plug,
  Sparkles,
  Zap,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, useAnimation, useInView } from "framer-motion";
import { Ripple } from "@/components/ui/ripple";
import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import {
  NAVIGATION_ITEMS,
  HOW_IT_WORKS_STEPS,
  HERO_PLACEHOLDERS,
  HERO_TOPIC_CHIPS,
} from "@/constants";



interface MynaHeroProps {
  onSearch: (topic: string) => void;
  loading: boolean;
}

export function MynaHero({ onSearch, loading }: MynaHeroProps) {
  const controls = useAnimation();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const titleWords = [
    "BRUSH",
    "UP",
    "WEB",
    "DEV",
    "CONCEPTS",
    "FAST",
  ];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  const handleChipClick = (topic: string) => {
    setInputValue(topic);
    onSearch(topic);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Ripple color="#FF6B2C" />
      <div className="container mx-auto px-4 relative z-10">
        <header>
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <Brain className="h-8 w-8" />
              <span className="text-xl font-bold">MogojAstro</span>
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="cursor-target text-sm font-medium text-foreground hover:text-[#FF6B2C] transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="default"
                className="rounded-none hidden md:inline-flex bg-[#FF6B2C] hover:bg-[#FF6B2C]/90 cursor-target"
                onClick={() => window.open('https://swapnendu.tech', '_blank')}
              >
                Made by SB <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="flex flex-col gap-6 mt-6">
                    {NAVIGATION_ITEMS.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="cursor-target text-sm font-medium text-foreground hover:text-[#FF6B2C] transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                    <Button
                      className="cursor-pointer rounded-none bg-[#FF6B2C] hover:bg-[#FF6B2C]/90"
                      onClick={() => window.open('https://swapnendubanerjee.tech', '_blank')}
                    >
                      Made by SB <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header >

        <main>
          <section className="container py-24">
            <div className="flex flex-col items-center text-center">
              <motion.h1
                initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight"
              >
                {titleWords.map((text, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.6
                    }}
                    className="inline-block mx-2 md:mx-4"
                  >
                    {text}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-12 w-full max-w-xl"
              >
                <PlaceholdersAndVanishInput
                  placeholders={[...HERO_PLACEHOLDERS]}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                />
                <p className="mt-4 text-sm text-foreground">
                  The fastest way to learn and retain web development concepts
                </p>
              </motion.div>

              {/* Topic Chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="mt-6 flex flex-wrap gap-2 justify-center"
              >
                {HERO_TOPIC_CHIPS.map((chip) => (
                  <motion.button
                    key={chip}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleChipClick(chip)}
                    className="relative cursor-target px-3 py-1.5 text-xs font-mono font-medium border border-[#FF6B2C]/25 text-muted-foreground hover:text-[#FF6B2C] hover:border-[#FF6B2C] hover:bg-[#FF6B2C]/5 transition-all duration-200 cursor-pointer group"
                  >
                    {chip}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_rgba(255,107,44,0.25)] pointer-events-none" />
                  </motion.button>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                onClick={() => ref.current?.scrollIntoView({ behavior: "smooth" })}
                className="cursor-pointer mt-12"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-muted-foreground/50 to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium">Scroll</span>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="container" ref={ref} id="how-it-works">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 3.0,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              className="text-center text-4xl font-bold mb-6"
            >
              How it works is very simple
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 0.6 }}
              className="grid md:grid-cols-3 max-w-6xl mx-auto"
            >
              {HOW_IT_WORKS_STEPS.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 3.2 + (index * 0.2),
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  className="flex flex-col items-center text-center p-8 bg-background border"
                >
                  <div className="mb-6 rounded-full bg-[#FF6B2C]/10 w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl font-mono font-bold text-[#FF6B2C]">{feature.step}</span>
                  </div>
                  <h3 className="mb-4 text-xl font-mono font-bold">
                    {feature.label}
                  </h3>
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </main>
      </div>
    </div >
  );
}