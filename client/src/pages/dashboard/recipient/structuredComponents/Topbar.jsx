import DashboardTopbar from "../../../../components/commonDashboard/DashboardTopbar";

const Topbar = ({ user }) => {
  return (
    <DashboardTopbar
      user={user}
      fallbackName="Recipient"
      subtitle="Track blood requests and connect with available donors."
      meta={user?.city || "City not added"}
    />
  );
};

export default Topbar;
