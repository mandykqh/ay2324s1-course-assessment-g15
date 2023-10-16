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
    const obj: {[key: string]: any} = {}; // define obj as a dictionary with string keys and any values
    obj["user_id"] = matchData.user_id;
    obj["other_user"] = matchData.other_user;
    obj["room_id"] = matchData.room_id;
    obj["question"] = matchData.question;
    localStorage.setItem("matchData", JSON.stringify(obj));
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

  static deleteMatchData() {
    localStorage.removeItem('matchData');
  }
}

export default LocalStorageHandler;