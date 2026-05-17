import API from "./axios";

// Get donor dashboard
export const getDonorDashboard =
  async () => {
    const response =
      await API.get(
        "/donor/dashboard"
      );

    return response.data;
  };

// Get donor profile
export const getDonorProfile =
  async () => {
    const response =
      await API.get(
        "/donor/profile"
      );

    return response.data;
  };

// Update donor profile
export const updateDonorProfile =
  async (formData) => {
    const response =
      await API.patch(
        "/donor/profile",
        formData
      );

    return response.data;
  };

// Update donor availability
export const updateDonorAvailability =
  async (available) => {
    const response =
      await API.patch(
        "/donor/availability",
        {
          available,
        }
      );

    return response.data;
  };

// Emergency requests
export const getEmergencyRequests =
  async () => {
    const response =
      await API.get(
        "/donor/emergency-requests"
      );

    return response.data;
  };

// Accept emergency request
export const acceptEmergencyRequest =
  async (id) => {
    const response =
      await API.post(
        `/donor/emergency-requests/${id}/accept`
      );

    return response.data;
  };

// Accepted requests waiting for completion
export const getAcceptedRequests =
  async () => {
    const response =
      await API.get(
        "/donor/accepted-requests"
      );

    return response.data;
  };

// Mark accepted request as completed
export const completeEmergencyRequest =
  async (id) => {
    const response =
      await API.patch(
        `/donor/emergency-requests/${id}/complete`
      );

    return response.data;
  };

// Donation history
export const getDonationHistory =
  async () => {
    const response =
      await API.get(
        "/donor/donation-history"
      );

    return response.data;
  };
