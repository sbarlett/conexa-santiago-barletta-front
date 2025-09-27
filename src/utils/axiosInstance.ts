import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const API_URL = "https://rickandmortyapi.com/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const ERROR_CODES_TO_SEARCH = [404];

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    const status = error.response?.status as number;
    if (!ERROR_CODES_TO_SEARCH.includes(status)) {
      window.location.href = "/error";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
