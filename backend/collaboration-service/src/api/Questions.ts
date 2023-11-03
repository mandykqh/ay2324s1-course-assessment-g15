import axios from "axios";

const baseURL = (process.env.QUESTIONS_SERVICE_URL as string).toString();
const client = axios.create({ baseURL: baseURL });

export const getQuestions = async (categories: string[], complexity: string) => {
    try {
        const response = await client.get("/random", {
            params: {
                categories: categories,
                complexity: complexity
            }
        });
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getFilteredQuestion = async (categories: string[], complexity: string) => {
    try {
        const response = await client.get("/filtered", {
            params: {
                categories: categories,
                complexity: complexity
            }
        });
        console.log(`filtered q: ${response.data} | ${response.data.categories} | ${response.data.complexity}`);
        return response.data;
    } catch (e) {
        console.error('API/QUESTIONSAPI PROBLEM: ' + e.response.data);
        throw e;
    }
}