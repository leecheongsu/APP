import axios from 'axios';

const DEV_URL = 'http://192.168.0.14:8080';
const PROD_URL = '';

export const commonApiConfig = axios.create({
  baseURL: __DEV__ ? `${DEV_URL}` : `${PROD_URL}`,
  headers: {
    'X-insr-servicekey': 'sdfsafsaf9osldfsafdosdfsfasf',
  },
});

export const userApiConfig = axios.create({
  baseURL: __DEV__ ? `${DEV_URL}` : `${PROD_URL}`,
});
