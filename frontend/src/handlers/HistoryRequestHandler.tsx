import axios, { AxiosError, AxiosInstance } from 'axios';
import { HistoryDataString, UserDataString } from '../Commons';
import { HISTORY_SERVICE_URL } from '../configs';
import LocalStorageHandler from './LocalStorageHandler';

interface HistoryResponseString {
  userId: string;
  total: string;
  easy: string;
  medium: string,
  hard: string,
  attempts: [{
    questionId: string,
    timestamp: string
  }]
}

class HistoryRequestHandler {
  static client = axios.create({
    baseURL: HISTORY_SERVICE_URL
  });;

  public static async updateHistory(data: HistoryDataString) {
    try {
      await this.client.post(`/history`, { data });
    } catch (e) {
      throw e;
    }
  }

  public static async getHistory() {
    try {
      const response = await this.client.get(`/history/${LocalStorageHandler.getUserData()?.id}`);
      const history = response.data as HistoryResponseString;
      return history;
    } catch (e) {
      throw e;
    }
  }
}

export default HistoryRequestHandler;