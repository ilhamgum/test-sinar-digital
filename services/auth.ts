import apiRequest from "@utils/apiRequest";

export const login = async (email: string, password: string) => {
  return await apiRequest({
    url: "/auth/login",
    method: "post",
    data: {
      email,
      password,
    },
  });
};

export const logout = async () => {
  return await apiRequest({
    url: "/auth/logout",
    method: "post",
  });
};

export const refreshToken = async (refresh_token: string) => {
  return await apiRequest({
    url: "/auth/refresh",
    method: "post",
    data: {
      refresh_token,
    },
  });
};

export const resetPassword = async (email: string) => {
  return await apiRequest({
    url: "/auth/reset-password",
    method: "post",
    data: {
      email,
    },
  });
};

export const updatePassword = async (token: string, password: string) => {
  return await apiRequest({
    url: "/auth/update-password",
    method: "post",
    data: {
      token,
      password,
    },
  });
};

export const getProfile = async () => {
  return await apiRequest({
    url: "/auth/me",
    method: "get",
  });
};
