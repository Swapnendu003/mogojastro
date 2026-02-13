const { OpenAI } = require("openai");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
    console.warn("WARNING: OPENAI_API_KEY is missing in .env file");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = openai;
