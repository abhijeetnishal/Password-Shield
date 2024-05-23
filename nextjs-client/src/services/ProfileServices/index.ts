import request from "../request";

const updateUserProfile = (id: string, data: Object) => {
  return request({
    url: `/v1/api/users/${id}`,
    method: "PUT",
    body: data,
  });
};

const getUserProfile = (id: string) => {
  return request({
    url: `/v1/api/users/${id}`,
    method: "GET",
  });
};

export const ProfileService = {
  updateUserProfile,
  getUserProfile,
};
