import { QuestionString } from "./Question";

class QuestionValidator {
  public validateEmptyFields(input: QuestionString) {
    // check for empty fields
    if (!input.title) {
      throw new Error('Title cannot be empty')
    }
    if (!input.categories) {
      throw new Error('Categories cannot be empty')
    }
    if (!input.complexity) {
      throw new Error('Complexity cannot be empty')
    }
    if (!input.link) {
      throw new Error('Link cannot be empty')
    }
    return true;
  }

  // Dummy implementation for assignment 1
  public validateDuplicateQuestions(input: QuestionString, qnList: QuestionString[]) {
    qnList.forEach((qn) => {
      if (qn.id === input.id) {
        throw new Error('Duplicate question ID');
      }
      if (qn.title === input.title) {
        throw new Error('Duplicate question title');
      }
    })
  }
}

export default QuestionValidator;