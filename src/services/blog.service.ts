import { axiosInstance } from "@/config/AxiosConfig";
import { BLOG } from "@/types/blog";
import { USER } from "@/types/user";

export const getBlogByUser = async () => {
  const response = axiosInstance.get(`/blog/getBlogByUser`);
  return response;
};

export const createBlog = async (data: BLOG) => {
  const response = axiosInstance.post(`/blog/create`, data);
  return response;
};
