import { request } from "../request";

interface AuthPayload {
  email?: string;
  password?: string;
  name?: string;
}

const signup = (payload: AuthPayload) => {
  return request({
    url: `/auth/v1/register`,
    method: "POST",
    body: payload,
  });
};

const login = (payload: AuthPayload) => {
  return request({
    url: `/auth/v1/login`,
    method: "POST",
    body: payload,
  });
};

export const AuthService = {
  signup,
  login,
};
