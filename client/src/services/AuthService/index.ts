import request from "../request";

const emailSignUp = (payload: Object) => {
  return request({
    url: `/auth/v1/register`,
    method: "POST",
    body: payload,
  });
};

const emailLogin = (payload: Object) => {
  return request({
    url: `/auth/v1/login`,
    method: "POST",
    body: payload,
  });
};

export const AuthService = {
  emailSignUp,
  emailLogin,
};
