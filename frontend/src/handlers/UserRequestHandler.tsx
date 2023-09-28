import axios, { AxiosInstance } from 'axios';
import { UserDataString } from '../commons';
import { USERS_SERVICE_URL } from '../configs';

interface UserData {
  id: string
  username: string;
  email: string;
  password: string;
}

class UserRequestHandler {
  static client = axios.create({
    baseURL: USERS_SERVICE_URL
  });;


  public static async login(userName: string, password: string) {
    var data: UserData[];
    try {
      const response = await this.client.get('/');
      data = response.data;
      if (data.length === 0 || data[0].password !== password) {
        throw Error('Invalid Credentials');
      }
      return data[0];
    } catch (e) {
      throw e;
    }
  }

  public static async updatePersonalInfo(data: UserDataString, currentName: string) {
    this.client.patch(`/${currentName}`, {
      id: data.id,
      username: data.username,
      email: data.email
    })
  }

  public static async updatePassword(username: string, currentPassword: string, newPassword: string) {
    try {
      const response = await this.client.get(`/${username}`);
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

  public static async deleteUser(username: string) {
    try {
      await this.client.delete(`/${username}`);
    } catch (e) {
      throw e;
    }
  }
}

export default UserRequestHandler;