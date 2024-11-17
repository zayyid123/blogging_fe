import { axiosInstance } from "@/config/AxiosConfig";
import { USER } from "@/types/user";

export const getBlogByUser = async () => {
  const response = axiosInstance.get(`/blog/getBlogByUser`);
  return response;
};
