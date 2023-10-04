import axios, { AxiosError } from 'axios';
import { AUTH_SERVICE_URL } from '../configs';
import { UserData } from './UserRequestHandler';

class AuthRequestHandler {
    static client = axios.create({
        baseURL: AUTH_SERVICE_URL
    });;


    public static async createSession(data: UserData) {
        try {
            const response = await this.client.post(`/create-session`);
            let res = response.data;
            console.log(res);
            return data;
        } catch (e) {
            if ((e as AxiosError).response?.status === 404) {
                throw Error('Session Creation Failed');
            }
            throw e;
        }
    }
}

export default AuthRequestHandler;