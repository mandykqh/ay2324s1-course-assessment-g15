import { QuestionString, UserDataString } from "../commons";

class LocalStorageHandler {

  static saveQuestion(qnArr: QuestionString[]) {
    window.localStorage.setItem("Questions", JSON.stringify(qnArr));
  }

  static loadQuestion() {
    return JSON.parse(window.localStorage.getItem("Questions") || '{}');
  }

  //Temp methods for QuestionID --------------------------------------------------
  static getNextQuestionId() {
    if (localStorage.getItem("nextId") === null) {
      localStorage.setItem("nextId", '100')
      return '100';
    }
    const nextId = (localStorage.getItem("nextId")!); //USING NON NULL OPERATOR
    return nextId;
  }


  static advanceQuestionId() {
    const nextId = (localStorage.getItem("nextId")!); //USING NON NULL OPERATOR
    localStorage.setItem("nextId", (parseInt(nextId) + 1).toString());
  }
  //--------------------------------------------------------------------------------------

  static storeUserData(userData: UserDataString) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  static getUserData(): UserDataString | null {
    if (localStorage.getItem("userData") === null) {
      return null;
    }
    const data = localStorage.getItem("userData")!;
    return JSON.parse(data);
  }

  static clear() {
    localStorage.removeItem('userData');
  }
}

export default LocalStorageHandler;