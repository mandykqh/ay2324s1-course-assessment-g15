import axios from "axios";
import { QuestionString } from "../Commons";
import { QUESTIONS_SERVICE_URL } from "../configs";

class QuestionRequestHandler {
    private static client = axios.create({
        baseURL: QUESTIONS_SERVICE_URL,
    });;

    static async loadQuestions(): Promise<QuestionString[]> {
        try {
            const response = await this.client.get(`/`);
            const questions = response.data as QuestionString[];
            return questions;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async createQuestionAndGetID(question: QuestionString): Promise<number> {
        try {
            const response = await this.client.post(`/`, question);
            return parseInt(response.data.id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async deleteQuestion(id: string): Promise<void> {
        try {
            const response = await this.client.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async updateQuestion(question: QuestionString): Promise<QuestionString> {
        try {
            const responseFormat = question;
            const response = await this.client.patch(`/${question.id}`, responseFormat);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default QuestionRequestHandler;