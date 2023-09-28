import axios, { AxiosInstance } from 'axios';
import { UserDataString } from '../Commons';
import { USERS_SERVICE_URL } from '../configs';

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
      baseURL: USERS_SERVICE_URL
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

  public async updatePassword(username: string, currentPassword: string, newPassword: string) {
    try {
      const response = await this.client.get(`/${username}`);
      console.log(username);
      if (response.data.password !== currentPassword) {
        throw Error('Incorrect current password');
      }
      this.client.patch(`/${username}`, {
        password: newPassword
      })
    } catch (e) {
      throw e;
    }
  }

  public async deleteUser(username: string) {
    try {
      await this.client.delete(`/${username}`);
    } catch (e) {
      throw e;
    }
  }
}

export default UserRequestHandler;