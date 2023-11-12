import { MatchDataString, QuestionString, UserDataString } from "../Commons";

const USER_DATA_KEY = "userData";
const MATCH_DATA_KEY = "matchData";
const FILTER_DATA_KEY = "filterData";

class LocalStorageHandler {

  // Commons
  private static getData<T>(key: string): T | null {
    try {
      const storedData = localStorage.getItem(USER_DATA_KEY);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      return null
    }
  }

  // User Data
  static storeUserData(userData: UserDataString) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }

  static getUserData(): UserDataString | null {
    return LocalStorageHandler.getData<UserDataString>(USER_DATA_KEY);
  }

  static clearUserData() {
    localStorage.removeItem(USER_DATA_KEY);
  }

  // Match Data
  static storeMatchData(matchData: any) {
    const { user_id, other_user, room_id, question } = matchData;
    const obj: { [key: string]: any } = {
      user_id,
      other_user,
      room_id,
      question
    }
    localStorage.setItem(MATCH_DATA_KEY, JSON.stringify(obj));
  }

  static getMatchData(): MatchDataString | null {
    return LocalStorageHandler.getData<MatchDataString>(MATCH_DATA_KEY);
  }

  static isMatched(): boolean {
    try {
      return localStorage.getItem(MATCH_DATA_KEY) !== null;
    } catch (e) {
      return false;
    }
  }

  static deleteMatchData() {
    localStorage.removeItem(MATCH_DATA_KEY);
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
    localStorage.setItem(FILTER_DATA_KEY, JSON.stringify(filterData));
  }
}

export default LocalStorageHandler;
