import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mogojastro-ygie.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const learningService = {
    generateContent: async (topic: string) => {
        const response = await api.post('/generate', { topic });
        return response.data;
    },

    verifyQuiz: async (questions: any[], userAnswers: string[]) => {
        const response = await api.post('/verify', { questions, userAnswers });
        return response.data;
    },
};
