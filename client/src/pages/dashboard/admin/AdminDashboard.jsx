import AdminShell from "./structuredComponents/AdminShell";
import StatsCards from "./structuredComponents/StatsCards";
import useAdminDashboardData from "./useAdminDashboardData";

const AdminDashboard = () => {
  const { dashboard, loading, error } = useAdminDashboardData();

  return (
    <AdminShell loading={loading} error={error} loadingText="Loading admin dashboard...">
      <section className="mt-6">
        <StatsCards stats={dashboard.stats} />
      </section>
    </AdminShell>
  );
};

export default AdminDashboard;
