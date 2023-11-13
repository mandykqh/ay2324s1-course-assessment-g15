import axios from 'axios';
import { HistoryDataString, HistoryResponseString } from '../Commons';
import { HISTORY_SERVICE_URL } from '../configs';
import LocalStorageHandler from './LocalStorageHandler';

class HistoryRequestHandler {
  static client = axios.create({
    baseURL: HISTORY_SERVICE_URL
  });;

  public static async updateHistory(data: HistoryDataString): Promise<void> {
    try {
      await this.client.post(`/history`, { data });
    } catch (e) {
      throw e;
    }
  }

  public static async getHistory(): Promise<HistoryResponseString> {
    try {
      const apiUrl = `/history/${LocalStorageHandler.getUserData()?.id}`;
      const response = await this.client.get(apiUrl);
      const history = response.data as HistoryResponseString;
      return history;
    } catch (e) {
      throw e;
    }
  }
}

export default HistoryRequestHandler;
