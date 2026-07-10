import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios';
import { getToken } from './token.ts';
import { toast } from 'react-toastify';

const BACKEND_URL = 'https://16.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;

type ApiError = {
  message: string;
}

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers.set('x-token', token);
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
      const message = error.response?.data?.message ?? error.message;

      if (error.response?.status === 401) {
        return Promise.reject(error);
      }

      toast.error(message, {
        toastId: message,
      });

      return Promise.reject(error);
    }
  );

  return api;
};

export default createAPI;
