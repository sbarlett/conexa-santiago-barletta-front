import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const API_URL = "https://rickandmortyapi.com/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const isErrorNotFound = (error: AxiosError) => {
  return axios.isAxiosError(error) && error.response?.status === 404;
};

const isServerError = (error: AxiosError) => {
  return axios.isAxiosError(error) && error.response?.status === 500;
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    if (isServerError(error)) {
      window.location.href = "/error";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
