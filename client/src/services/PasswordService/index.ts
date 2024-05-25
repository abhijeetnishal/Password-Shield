import request from "../request";

const getUserPasswords = (token: string) => {
  return request({
    url: `/api/v1/passwords`,
    method: "GET",
    headers: { "auth-token": token },
  });
};

const addUserPassword = (payload: Object, token: string) => {
  return request({
    url: `/api/v1/passwords`,
    method: "POST",
    body: payload,
    headers: { "auth-token": token },
  });
};

const UpdateUserPassword = (id: string, payload: Object, token: string) => {
  return request({
    url: `/api/v1/passwords/${id}`,
    method: "PUT",
    body: payload,
    headers: { "auth-token": token },
  });
};

const DeleteUserPassword = (id: string, token: string) => {
  return request({
    url: `/api/v1/passwords/${id}`,
    method: "DELETE",
    headers: { "auth-token": token },
  });
};

export const PasswordsService = {
  getUserPasswords,
  addUserPassword,
  UpdateUserPassword,
  DeleteUserPassword,
};
