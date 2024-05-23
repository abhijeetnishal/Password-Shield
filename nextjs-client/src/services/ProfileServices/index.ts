import request from "../request";

const updateUserProfile = (id: string, data: Object) => {
  return request({
    url: `/v1/api/users/${id}`,
    method: "PUT",
    body: data,
  });
};

const getUserProfile = (token: string) => {
  return request({
    url: `/v1/api/users`,
    method: "GET",
    headers: { "auth-token": token },
  });
};

export const ProfileService = {
  updateUserProfile,
  getUserProfile,
};
