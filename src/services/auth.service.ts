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

export const logOut = async (userId: string) => {
  const response = axiosInstance.get(`/auth/logout/${userId}`);
  return response;
};
