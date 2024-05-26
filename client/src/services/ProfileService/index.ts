import request from "../request";

const updateUserProfile = (id: string, data: Object) => {
  return request({
    url: `/api/v1/users/${id}`,
    method: "PUT",
    body: data,
  });
};

const getUserProfile = (token: string) => {
  return request({
    url: `/api/v1/users`,
    method: "GET",
    headers: { "auth-token": token },
  });
};

export const ProfileService = {
  updateUserProfile,
  getUserProfile,
};
