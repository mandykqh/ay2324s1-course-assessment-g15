import { QuestionString } from "../../Commons";
import { questionClient } from "../client";

export default class QuestionAPI {
    static api = questionClient;

    public async getQuestions(): Promise<QuestionString[]> {
        const response = await QuestionAPI.api.get(`/`);
        return response.data;
    }

    public async createQuestion<T>(question: T): Promise<T> {
        const response = await QuestionAPI.api.post(`/`, question);
        return response.data as T;
    }
    
    public async deleteQuestionFromID(id: string): Promise<void> {
        const response = await QuestionAPI.api.delete(`/${id}`);
        return response.data;
    }

    public async updateQuestionFromID<T>(id: string, question: T): Promise<T> {
        const response = await QuestionAPI.api.patch(`/${id}`, question);
        return response.data as T;
    }
}