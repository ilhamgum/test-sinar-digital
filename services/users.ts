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
