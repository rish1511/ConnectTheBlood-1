import API from "./axios";

export const getRecipientDashboard = async () => {
  const response = await API.get("/recipient/dashboard");
  return response.data;
};

export const getRecipientProfile = async () => {
  const response = await API.get("/recipient/profile");
  return response.data;
};
