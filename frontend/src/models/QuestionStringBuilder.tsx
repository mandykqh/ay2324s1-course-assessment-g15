import { QuestionString } from "./Question";
import QuestionValidator from "./QuestionValidator";

class QuestionStringBuilder {
  qnStr: QuestionString;

  constructor() {
    this.qnStr = {
      id: '',
      title: '',
      description: '',
      categories: '',
      complexity: '',
      link: ''
    }
  }

  public setId(value: string) {
    this.qnStr.id = value;
  }

  public setTitle(value: string) {
    this.qnStr.title = value;
  }

  public setDescription(value: string) {
    this.qnStr.description = value;
  }

  public setCategories(value: string) {
    this.qnStr.categories = value;
  }

  public setComplexity(value: string) {
    this.qnStr.complexity = value;
  }

  public setLink(value: string) {
    this.qnStr.link = value;
  }

  public build() {
    let validator = new QuestionValidator();
    try {
      validator.validateEmptyFields(this.qnStr);
    } catch (e) {
      throw (e);
    }
    return this.qnStr;
  }

}

export default QuestionStringBuilder;
