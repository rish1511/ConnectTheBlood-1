import DashboardTopbar from "../../../../components/commonDashboard/DashboardTopbar";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const Topbar = () => {
  const user = getStoredUser();

  return (
    <DashboardTopbar
      user={user}
      fallbackName="Admin"
      subtitle="Monitor and manage your blood donation ecosystem."
      meta="Admin Access"
    />
  );
};

export default Topbar;
