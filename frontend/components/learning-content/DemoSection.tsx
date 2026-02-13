"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { learningService } from '@/services/api';
import { toast } from "sonner";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { CheckCircle2, XCircle, ChevronRight, RefreshCcw, ArrowRight, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface DemoSectionProps {
    data: any;
    loading: boolean;
    onSearch?: (topic: string) => void;
}

const COLORS = ['#22c55e', '#ef4444'];

const Flashcard = ({ card }: { card: any }) => {
    const [isFlipped, setIsFlipped] = React.useState(false);

    return (
        <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer h-32 w-full perspective-1000 relative group"
        >
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="w-full h-full relative preserve-3d shadow-sm border bg-card rounded-none"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden p-4 flex flex-col items-center justify-center text-center z-20">
                    <h3 className="text-[10px] font-bold mb-2 text-[#FF6B2C] uppercase tracking-wider">Concept</h3>
                    <p className="text-sm font-medium text-foreground">{card.front}</p>
                    <span className="absolute bottom-2 text-[8px] text-muted-foreground uppercase tracking-widest">Click to flip</span>
                </div>
                {/* Back */}
                <div
                    className="absolute inset-0 backface-hidden bg-foreground text-background p-4 flex flex-col items-center justify-center text-center z-10 rounded-none"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <h3 className="text-[10px] font-bold mb-2 text-[#FF6B2C] uppercase tracking-wider">Explanation</h3>
                    <p className="text-xs leading-relaxed line-clamp-4">{card.back}</p>
                </div>
            </motion.div>
        </div>
    );
};

const QuizStepper = ({ questions }: { questions: any[] }) => {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [answers, setAnswers] = React.useState<string[]>(Array(questions.length).fill(""));
    const [verifying, setVerifying] = React.useState(false);
    const [results, setResults] = React.useState<any>(null);

    const handleOptionSelect = (option: string) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = option;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            handleVerify();
        }
    };

    const handleVerify = async () => {
        setVerifying(true);
        try {
            const data = await learningService.verifyQuiz(questions, answers);
            setResults(data);
        } catch (error) {
            console.error("Quiz verification failed", error);
            toast.error("Failed to verify quiz answers.");
        } finally {
            setVerifying(false);
        }
    };

    if (results) {
        return (
            <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">Quiz Results</h3>
                    <div className="text-lg font-bold text-[#FF6B2C]">{results.score}</div>
                </div>

                <div className="h-40 w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={results.chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {results.chartData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip />
                            <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                    {results.feedback.map((item: any, i: number) => (
                        <div key={i} className={`p-3 border-l-2 rounded-none ${item.isCorrect ? 'border-green-500 bg-green-500/5' : 'border-red-500 bg-red-500/5'}`}>
                            <p className="font-medium text-xs mb-1">{item.question}</p>
                            <p className={`text-[10px] font-bold ${item.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                {item.isCorrect ? "Correct" : "Incorrect"}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-1 leading-snug">{item.explanation}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="h-full flex flex-col">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-muted-foreground font-mono">QUESTION {currentQuestion + 1}/{questions.length}</span>
                    <span className="text-xs text-[#FF6B2C] font-mono">PROGRESS</span>
                </div>
                <div className="flex gap-1 h-1">
                    {questions.map((_, idx) => (
                        <div
                            key={idx}
                            className={`flex-1 rounded-none transition-colors ${idx <= currentQuestion ? 'bg-[#FF6B2C]' : 'bg-muted'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-sm font-medium mb-6 leading-relaxed">{question.question}</h4>

                <div className="space-y-2">
                    {question.options.map((option: string) => (
                        <button
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                            className={`w-full text-left p-3 text-sm rounded-none border transition-all ${answers[currentQuestion] === option
                                ? 'border-[#FF6B2C] bg-[#FF6B2C]/5 ring-1 ring-[#FF6B2C]'
                                : 'border-border hover:border-[#FF6B2C]/50 hover:bg-muted/50'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="line-clamp-2">{option}</span>
                                {answers[currentQuestion] === option && (
                                    <CheckCircle2 className="w-4 h-4 text-[#FF6B2C] flex-shrink-0 ml-2" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion] || verifying}
                    className="rounded-none bg-[#FF6B2C] hover:bg-[#FF6B2C]/90 text-white w-full"
                    size="sm"
                >
                    {verifying ? (
                        <>Verifying <RefreshCcw className="w-3 h-3 ml-2 animate-spin" /></>
                    ) : currentQuestion === questions.length - 1 ? (
                        <>Finish Quiz <CheckCircle2 className="w-3 h-3 ml-2" /></>
                    ) : (
                        <>Next <ChevronRight className="w-3 h-3 ml-2" /></>
                    )}
                </Button>
            </div>
        </div>
    );
};


const DUMMY_DATA = {
    explanations: [
        { title: "Quantum Entanglement", content: "A phenomenon where particles become interlinked, such that the state of one instantly influences the other, regardless of distance." },
        { title: "Superposition", content: "The principle that a quantum system can exist in multiple states simultaneously until it is measured." },
        { title: "Wave-Particle Duality", content: "The concept that every particle or logical entity may be partly described in terms not only of particles, but also of waves." }
    ],
    quiz: [
        { question: "What is the speed of light?", options: ["299,792 km/s", "150,000 km/s", "Unknown", "Infinite"], answer: "299,792 km/s" },
        { question: "Who proposed general relativity?", options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Marie Curie"], answer: "Albert Einstein" },
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], answer: "Mitochondria" },
        { question: "Which planet is the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], answer: "Mars" },
        { question: "What is H2O?", options: ["Helium", "Hydrogen Peroxide", "Water", "Salt"], answer: "Water" }
    ],
    flashcards: [
        { front: "E = mc²", back: "Energy equals mass times the speed of light squared." },
        { front: "Schrödinger's Cat", back: "A thought experiment illustrating the paradox of superposition." },
        { front: "Heisenberg Principle", back: "It is impossible to know both the position and momentum of a particle with perfect precision." }
    ]
};

export const DemoSection = ({ data, loading, onSearch }: DemoSectionProps) => {

    // Determine if we are in the "locked" state
    const isLocked = !data && !loading;
    const displayData = isLocked || loading ? DUMMY_DATA : data;
    const placeholders = [
        "React Performance Optimization",
        "Next.js App Router",
        "TypeScript Generics",
        "REST vs GraphQL APIs",
        "System Design for Web Apps",
    ];


    const [inputValue, setInputValue] = React.useState("");

    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim() && onSearch) {
            onSearch(inputValue);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <section className="py-24 bg-background flex flex-col items-center relative">
            <div className="text-center mb-16 space-y-4 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold uppercase tracking-tight"
                >
                    Lightning Fast Web Dev Revisions
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto font-light"
                >
                    Revision made super easy and fast
                </motion.p>
                {/* Try It Live Text */}
                {!isLocked && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-sm font-mono text-[#FF6B2C] mt-4 tracking-widest uppercase">Live Generated Content</p>
                    </motion.div>
                )}
            </div>

            {/* Bento Grid Container */}
            <div id="demo-content" className="relative max-w-6xl w-full mx-auto shadow-[0_20px_50px_-12px_rgba(255,107,44,0.3)] bg-card border-2 border-[#FF6B2C]/20 rounded-none overflow-hidden">

                {/* Overlay for Loading State */}
                {loading && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/10 backdrop-blur-[2px]">
                        <div className="bg-background/80 p-8 rounded-none shadow-2xl border border-zinc-200 dark:border-zinc-800 text-center max-w-md w-full mx-4 backdrop-blur-md">
                            <div className="w-12 h-12 border-4 border-[#FF6B2C] border-t-transparent rounded-none animate-spin mx-auto"></div>
                            <p className="mt-6 text-sm font-medium text-muted-foreground animate-pulse font-mono tracking-widest uppercase">Generating Personalized Learning Path...</p>
                        </div>
                    </div>
                )}

                {/* Overlay for Locked State */}
                {isLocked && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/10 backdrop-blur-[2px]">
                        <div className="bg-background/80 p-8 rounded-none shadow-2xl border border-zinc-200 dark:border-zinc-800 text-center max-w-md w-full mx-4 backdrop-blur-md">
                            <h3 className="text-xl font-bold mb-2">Try it yourself</h3>
                            <p className="text-sm text-muted-foreground mb-6">Enter a topic to generate a personalized learning path instantly.</p>
                            <PlaceholdersAndVanishInput
                                placeholders={placeholders}
                                onChange={handleChange}
                                onSubmit={handleInputSubmit}
                            />
                        </div>
                    </div>
                )}

                <div className={`grid grid-cols-1 md:grid-cols-3 border border-zinc-200 dark:border-zinc-800 ${isLocked || loading ? 'blur-sm select-none pointer-events-none opacity-50' : ''}`}>

                    {/* Left: Explanations - Spans 2 cols */}
                    <div className="md:col-span-2 border-b border-zinc-200 dark:border-zinc-800 md:border-r p-8 h-[600px] overflow-hidden flex flex-col">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800/50">
                            <div className="p-2 bg-[#FF6B2C] text-white">
                                <Brain className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm tracking-[0.2em] uppercase text-muted-foreground">Explanation Cards</h3>
                        </div>

                        <div className="space-y-8 overflow-y-auto pr-4 custom-scrollbar flex-1">
                            {displayData.explanations.map((exp: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={isLocked ? {} : { opacity: 0, x: -10 }}
                                    whileInView={isLocked ? {} : { opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group"
                                >
                                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#FF6B2C] transition-colors flex items-center gap-2">
                                        <span className="text-[#FF6B2C]/50 text-sm font-mono">0{i + 1}.</span>
                                        {exp.title}
                                    </h4>
                                    <p className="text-base text-muted-foreground leading-relaxed pl-8 border-l-2 border-zinc-100 dark:border-zinc-800 group-hover:border-[#FF6B2C]/30 transition-colors">
                                        {exp.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Quiz - Spans 1 col */}
                    <div className="md:col-span-1 border-b border-zinc-200 dark:border-zinc-800 p-8 h-[600px] flex flex-col bg-zinc-50/50 dark:bg-zinc-900/20">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                            <div className="p-2 bg-[#FF6B2C] text-white">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm tracking-[0.2em] uppercase text-muted-foreground">Progress + Quiz</h3>
                        </div>
                        <QuizStepper questions={displayData.quiz} />
                    </div>

                    {/* Bottom: Flashcards - Spans full width, subdivided */}
                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3">
                        {displayData.flashcards.map((card: any, i: number) => (
                            <div key={i} className={`p-8 border-b md:border-b-0 border-zinc-200 dark:border-zinc-800 ${i !== 2 ? 'md:border-r' : ''} bg-card hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors`}>
                                <Flashcard card={card} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
