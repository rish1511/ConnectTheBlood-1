import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminShell = ({ loading, error, loadingText = "Loading admin data...", children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-4 pb-40 sm:p-6 lg:pb-6">
        <Topbar />

        {error && (
          <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-6 rounded-[28px] border border-gray-100 bg-white p-8 text-center text-sm font-semibold text-gray-500 shadow-sm">
            {loadingText}
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default AdminShell;
