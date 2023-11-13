import { QuestionString } from "../../Commons"

class QuestionValidator {
  public validateEmptyFields(input: QuestionString): void {
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
    if (!input.description) {
      throw new Error('Description cannot be empty')
    }
  }
}

export default QuestionValidator;