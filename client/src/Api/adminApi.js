import API from "./axios";

export const getAdminDashboard = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};

export const updateAdminUserStatus = async (userId, payload) => {
  const response = await API.patch(`/admin/users/${userId}/status`, payload);
  return response.data;
};

export const updateAdminUserRole = async (userId, payload) => {
  const response = await API.patch(`/admin/users/${userId}/role`, payload);
  return response.data;
};

export const updateAdminRequestStatus = async (requestId, payload) => {
  const response = await API.patch(`/admin/requests/${requestId}/status`, payload);
  return response.data;
};
