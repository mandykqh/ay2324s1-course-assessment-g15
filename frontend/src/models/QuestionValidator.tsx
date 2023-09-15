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
}

export default QuestionValidator;