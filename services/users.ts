import apiRequest from "@utils/apiRequest";

export const getUsers = async () => {
  return await apiRequest({
    url: "/users",
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_accessToken")}`,
    },
  });
};

export const addUser = async (
  name: string,
  email: string,
  password: string,
  bio: string,
  avatar: string,
  roleId: string
) => {
  return await apiRequest({
    url: "/users",
    method: "post",
    data: {
      name,
      email,
      password,
      bio,
      avatar,
      roleId,
    },
  });
};

export const deleteUser = async (id: string) => {
  return await apiRequest({
    url: `/users/${id}`,
    method: "delete",
  });
};
