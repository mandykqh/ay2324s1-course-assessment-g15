import { MatchDataString, QuestionString, UserDataString } from "../Commons";

class LocalStorageHandler {

  /*--- User Data ---*/
  static storeUserData(userData: UserDataString) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  static getUserData(): UserDataString | null {
    const storedData = localStorage.getItem("userData");
    if (storedData === null) {
      return null
    }
    return JSON.parse(storedData);
  }

  static clearUserData() {
    localStorage.removeItem('userData');
  }

  /*--- Match Data ---*/
  static storeMatchData(matchData: any) {
    const { user_id, other_user, room_id, question } = matchData;
    const obj: { [key: string]: any } = {
      user_id,
      other_user,
      room_id,
      question
    }
    localStorage.setItem("matchData", JSON.stringify(obj));
  }

  static getMatchData(): MatchDataString | null {
    try {
      const storedData = localStorage.getItem("matchData");
      return storedData ? JSON.parse(storedData) : null;
    } catch (e) {
      return null;
    }
  }

  static isMatched(): boolean {
    try {
      return localStorage.getItem("matchData") !== null;
    } catch (e) {
      return false;
    }
  }

  static deleteMatchData() {
    localStorage.removeItem('matchData');
  }

  static updateMatchDataQuestion(newQuestion: QuestionString) {
    const matchData = this.getMatchData();

    if (matchData) {
      matchData.question = newQuestion;
      this.storeMatchData(matchData);
    }
  }

  // Chat data
  static storeChatData(key: string, chatData: any) {
    localStorage.setItem(key, JSON.stringify(chatData));
  }

  static getChatData(key: string) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  // Canvas data
  static storeCanvasData(key: string, canvasData: any) {
    localStorage.setItem(key, canvasData);
  }

  static getCanvasData(key: string) {
    return localStorage.getItem(key);
  }

  // Filter data
  static storeFilterData(categoryFilter: any, complexityFilter: any, filteredQuestions: any) {
    const filterData = {
      categoryFilter,
      complexityFilter,
      filteredQuestions,
    };
    localStorage.setItem('filterData', JSON.stringify(filterData));
  }
}

export default LocalStorageHandler;
