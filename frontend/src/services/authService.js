import api from "./api";

export const loginUser =
async (credentials) => {

  const response =
  await api.post(
    "/auth/login/",
    credentials
  );

  return response.data;
};

export const logoutUser = () => {

  localStorage.removeItem(
    "accessToken"
  );

  localStorage.removeItem(
    "refreshToken"
  );

  localStorage.removeItem(
    "role"
  );

  localStorage.removeItem(
    "name"
  );

};