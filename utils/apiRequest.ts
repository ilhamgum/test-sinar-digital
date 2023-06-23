import axios from "axios";

import { refreshToken } from "@services/auth";

type apiRequestTypes = {
  url: string;
  method: string;
  headers?: any;
  data?: any;
  params?: any;
};

export const BASE_URL = "https://api-test.sinardigital.co.id";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const apiRequest = async ({
  url,
  method,
  headers = defaultHeaders,
  data,
  params,
}: apiRequestTypes) => {
  const response = await axios({
    url: `${BASE_URL}${url}`,
    method,
    headers,
    data,
    params,
  });

  return response.data;
};

// intercept requests
axios.interceptors.request.use(
  async (config) => {
    const method = config.method?.toLowerCase();

    if (typeof window != "undefined" && window.location.pathname !== "/login") {
      // get the token from cookie
      let token = localStorage.getItem("_accessToken");

      // if token is not in cookie, get it from firebase auth then save it to cookie
      if (!token) {
        const _refreshToken = localStorage.getItem("_refreshToken");

        if (!_refreshToken) throw new Error("Refresh token not found");

        // requesting a new access token
        const responseRefreshToken = await refreshToken(_refreshToken);

        localStorage.setItem(
          "_accessToken",
          responseRefreshToken.data.access_token
        );
        localStorage.setItem(
          "_refreshToken",
          responseRefreshToken.data.refresh_token
        );

        token = localStorage.getItem("_accessToken");
      }

      // add token to headers for post, patch requests or if paths are includes in embedTokenPathsOnGetRequest array (for get requests)
      if (
        method == "post" ||
        method == "patch" ||
        method == "put" ||
        method == "delete"
      ) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },

  // on request error
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// intercept responses
axios.interceptors.response.use(
  // if no error return response
  (res) => {
    // console.log(res);

    return res;
  },
  // if error catched do this
  async (err) => {
    // save original request
    const originalConfig = err.config;

    // if request is not login flow and error is 401 (unauthorized)
    if (originalConfig?.url !== "/login" && err.response) {
      // access token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        // console.log("Auth ErrorFound! Getting new access token");

        // set retry to true
        originalConfig._retry = true;

        // get the new access token
        try {
          const _refreshToken = localStorage.getItem("_refreshToken");

          if (!_refreshToken) throw new Error("Refresh token not found");

          // requesting a new access token
          const responseRefreshToken = await refreshToken(_refreshToken);

          localStorage.setItem(
            "_accessToken",
            responseRefreshToken.data.access_token
          );
          localStorage.setItem(
            "_refreshToken",
            responseRefreshToken.data.refresh_token
          );

          return axios(originalConfig);
        } catch (_error) {
          // if refresh token also expired
          console.log("Session time out. Please login again.");

          // clear state
          localStorage.removeItem("_accessToken");
          localStorage.removeItem("_refreshToken");

          // Redirecting the user to the landing page
          window.location.href = window.location.origin;

          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default apiRequest;
