import API from "./axios";

// Signup
export const registerUser = async (formData) => {
  const response = await API.post("/auth/register", formData);
  return response.data;
};

// Login
export const loginUser = async (formData) => {
  const response = await API.post("/auth/login", formData);
  return response.data;
};

// Current logged in user
export const getMe = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};

// Upgrade logged-in seeker account to donor
export const becomeDonor = async () => {
  const response = await API.patch("/auth/become-donor");
  return response.data;
};
