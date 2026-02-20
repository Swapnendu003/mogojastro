// Navigation links used in the hero navbar and footer
export const NAVIGATION_ITEMS = [
    { title: "Home", href: "#" },
    { title: "How it Works", href: "#how-it-works" },
    { title: "Demo", href: "#demo-content" },
] as const;

// "How it works" steps shown in the hero section
export const HOW_IT_WORKS_STEPS = [
    { step: "1", label: "Ask", description: "Type any topic you want to learn." },
    { step: "2", label: "Learn", description: "AI explains with short lessons." },
    { step: "3", label: "Practice", description: "Test your knowledge instantly." },
] as const;

// Animated placeholder text cycling in the hero input
export const HERO_PLACEHOLDERS = [
    "React Performance Optimization",
    "Next.js App Router",
    "TypeScript Generics",
    "REST vs GraphQL APIs",
    "System Design for Web Apps",
] as const;

// Clickable topic chips below the hero input
export const HERO_TOPIC_CHIPS = [
    "React Hooks",
    "System Design",
    "Express.js",
    "Web Security",
    "TypeScript",
] as const;
