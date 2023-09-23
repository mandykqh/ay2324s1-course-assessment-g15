import axios, { AxiosInstance } from 'axios';
import { QuestionString } from '../Commons';

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

  // TEMP IMPLEMENTATION
  public async login(userName: string, password: string) {
    var data: UserData[];
    const response = await this.client.get('/');
    data = response.data;
    console.log(data);
    let result = data.filter((d) => d.username === userName);
    if (result.length === 0) {
      return false;
    }
    return true;
    // return (data.filter((d) => d.username === userName)[0].password === password)
  }
}

export default UserRequestHandler;