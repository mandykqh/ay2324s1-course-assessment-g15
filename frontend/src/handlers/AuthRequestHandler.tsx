import axios, { AxiosError } from 'axios';
import { AUTH_SERVICE_URL } from '../configs';

class AuthRequestHandler {
  static client = axios.create({
    baseURL: AUTH_SERVICE_URL
  });;

  public static async login(username: string, password: string) {
    try {
      const reqBody = { username: username, password: password }
      const response = await this.client.post(`/login`, reqBody, { withCredentials: true });
      return response.data;
    } catch (e) {
      if ((e as AxiosError).response?.status === 404) {
        throw Error('Invalid Credentials');
      }
      throw e;
    }
  }

  public static async signout(username: string) {
    try {
      const response = await this.client.get(`/signout/${username}`, { withCredentials: true });
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  public static async isAuth() {
    try {
      const response = await this.client.get(`/check`, { withCredentials: true });
      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

export default AuthRequestHandler;
