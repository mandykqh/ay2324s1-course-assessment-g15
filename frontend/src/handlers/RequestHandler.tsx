import { QuestionString } from "../Commons";
import QuestionsAPI from "../api/questions/questions";
class RequestHandler {
    private static api: QuestionsAPI = new QuestionsAPI();

    // Hacky way to map the response from the API to the QuestionString interface
    private static mapToQuestionString(response: any): QuestionString {
        return {
            id: response.questionID.toString(),
            title: response.title,
            complexity: response.complexity,
            categories: response.categories,
            description: response.questionDescription,
            link: response.linkToQuestion
          };
    }

    static async loadQuestions(): Promise<QuestionString[]> {
        const response = await this.api.getQuestions();
        const questions = response as QuestionString[];
        return questions.map(this.mapToQuestionString);
    }

    static async saveQuestion(question: QuestionString): Promise<void> {
        await this.api.addQuestion(question);
    }
}

export default RequestHandler;