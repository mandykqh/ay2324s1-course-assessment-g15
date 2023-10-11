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

  static storeMatchData(matchData: MatchDataString) {
    localStorage.setItem("matchData", JSON.stringify(matchData));
  }

  static getMatchData(): MatchDataString | null {
    if (localStorage.getItem("matchData") === null) {
      return null;
    }
    const data = localStorage.getItem("matchData")!;
    return JSON.parse(data);
  }
  
  static isMatched(): boolean {
    if (localStorage.getItem("matchData") === null) {
      return false; 
    }
    return true;
  }
}

export default LocalStorageHandler;