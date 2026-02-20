"use client";
import { Footer } from '@/components/ui/modem-animated-footer';
import { Twitter, Linkedin, Github, Brain } from 'lucide-react';
import React from 'react';
import { MynaHero } from '@/components/ui/myna-hero';
import { DemoSection } from '@/components/learning-content/DemoSection';
import { LivePreviewStrip } from '@/components/sections/LivePreviewStrip';
import { learningService } from '@/services/api';
import { toast } from "sonner";
import TargetCursor from '@/components/TargetCursor';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { StackedSections } from '@/components/sections/StackedSections';

export default function Home() {
  const [learningData, setLearningData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const demoRef = React.useRef<HTMLDivElement>(null);

  useScrollAnimations();

  React.useEffect(() => {
    if (loading || learningData) {
      setTimeout(() => {
        demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [loading, learningData]);

  const handleSearch = async (topic: string) => {
    setLoading(true);
    setLearningData(null);
    try {
      const data = await learningService.generateContent(topic);
      setLearningData(data);
    } catch (error: any) {
      console.error("Error generating content:", error);
      toast.error(error.response?.data?.error || "Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn hoverDuration={0.2} />

      {/* HERO */}
      <MynaHero onSearch={handleSearch} loading={loading} />

      {/* LIVE PREVIEW STRIP */}
      <div className="gsap-strip">
        <LivePreviewStrip onTopicClick={handleSearch} />
      </div>
      <StackedSections />
      <div ref={demoRef} id="demo-section">
        <DemoSection data={learningData} loading={loading} onSearch={handleSearch} />
      </div>
      <Footer
        brandName="MogojAstro"
        brandDescription="The fastest way to brush up on web development concepts."
        backgroundColor="linear-gradient(to top, #ffffff, #FF6B2C)"
        className="mt-20"
        brandIcon={<Brain className="w-8 h-8 text-white" />}
        socialLinks={[
          { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com", label: "Twitter" },
          { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/swapnendu-banerjee-36ba06219/", label: "LinkedIn" },
          { icon: <Github className="w-5 h-5" />, href: "https://github.com/Swapnendu003", label: "GitHub" },
        ]}
        navLinks={[
          { label: "Home", href: "#" },
          { label: "How it Works", href: "#how-it-works" },
          { label: "Demo", href: "#demo-content" },
        ]}
        creatorName="Swapnendu Banerjee"
        creatorUrl="https://swapnendu.tech"
      />
    </main>
  );
}
