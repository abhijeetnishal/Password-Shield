import request from "../request";

const getUserPasswords = (token: string) => {
  return request({
    url: `/api/v1/passwords`,
    method: "GET",
    headers: { "auth-token": token },
  });
};

export const PasswordsService = {
  getUserPasswords,
};
