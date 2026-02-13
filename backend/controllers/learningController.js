const openai = require("../config/openai");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const PROMPTS_DIR = path.join(__dirname, "../prompts");


function getPrompt(filename) {
    try {
        return fs.readFileSync(path.join(PROMPTS_DIR, filename), "utf-8");
    } catch (error) {
        console.error(`Error reading prompt file ${filename}:`, error);
        throw new Error("Failed to load system prompts.");
    }
}

async function getWebContext(topic) {
    try {
        const apiKey = process.env.TAVILY_API_KEY;
        if (!apiKey) {
            console.warn("⚠️ TAVILY_API_KEY is missing. Using generic context.");
            console.log(`ℹ️ [FALLBACK] Fetching generic web context for: ${topic}`);
            return `Context regarding ${topic}: Detailed information about ${topic} including key concepts, usage, and examples.`;
        }

        console.log(`🔍 [TAVILY] Querying Tavily for: "${topic}"...`);
        const response = await axios.post("https://api.tavily.com/search", {
            api_key: apiKey,
            query: topic,
            search_depth: "basic",
            include_answer: true,
            max_results: 3,
        });

        console.log(`✅ [TAVILY] Successfully fetched ${response.data.results.length} results.`);
        const context = response.data.results.map(r => r.content).join("\n\n");
        return context;
    } catch (error) {
        console.error("Error fetching web context:", error.message);
        return null;
    }
}

const generateContent = async (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
    }

    try {
        // 1. Get Web Context (RAG)
        const context = await getWebContext(topic);

        // 2. Load Prompt
        const systemPrompt = getPrompt("learning_generator.txt");

        // 3. Call OpenAI with Context
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: `Topic: ${topic}\n\nWeb Context: ${context}`
                }
            ],
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(completion.choices[0].message.content);

        // Handle refusal if the model returned an error key as per prompt instructions
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.json(result);

    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate content" });
    }
};

const verifyQuiz = async (req, res) => {
    const { questions, userAnswers } = req.body;

    if (!questions || !userAnswers) {
        return res.status(400).json({ error: "Questions and user answers are required" });
    }

    try {
        // 1. Load Prompt
        const systemPrompt = getPrompt("quiz_grader.txt");

        // 2. Call OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: `Questions: ${JSON.stringify(questions)}\nUser Answers: ${JSON.stringify(userAnswers)}`
                }
            ],
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(completion.choices[0].message.content);
        res.json(result);

    } catch (error) {
        console.error("Error verifying quiz:", error);
        res.status(500).json({ error: "Failed to verify quiz" });
    }
};

module.exports = {
    generateContent,
    verifyQuiz,
};
