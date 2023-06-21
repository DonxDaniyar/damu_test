import Axios from "axios";

interface IAxios {
  baseUrl: string;
  headers: boolean | string;
}

export const axiosConfig = {
  baseUrl: "http://localhost:9000/api/v1/",
  headers: false,
} as IAxios;

export const setToken = (token: string | boolean) => {
  axiosConfig.headers = token;
};

export const axios = Axios.create({
  //   withCredentials: true,

  baseURL: "http://localhost:9000/api/v1/",
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});

axios.interceptors.request.use((config) => {
  if (axiosConfig.headers) {
    config.headers.Authorization = `${axiosConfig.headers}`;
  }

  return config;
});
