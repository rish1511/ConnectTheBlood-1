import { Building2, FileText, Radio, Users } from "lucide-react";

const actions = [
  {
    title: "Add Blood Bank",
    description: "Register and verify a new blood bank partner.",
    icon: Building2,
    bg: "bg-red-50",
    text: "text-red-600",
  },
  {
    title: "View Reports",
    description: "Review platform activity and donation reports.",
    icon: FileText,
    bg: "bg-sky-50",
    text: "text-sky-600",
  },
  {
    title: "Broadcast Emergency Alert",
    description: "Notify nearby donors for urgent blood needs.",
    icon: Radio,
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  {
    title: "Manage Users",
    description: "Moderate accounts, verification and roles.",
    icon: Users,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
];

const QuickActions = () => {
  return (
    <section className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-red-600">Quick Actions</p>
        <h2 className="mt-1 text-xl font-bold text-gray-950">
          Admin Controls
        </h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              className="group rounded-[24px] border border-gray-100 bg-gray-50 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:bg-white hover:shadow-lg hover:shadow-gray-200/70"
            >
              <div
                className={`${action.bg} flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-105`}
              >
                <Icon className={`h-6 w-6 ${action.text}`} />
              </div>
              <h3 className="mt-4 font-bold text-gray-950">{action.title}</h3>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
