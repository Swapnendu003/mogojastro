// Problem statements shown on the left side of the "Why This Exists" section
export const WHY_PROBLEMS = [
    { iconName: "Clock", text: "You spend 2 hours reading docs just to remember one concept." },
    { iconName: "Brain", text: "You forget what you learned last week under interview pressure." },
    { iconName: "RefreshCcw", text: "Revision loops are boring, slow, and don't stick." },
] as const;

// Cycling preview cards on the right side of the "Why This Exists" section
export const WHY_STACK_CARDS = [
    {
        title: "React Hooks",
        tag: "⚡ 60 secs",
        insight: "useState, useEffect, useRef — understand the mental model behind React's hook system, not just the syntax.",
        topics: ["Explanation", "5 Quiz Qs", "3 Flashcards"],
    },
    {
        title: "System Design",
        tag: "⚡ 60 secs",
        insight: "Scalability, load balancing, caching, and databases — broken into digestible concepts for interviews and real-world use.",
        topics: ["Explanation", "5 Quiz Qs", "3 Flashcards"],
    },
    {
        title: "TypeScript Generics",
        tag: "⚡ 60 secs",
        insight: "Write flexible, reusable, and type-safe code. Master <T> once and you'll understand 80% of advanced TS patterns.",
        topics: ["Explanation", "5 Quiz Qs", "3 Flashcards"],
    },
    {
        title: "REST vs GraphQL",
        tag: "⚡ 60 secs",
        insight: "When to pick REST and when GraphQL wins. Trade-offs, over-fetching, and real-world API design decisions made clear.",
        topics: ["Explanation", "5 Quiz Qs", "3 Flashcards"],
    },
] as const;

// Feature cards in the FeatureShowcaseGrid — icon names resolved in the component
export const FEATURE_CARDS = [
    {
        iconName: "Zap",
        title: "60-Second Revisions",
        description: "Get a complete learning module — explanation, quiz, and flashcards — generated in under a minute. No waiting, no fluff.",
        glow: "rgba(255, 200, 50, 0.25)",
        border: "hover:border-yellow-500/50",
        tag: "Speed",
    },
    {
        iconName: "Brain",
        title: "AI-Crafted Content",
        description: "Every explanation is uniquely generated for your topic by GPT. Not templated docs — actual, contextual understanding.",
        glow: "rgba(255, 107, 44, 0.25)",
        border: "hover:border-[#FF6B2C]/50",
        tag: "AI",
    },
    {
        iconName: "FlipHorizontal",
        title: "Test as You Learn",
        description: "Quizzes and flip-cards are generated alongside content. You don't just read — you verify what stuck, instantly.",
        glow: "rgba(100, 220, 100, 0.2)",
        border: "hover:border-green-500/50",
        tag: "Learning",
    },
    {
        iconName: "Layers",
        title: "Any Web Dev Topic",
        description: "From React hooks to system design, REST to OAuth — if it's web dev, MogojAstro covers it in 60 seconds flat.",
        glow: "rgba(100, 160, 255, 0.25)",
        border: "hover:border-blue-500/50",
        tag: "Coverage",
    },
] as const;
