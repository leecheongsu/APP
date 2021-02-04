import axios from 'axios';

const DEV_URL = 'http://210.179.175.145:8080';
const PROD_URL = 'http://210.179.175.145:8080';

export const commonApiConfig = axios.create({
  baseURL: __DEV__ ? `${DEV_URL}` : `${PROD_URL}`,
  headers: {
    'X-insr-servicekey': 'sdfsafsaf9osldfsafdosdfsfasf',
  },
});

export const userApiConfig = axios.create({
  baseURL: __DEV__ ? `${DEV_URL}` : `${PROD_URL}`,
  headers: {
    'X-insr-servicekey': 'sdfsafsaf9osldfsafdosdfsfasf',
  },
});
