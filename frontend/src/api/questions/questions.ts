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
    
    public async deleteQuestion(id: string): Promise<void> {
        const response = await QuestionAPI.api.delete(`/${id}`);
        return response.data;
    }

    public async updateQuestion<T>(question: T): Promise<T> {
        const id = (question as any).questionID;
        const response = await QuestionAPI.api.put(`/${id}`, question);
        return response.data as T;
    }
}