import { request } from "../request";

const getUserVerifyDetails = (token: string) => {
  return request({
    url: `/api/v1/users/verify`,
    method: "GET",
    headers: { "auth-token": token },
  });
};

export const ProfileService = {
  getUserVerifyDetails,
};
