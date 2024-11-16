import { axiosInstance } from "@/config/AxiosConfig";
import { USER } from "@/types/user";

export const signUp = async (data: USER) => {
  const response = axiosInstance.post(`/auth/register`, data);
  return response;
};

export const signIn = async (data: USER) => {
  const response = axiosInstance.post(`/auth/login`, data);
  return response;
};

export const refreshToken = async (data: { refreshToken: string }) => {
  const response = axiosInstance.post(`/auth/refresh`, data);
  return response;
};
