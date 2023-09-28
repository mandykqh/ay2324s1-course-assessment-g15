import { QuestionString } from "../Commons";
import QuestionAPI from "../api/questions/questions";
class RequestHandler {
    private static api: QuestionAPI = new QuestionAPI();

    // Hacky way to map the response from the API to the QuestionString interface
    static async loadQuestions(): Promise<QuestionString[]> {
        try {
            const response = await this.api.getQuestions();
            const questions = response as QuestionString[];
            return questions;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async createQuestionAndGetID(question: QuestionString): Promise<number> {
        try {
            const response = await this.api.createQuestion(question);
            return parseInt(response.id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async deleteQuestion(id: string): Promise<void> {
        try {
            const response = await this.api.deleteQuestionFromID(id);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async updateQuestion(question: QuestionString): Promise<QuestionString> {
        try {
            const responseFormat = question;
            const response = await this.api.updateQuestionFromID(question.id, responseFormat);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default RequestHandler;