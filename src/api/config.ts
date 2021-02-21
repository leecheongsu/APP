import axios from 'axios';

const DEV_URL = 'http://210.179.175.145:80';
// const DEV_URL = 'http://192.168.0.14:8080';
const PROD_URL = 'http://210.179.175.145:80';
const SERVICE_KEY = 'Q29weXJpZ2h0IOKTkiBpbnN1cm9iby5jby5rciBBbGwgcmlnaHRzIHJlc2VydmVkLg==';

export const commonApiConfig = axios.create({
  baseURL: __DEV__ ? `${DEV_URL}` : `${PROD_URL}`,
  headers: {
    'X-insr-servicekey': SERVICE_KEY,
  },
});

export const userApiConfig = axios.create({
  baseURL: __DEV__ ? `${DEV_URL}` : `${PROD_URL}`,
  headers: {
    'X-insr-servicekey': SERVICE_KEY,
  },
});
