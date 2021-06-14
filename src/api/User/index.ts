import AsyncStorage from '@react-native-community/async-storage';
import {kakaoLoginConfig, userApiConfig} from '@app/api/config';
import { getStoreData } from '@app/lib';
export const userApis = {
  async postJoin(params) {
    const res = await userApiConfig({
      method: 'POST',
      url: 'users',
      params,
    });
    return res;
  },
  async postBusinessJoin(params) {
    const res = await userApiConfig({
      method: 'POST',
      url: 'users/business',
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
  async getUserConfirmChangePassword(email, params) {
    const res = await userApiConfig({
      method: 'GET',
      url: `users/${email}/can-change`,
      params,
    });
    return res;
  },
  async putChangeUserPassword(email, params) {
    const res = await userApiConfig({
      method: 'PUT',
      url: `users/${email}/pwd`,
      params,
    });
    return res;
  },
  async putChangeUserInfo(email, params) {
    const user: any = await getStoreData('user');
    const res = await userApiConfig({
      method: 'PUT',
      url: `users/${email}/basic`,
      params,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  },
  async putChangeBusinessInfo(email, params) {
    const user: any = await getStoreData('user');
    const res = await userApiConfig({
      method: 'PUT',
      url: `users/${email}/business`,
      params,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  },
  async putSecession(email) {
    const user: any = await getStoreData('user');
    const res = await userApiConfig({
      method: 'PUT',
      url: `users/${email}/quit`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  },
  async getRecommendUsers() {
    const user: any = await getStoreData('user');
    const res = await userApiConfig({
      method: 'GET',
      url: 'users/advisors',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  },

  async getOkcert(params) {
    const user: any = await getStoreData('user');
    const res = await userApiConfig({
      method: 'GET',
      url: 'okcert/house',
      params,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  },
  async getwwOkcert(params) {
    const user: any = await getStoreData('user');
    const res = await userApiConfig({
      method: 'GET',
      url: 'okcert/ww',
      params,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  },
  async getMyInsu() {
    const user: any = await getStoreData('user');
    const res = await userApiConfig({
      method: 'GET',
      url: `users/${user.email}/certificates`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  },
};
