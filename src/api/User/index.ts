import AsyncStorage from '@react-native-community/async-storage';
import { userApiConfig } from '@app/api/config';
export const userApis = async () => {
  const TOKEN = await AsyncStorage.getItem('access_token');

  const postLogin = async (data) => {
    try {
      const res = await userApiConfig({
        method: 'POST',
        url: '/api/users/auth',
        data,
      });
      return res;
    } catch (e) {
      console.log(e, 'post Login Error');
    }
    return;
  };
  return { postLogin };
};
