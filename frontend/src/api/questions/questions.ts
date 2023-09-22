import { QuestionString } from "../../Commons";
import { questionClient } from "../client";

export default class QuestionsAPI {
    static api = questionClient;

    public async getQuestions(): Promise<QuestionString[]> {
        const response = await QuestionsAPI.api.get(`/`);
        return response.data;
    }

    public async addQuestion(question: QuestionString): Promise<QuestionString> {
        const response = await QuestionsAPI.api.post(`/`, question);
        return response.data;
    }
}