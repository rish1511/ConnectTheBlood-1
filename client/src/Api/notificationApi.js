import API from "./axios";

export const getMyNotifications = async () => {
  const response = await API.get("/notifications");
  return response.data;
};

export const markNotificationRead = async (notificationId) => {
  const response = await API.patch(`/notifications/${notificationId}/read`);
  return response.data;
};

export const markAllNotificationsRead = async () => {
  const response = await API.patch("/notifications/read-all");
  return response.data;
};
