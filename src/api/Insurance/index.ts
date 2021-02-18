import AsyncStorage from '@react-native-community/async-storage';
import { commonApiConfig } from '@app/api/config';
import { getStoreData } from '@app/lib';
export const insuApis = {
  // const TOKEN = await AsyncStorage.getItem('access_token');
  async getAddress(params) {
    const res = await commonApiConfig({
      method: 'GET',
      url: '/house/juso',
      params,
    });
    return res;
  },

  async getDancheInfo(params) {
    const res = await commonApiConfig({
      method: 'POST',
      url: 'house/quotes/danche',
      params,
    });
    return res;
  },

  async getSedeCover(params) {
    const res = await commonApiConfig({
      method: 'GET',
      url: 'house/cover',
      params,
    });
    return res;
  },
  async getSedeDetail(params) {
    const res = await commonApiConfig({
      method: 'GET',
      url: 'house/detail',
      params,
    });
    return res;
  },

  async getSedeInfo(data) {
    const res = await commonApiConfig({
      method: 'POST',
      url: 'house/quotes/sedae',
      data,
    });
    return res;
  },

  async getWwAddress(params) {
    const res = await commonApiConfig({
      method: 'GET',
      url: 'ww/juso',
      params,
    });
    return res;
  },

  async getWwCover(params) {
    const res = await commonApiConfig({
      method: 'GET',
      url: 'ww/cover',
      params,
    });
    return res;
  },

  async postPay(data) {
    const user: any = await getStoreData('user');
    const res = await commonApiConfig({
      method: 'POST',
      url: 'house/orders/card',
      data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  },

  async getVbankParams() {
    const user: any = await getStoreData('user');
    const res = await commonApiConfig({
      method: 'GET',
      url: 'kginicis/vacct/param',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  },

  async postVbank(data) {
    const user: any = await getStoreData('user');
    const res = await commonApiConfig({
      method: 'POST',
      url: 'house/orders/vacct',
      data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res;
  },
};
