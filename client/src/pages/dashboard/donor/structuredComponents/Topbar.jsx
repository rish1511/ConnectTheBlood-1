import DashboardTopbar from "../../../../components/commonDashboard/DashboardTopbar";

const Topbar = ({ donor }) => {
  return (
    <DashboardTopbar
      user={donor}
      fallbackName="Donor"
      subtitle="Here's what's happening with your donations today."
      meta={`${donor?.bloodGroup || "N/A"} Blood Donor`}
    />
  );
};

export default Topbar;
