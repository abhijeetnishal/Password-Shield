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

const forgotPassword = (payload: Object) => {
  return request({
    url: `/auth/v1/forgot-password`,
    method: "POST",
    body: payload,
  });
};

const resetPassword = (payload: Object) => {
  return request({
    url: `/auth/v1/reset-password`,
    method: "POST",
    body: payload,
  });
};

export const AuthService = {
  emailSignUp,
  emailLogin,
  forgotPassword,
  resetPassword,
};
