import AsyncStorage from '@react-native-community/async-storage';
import { userApiConfig } from '@app/api/config';
export const userApis = {
  async postJoin(params) {
    const res = await userApiConfig({
      method: 'POST',
      url: 'users',
      params,
    });
    return res;
  },
  async postLogin(params) {
    const res = await userApiConfig({
      method: 'POST',
      url: 'users/auth',
      params,
    });
    return res;
  },
  async getFindEmail(params) {
    const res = await userApiConfig({
      method: 'GET',
      url: 'users/email',
      params,
    });
    return res;
  },
};
