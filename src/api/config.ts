import axios from 'axios';

const DEV_URL = 'http://192.168.0.14:8081';
const PROD_URL = '';

export const userApiConfig = axios.create({
  baseURL: __DEV__ ? `${DEV_URL}` : `${PROD_URL}`,
});
