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
};
