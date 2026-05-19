import AdminShell from "./structuredComponents/AdminShell";
import AnalyticsCards from "./structuredComponents/AnalyticsCards";
import useAdminDashboardData from "./useAdminDashboardData";

const AdminAnalyticsPage = () => {
  const { dashboard, loading, error } = useAdminDashboardData();

  return (
    <AdminShell loading={loading} error={error} loadingText="Loading analytics...">
      <section className="mt-6">
        <AnalyticsCards analytics={dashboard.analytics} />
      </section>
    </AdminShell>
  );
};

export default AdminAnalyticsPage;
