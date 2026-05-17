import API from "./axios";

export const createBloodRequest = async (formData) => {
  const response = await API.post("/requests", formData);
  return response.data;
};

export const getMyBloodRequests = async () => {
  const response = await API.get("/requests/my");
  return response.data;
};
