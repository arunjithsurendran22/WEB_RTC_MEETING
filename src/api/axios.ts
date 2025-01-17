import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { refreshToken } from "./RefreshTokens";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : "";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (!config._retry) {
      config._retry = false;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.data && response.data.statusCode) {
      if (
        response.data.statusCode === 401 &&
        !(response.config as CustomAxiosRequestConfig)._retry
      ) {
        (response.config as CustomAxiosRequestConfig)._retry = true;
        try {
          const newToken = await refreshToken();
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          return api(response.config);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.resolve(response);
  },
  async (error: AxiosError) => {
    console.error(
      "API response error:",
      error.response ? error.response.data : error.message
    );
    return Promise.reject(error);
  }
);

export default api;
