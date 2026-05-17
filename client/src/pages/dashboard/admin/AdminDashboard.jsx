import {
  Activity,
  Building2,
  ClipboardList,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Users",
    value: "Manage",
    icon: Users,
    bg: "bg-red-50",
    text: "text-red-600",
  },
  {
    title: "Requests",
    value: "Review",
    icon: ClipboardList,
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    title: "Blood Banks",
    value: "Track",
    icon: Building2,
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    title: "System",
    value: "Active",
    icon: Activity,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[28px] border border-gray-100 bg-white px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-red-600">
                Admin Panel
              </p>
              <h1 className="mt-1 text-2xl font-bold text-gray-900">
                Connect The Blood Overview
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Monitor users, requests, and platform health before launch.
              </p>
            </div>

            <Link
              to="/"
              className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-200 hover:text-red-600"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className={`${card.bg} rounded-[28px] border border-gray-100 p-5 shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{card.title}</p>
                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                      {card.value}
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
                    <Icon className={`h-6 w-6 ${card.text}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
              <ShieldCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Deployment Checklist
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Set the client environment variable VITE_API_URL to your hosted
                API URL, keep JWT_SECRET and MONGO_URI configured on the server,
                and test login plus request creation after deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
