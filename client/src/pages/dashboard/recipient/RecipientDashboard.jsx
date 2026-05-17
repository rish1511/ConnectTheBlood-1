import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Droplets,
} from "lucide-react";

import { getRecipientDashboard } from "../../../Api/recipientApi";
import RequestHistory from "./structuredComponents/RequestHistory";
import Sidebar from "./structuredComponents/Sidebar";
import Topbar from "./structuredComponents/Topbar";

const RecipientDashboard = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getRecipientDashboard();
      const dashboard = response?.data || {};

      setUser(dashboard.recipient || null);
      setDashboardStats(dashboard.stats || null);
      setRequests(Array.isArray(dashboard.requests) ? dashboard.requests : []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load recipient dashboard",
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

  const stats = useMemo(() => {
    const pending = requests.filter((request) => request.status === "pending");
    const accepted = requests.filter((request) => request.status === "accepted");
    const critical = requests.filter(
      (request) => request.urgency === "critical",
    );

    return [
      {
        title: "Total Requests",
        value: dashboardStats?.totalRequests ?? requests.length,
        icon: Droplets,
        bg: "bg-red-50",
        iconBg: "bg-red-100",
        text: "text-red-500",
      },
      {
        title: "Pending",
        value: dashboardStats?.pendingRequests ?? pending.length,
        icon: Clock3,
        bg: "bg-amber-50",
        iconBg: "bg-amber-100",
        text: "text-amber-600",
      },
      {
        title: "Accepted",
        value: dashboardStats?.acceptedRequests ?? accepted.length,
        icon: CheckCircle2,
        bg: "bg-emerald-50",
        iconBg: "bg-emerald-100",
        text: "text-emerald-600",
      },
      {
        title: "Critical",
        value: dashboardStats?.criticalRequests ?? critical.length,
        icon: AlertCircle,
        bg: "bg-rose-50",
        iconBg: "bg-rose-100",
        text: "text-rose-600",
      },
    ];
  }, [dashboardStats, requests]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium text-gray-700">
        Loading recipient dashboard...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6 pb-24 lg:pb-6">
        <Topbar user={user} />

        {error && (
          <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div
          id="recipient-overview"
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`${item.bg} rounded-[28px] border border-gray-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`${item.iconBg} flex h-14 w-14 items-center justify-center rounded-2xl`}
                  >
                    <Icon className={`h-7 w-7 ${item.text}`} />
                  </div>
                </div>

                <p className="mt-5 text-xs text-gray-500">Updated recently</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 ">
          {/* <NearbyDonors user={user} requests={requests} donors={nearbyDonors} /> */}
          <RequestHistory requests={requests.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;
