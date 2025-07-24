import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://20.40.42.92:8000/',
  // baseURL:'http://192.168.1.7:7000/',
  // baseURL:'http://192.168.1.2:7000/',
  // baseURL:'http://192.168.1.9:7000/',
});

export const WEBSOCKET_URL = 'ws://20.40.42.92:8000/ws';

axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  console.log('Request Headers:', config.headers);
  return config;
},(error) => {
    return Promise.reject(error)
});

export default axiosInstance;
