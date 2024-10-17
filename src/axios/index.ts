import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export function createAxiosInstance(config: CreateAxiosDefaults): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
}
