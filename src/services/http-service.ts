import { createAxiosInstance } from '../axios';
import { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

export class HttpService {
  private readonly httpClient: AxiosInstance;

  constructor(config: CreateAxiosDefaults) {
    this.httpClient = createAxiosInstance(config);
  }

  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this.httpClient.get<T>(url, config);
  }

  public post<T>(url: string, config?: AxiosRequestConfig) {
    return this.httpClient.post<T>(url, config);
  }

  public put<T>(url: string, config?: AxiosRequestConfig) {
    return this.httpClient.put<T>(url, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.httpClient.delete<T>(url, config);
  }
}
