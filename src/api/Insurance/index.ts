import AsyncStorage from '@react-native-community/async-storage';
import { commonApiConfig } from '@app/api/config';
export const insuApis = {
  // const TOKEN = await AsyncStorage.getItem('access_token');
  async getAddress(params) {
    const res = await commonApiConfig({
      method: 'GET',
      url: '/house/juso',
      params,
    });
    return res.data;
  },

  async getDancheInfo(params) {
    const res = await commonApiConfig({
      method: 'POST',
      url: 'house/quotes/danche',
      params,
    });
    return res.data;
  },

  async getSedeCover(params) {
    const res = await commonApiConfig({
      method: 'GET',
      url: 'house/cover',
      params,
    });
    return res.data;
  },
  async getSedeDetail(params) {
    const res = await commonApiConfig({
      method: 'GET',
      url: 'house/detail',
      params,
    });
    return res.data;
  },

  async getSedeInfo(data) {
    const res = await commonApiConfig({
      method: 'POST',
      url: 'house/quotes/sedae',
      data,
    });
    return res.data;
  },
};
