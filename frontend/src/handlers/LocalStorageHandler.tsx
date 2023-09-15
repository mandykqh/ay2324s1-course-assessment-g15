import { QuestionString } from "../models/Question";

class LocalStorageHandler {

  static saveQuestion(qnArr: QuestionString[]) {
    window.localStorage.setItem("Questions", JSON.stringify(qnArr));
  }

  static loadQuestion() {
    return JSON.parse(window.localStorage.getItem("Questions") || '{}');
  }

  //Temp method for getting QuestionID
  static getNextQuestionId() {
    if (localStorage.getItem("nextId") === null) {
      localStorage.setItem("nextId", '101')
      return '100';
    }
    const nextId = (localStorage.getItem("nextId")!); //USING NON NULL OPERATOR
    localStorage.setItem("nextId", (parseInt(nextId) + 1).toString());
    return nextId;
  }
}

export default LocalStorageHandler;