import axios from 'axios';
import { UserDataString } from '../Commons';
import { USERS_SERVICE_URL } from '../configs';

export interface UserData {
  id: string
  username: string;
  email: string;
  password: string;
}

class UserRequestHandler {
  static client = axios.create({
    baseURL: USERS_SERVICE_URL
  });;

  public static async updatePersonalInfo(data: UserDataString, currentName: string) {
    try {
      await this.client.patch(`/${currentName}`, {
        id: data.id,
        username: data.username,
        email: data.email
      });
    } catch (e) {
      throw e;
    }
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

  public static async createUser(username: string, email: string, password: string) {
    try {
      const body = {
        username: username,
        email: email,
        password: password,
        role: 'USER'
      };
      await this.client.post('/', body);
    } catch (e) {
      throw e;
    }
  }
}

export default UserRequestHandler;
