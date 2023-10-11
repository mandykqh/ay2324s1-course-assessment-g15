import { QuestionString, UserDataString } from "../Commons";

class LocalStorageHandler {

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
}

export default LocalStorageHandler;