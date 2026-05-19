import { useEffect, useState } from "react";

import { getAdminDashboard } from "../../../Api/adminApi";

export const fallbackDashboard = {
  stats: {
    totalUsers: 1248,
    totalDonors: 684,
    totalRecipients: 438,
    bloodBanks: 26,
    totalRequests: 312,
    pendingRequests: 38,
    completedDonations: 197,
    availableDonors: 421,
  },
  users: [
    {
      _id: "demo-1",
      fullName: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      role: "donor",
      roles: ["seeker", "donor"],
      bloodGroup: "O+",
      city: "Delhi",
      isVerified: true,
      isBlocked: false,
      createdAt: "2026-05-01T08:30:00.000Z",
    },
    {
      _id: "demo-2",
      fullName: "Priya Mehta",
      email: "priya.mehta@example.com",
      role: "seeker",
      roles: ["seeker"],
      bloodGroup: "A-",
      city: "Mumbai",
      isVerified: false,
      isBlocked: false,
      createdAt: "2026-04-26T10:10:00.000Z",
    },
    {
      _id: "demo-3",
      fullName: "City Care Blood Bank",
      email: "ops@citycareblood.org",
      role: "bloodbank",
      roles: ["bloodbank"],
      bloodGroup: "AB+",
      city: "Pune",
      isVerified: true,
      isBlocked: false,
      createdAt: "2026-04-19T14:20:00.000Z",
    },
    {
      _id: "demo-4",
      fullName: "Rohan Gupta",
      email: "rohan.gupta@example.com",
      role: "donor",
      roles: ["seeker", "donor"],
      bloodGroup: "B+",
      city: "Jaipur",
      isVerified: true,
      isBlocked: true,
      createdAt: "2026-03-29T12:45:00.000Z",
    },
  ],
  analytics: {
    bloodGroups: [
      { label: "O+", value: 32 },
      { label: "A+", value: 24 },
      { label: "B+", value: 18 },
      { label: "AB+", value: 11 },
    ],
    monthlyDonations: [
      { label: "Jan", value: 42 },
      { label: "Feb", value: 58 },
      { label: "Mar", value: 63 },
      { label: "Apr", value: 71 },
    ],
    cityRequests: [
      { label: "Delhi", value: 46 },
      { label: "Mumbai", value: 39 },
      { label: "Pune", value: 27 },
      { label: "Jaipur", value: 19 },
    ],
  },
};

const useAdminDashboardData = () => {
  const [dashboard, setDashboard] = useState(fallbackDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminDashboard();
      setDashboard(response?.data || fallbackDashboard);
    } catch (err) {
      setDashboard(fallbackDashboard);
      setError(
        err.response?.data?.message ||
          "Live admin data is unavailable. Showing demo dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      fetchDashboard();
    });
  }, []);

  return {
    dashboard,
    loading,
    error,
    refreshDashboard: fetchDashboard,
  };
};

export default useAdminDashboardData;
