import API from "./axios";

const unwrapData = (response) => response.data?.data ?? response.data;

// Signup
export const registerUser = async (formData) => {
  const response = await API.post("/auth/register", formData);
  return unwrapData(response);
};

// Login
export const loginUser = async (formData) => {
  const response = await API.post("/auth/login", formData);
  return unwrapData(response);
};

export const resetPassword = async (formData) => {
  const response = await API.post("/auth/reset-password", formData);
  return unwrapData(response);
};

// Current logged in user
export const getMe = async () => {
  const response = await API.get("/auth/me");
  return unwrapData(response);
};

// Upgrade logged-in seeker account to donor
export const becomeDonor = async () => {
  const response = await API.patch("/auth/become-donor");
  return unwrapData(response);
};
