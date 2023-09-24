import axios, { AxiosInstance } from 'axios';
import { QuestionString, UserDataString } from '../Commons';

const BASE_URL = "http://localhost:5000/users";

interface UserData {
  id: string
  username: string;
  email: string;
  password: string;
}

class UserRequestHandler {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL
    });
  }

  // TEMP IMPLEMENTATION - TO CHANGE AFTER API CHANGE---------------------------
  public async login(userName: string, password: string) {
    var data: UserData[];
    try {
      const response = await this.client.get('/');
      data = response.data;
      let result = data.filter((d) => d.username === userName);
      if (result.length === 0 || result[0].password !== password) {
        throw Error('Invalid Credentials');
      }
      return result[0];
    } catch (e) {
      throw e;
    }
  }
  //----------------------------------------------------------------------------

  public async updatePersonalInfo(data: UserDataString) {
    this.client.patch(`/${data.id}`, {
      id: data.id,
      username: data.username,
      email: data.email
    })
  }
}

export default UserRequestHandler;