import AdminShell from "./structuredComponents/AdminShell";
import UsersTable from "./structuredComponents/UsersTable";
import useAdminDashboardData from "./useAdminDashboardData";

const AdminUsersPage = () => {
  const { dashboard, loading, error, refreshDashboard } = useAdminDashboardData();

  return (
    <AdminShell loading={loading} error={error} loadingText="Loading users...">
      <section className="mt-6">
        <UsersTable users={dashboard.users} onRefresh={refreshDashboard} />
      </section>
    </AdminShell>
  );
};

export default AdminUsersPage;
