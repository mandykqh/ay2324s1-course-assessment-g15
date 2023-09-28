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

  static async createQuestionAndGetID(question: QuestionString): Promise<string> {
    const response = await this.client.post(`/`, question).catch(e => {
      console.log(e);
      throw (e)
    });
    return response.data.id;
  }

  static async deleteQuestion(id: string): Promise<void> {
    const response = await this.client.delete(`/${id}`).catch(e => {
      console.log(e);
      throw e;
    });
    return response.data;
  }

  static async updateQuestion(question: QuestionString): Promise<QuestionString> {
    const response = await this.client.patch(`/${question.id}`, question).catch(e => {
      throw e;
    });
    return response.data;
  }
}

export default QuestionRequestHandler;