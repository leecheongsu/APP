import axios from 'axios';

const DEV_URL = '';
const PROD_URL = '';

export const testApi = axios.create({
  baseURL: __DEV__ ? `${DEV_URL}` : `${PROD_URL}`,
});
