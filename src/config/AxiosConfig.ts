import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_ENDPOINT,
});

axiosInstance.interceptors.request.use((config) => {
  let getToken = Cookies.get("accessToken");

  config.headers = Object.assign(
    {
      Authorization: "Bearer " + getToken,
    },
    config.headers,
  );
  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.status === 403) {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login Expired Plesae Sign In again",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          Cookies.remove("accessToken");

          setTimeout(() => {
            window.location.reload();
          }, 2500);
        });
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_ENDPOINT}/auth/refresh`,
          { refreshToken },
        );

        Cookies.set("accessToken", response.data.accessToken);
        Cookies.remove("refreshToken");

        window.location.reload();
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login Expired Plesae Sign In again",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");

          setTimeout(() => {
            window.location.reload();
          }, 2500);
        });
      }
    }

    return Promise.reject(error);
  },
);
