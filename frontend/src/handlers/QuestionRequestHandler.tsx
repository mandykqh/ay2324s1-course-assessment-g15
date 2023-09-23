import { QuestionString } from "../Commons";
import QuestionAPI from "../api/questions/questions";
class RequestHandler {
    private static api: QuestionAPI = new QuestionAPI();

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

    private static mapToResponseFormat(questionString: QuestionString): any {
        return {
          title: questionString.title,
          complexity: questionString.complexity,
          categories: questionString.categories,
          questionDescription: questionString.description,
          linkToQuestion: questionString.link
        };
      }
      

    static async loadQuestions(): Promise<QuestionString[]> {
        try {
            const response = await this.api.getQuestions();
            const questions = response as QuestionString[];
            return questions.map(this.mapToQuestionString);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async createQuestionAndGetID(question: QuestionString): Promise<number> {
        try {
            const response = await this.api.createQuestion(this.mapToResponseFormat(question));
            return response.questionID as number;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async deleteQuestion(id: string): Promise<void> {
        try {
            const response = await this.api.deleteQuestion(id);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default RequestHandler;