export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const getDashboardRoute = (role) => {
  const roles = Array.isArray(role) ? role : [role];

  if (roles.includes("admin")) {
    return "/dashboard/admin";
  }

  if (roles.includes("bloodbank")) {
    return "/dashboard/blood-bank";
  }

  if (roles.includes("donor")) {
    return "/dashboard/donor";
  }

  if (roles.includes("seeker")) {
    return "/dashboard/recipient";
  }

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

  return getDashboardRoute(user?.roles || user?.role);
};
