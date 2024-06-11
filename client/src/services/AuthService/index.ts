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

const forgotPassword = (payload: Object, token: string) => {
  return request({
    url: `/auth/v1/forgot-password`,
    method: "POST",
    body: payload,
    headers: { "auth-token": token },
  });
};

const resetPassword = (payload: Object, token: string) => {
  return request({
    url: `/auth/v1/reset-password`,
    method: "POST",
    body: payload,
    headers: { "auth-token": token },
  });
};

export const AuthService = {
  emailSignUp,
  emailLogin,
  forgotPassword,
  resetPassword,
};
