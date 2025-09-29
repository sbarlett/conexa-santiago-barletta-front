import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const isNotFoundError = (error: AxiosError) => {
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
    if (isNotFoundError(error)) {
      return Promise.reject(error);
    }

    if (isServerError(error)) {
      throw new Error("Internal Server Error");
    }
  }
);

export default axiosInstance;
