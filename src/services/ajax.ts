import axios from 'axios';
import { message } from 'antd';
import { getToken } from '../utils/user-token';

const instance = axios.create({
  timeout: 10 * 1000,
});

// request interceptors send token
instance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// response interceptors check response error and filter response data
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;
  //error happen
  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg);
  }
  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
