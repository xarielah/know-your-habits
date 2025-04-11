import axios, { AxiosRequestConfig } from "axios";

export const httpService = {
  get,
  post,
  put,
  delete: del,
};

async function get<T>(
  url: string,
  options?: AxiosRequestConfig<T> | undefined
) {
  return axios.get<T>(url, options);
}

async function post<T>(
  url: string,
  options?: AxiosRequestConfig<T> | undefined
) {
  return axios.post<T>(url, options);
}

async function put<T>(
  url: string,
  options?: AxiosRequestConfig<T> | undefined
) {
  return axios.put<T>(url, options);
}

async function del<T>(
  url: string,
  options?: AxiosRequestConfig<T> | undefined
) {
  return axios.delete<T>(url, options);
}
