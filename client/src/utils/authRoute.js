export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const getDashboardRoute = (role) => {
  switch (role) {
    case "donor":
      return "/dashboard/donor";

    case "seeker":
      return "/dashboard/recipient";

    case "bloodbank":
      return "/dashboard/blood-bank";

    case "admin":
      return "/dashboard/admin";

    default:
      return "/dashboard";
  }
};

export const getAuthAwareRoute = (fallbackRoute) => {
  const token = localStorage.getItem("token");
  const user = getStoredUser();

  if (!token) {
    return fallbackRoute;
  }

  return getDashboardRoute(user?.role);
};
