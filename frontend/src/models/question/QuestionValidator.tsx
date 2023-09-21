import { QuestionString } from "../Commons"

class QuestionValidator {
  // check for empty fields
  public validateEmptyFields(input: QuestionString) {
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
    return true;
  }

  // Temporary implementation for assignment 1 ------------------------------------------
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
  // -------------------------------------------------------------------------------------------
}

export default QuestionValidator;