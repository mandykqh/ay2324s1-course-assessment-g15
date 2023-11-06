import { MatchDataString, QuestionString, UserDataString } from "../Commons";

class LocalStorageHandler {

  /*--- User Data ---*/
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

  static clearUserData() {
    localStorage.removeItem('userData');
  }

  /*--- Match Data ---*/

  static storeMatchData(matchData: any) {
    const obj: { [key: string]: any } = {}; // define obj as a dictionary with string keys and any values
    obj["user_id"] = matchData.user_id;
    obj["other_user"] = matchData.other_user;
    obj["room_id"] = matchData.room_id;
    obj["question"] = matchData.question;
    localStorage.setItem("matchData", JSON.stringify(obj));
  }

  static getMatchData(): MatchDataString | null {
    try {
      if (localStorage.getItem("matchData") === null) {
        return null;
      }
      const data = localStorage.getItem("matchData")!;
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }

  static isMatched(): boolean {
    try {
      if (localStorage.getItem("matchData") === null) {
        return false;
      }
      return true;
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

  // Filter data
  static storeFilterData(categoryFilter: any, complexityFilter: any, filteredQuestions: any) {
    const filterData = {
      categoryFilter,
      complexityFilter,
      filteredQuestions,
    };
    console.log('filter data qns: ' + filterData.categoryFilter);
    localStorage.setItem('filterData', JSON.stringify(filterData));
    console.log('stored filter data');
  }

  static getFilterData() {
    const data = localStorage.getItem('filterData');
    return data ? JSON.parse(data) : null;
  }

  static clearFilterData() {
    localStorage.removeItem('filterData');
  }
}

export default LocalStorageHandler;