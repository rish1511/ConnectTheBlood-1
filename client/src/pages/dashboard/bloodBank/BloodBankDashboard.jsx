import { Building2, Droplets, Home, Inbox, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Inventory",
    value: "Ready",
    icon: Droplets,
    bg: "bg-red-50",
    text: "text-red-600",
  },
  {
    title: "Requests",
    value: "Incoming",
    icon: Inbox,
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    title: "Alerts",
    value: "Monitor",
    icon: TriangleAlert,
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
];

const BloodBankDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-gray-100 bg-white px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-red-600">
                Blood Bank Panel
              </p>
              <h1 className="mt-1 text-2xl font-bold text-gray-900">
                Blood Bank Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Inventory and request management surface for blood banks.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-200 hover:text-red-600"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
              <Building2 className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Module Status
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                The blood bank UI is ready as a non-blank dashboard shell. Add
                live inventory APIs here when the blood bank module is expanded.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodBankDashboard;
