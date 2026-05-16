import {
  HeartHandshake,
  Siren,
  ToggleLeft,
  MapPin,
} from "lucide-react";

const actions = [
  {
    id: 1,
    title: "Donate Blood",
    description: "Help someone in need",
    icon: HeartHandshake,
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    text: "text-red-600",
  },
  {
    id: 2,
    title: "Emergency Request",
    description: "View urgent blood needs",
    icon: Siren,
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    text: "text-orange-600",
  },
  {
    id: 3,
    title: "Update Status",
    description: "Set availability status",
    icon: ToggleLeft,
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    text: "text-green-600",
  },
  {
    id: 4,
    title: "Nearby Hospitals",
    description: "Find hospitals near you",
    icon: MapPin,
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    text: "text-blue-600",
  },
];

const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <div
            key={action.id}
            className={`${action.bg} border border-gray-100 rounded-3xl p-5 cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
          >
            <div
              className={`w-14 h-14 rounded-2xl ${action.iconBg} flex items-center justify-center mb-4`}
            >
              <Icon className={`w-7 h-7 ${action.text}`} />
            </div>

            <h3 className="text-gray-900 font-semibold text-base">
              {action.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {action.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default QuickActions;