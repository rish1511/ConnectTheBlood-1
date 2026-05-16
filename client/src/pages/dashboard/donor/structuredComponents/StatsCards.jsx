import {
  HeartHandshake,
  HeartPulse,
  Droplets,
  Siren,
} from "lucide-react";

const stats = [
  {
    title: "Total Donations",
    value: "12",
    icon: HeartHandshake,
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    text: "text-red-500",
  },
  {
    title: "Lives Saved",
    value: "36+",
    icon: HeartPulse,
    bg: "bg-pink-50",
    iconBg: "bg-pink-100",
    text: "text-pink-500",
  },
  {
    title: "Blood Group",
    value: "O+",
    icon: Droplets,
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    text: "text-blue-500",
  },
  {
    title: "Emergency Requests",
    value: "08",
    icon: Siren,
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    text: "text-orange-500",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className={`${item.bg} border border-gray-100 rounded-[28px] p-5 shadow-sm hover:-translate-y-1 transition-all duration-300`}
          >
            {/* Top */}
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`${item.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center`}
              >
                <Icon
                  className={`w-7 h-7 ${item.text}`}
                />
              </div>
            </div>

            {/* Bottom text */}
            <p className="text-xs text-gray-500 mt-5">
              Updated recently
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;