import { HeartHandshake, HeartPulse, Droplets, Siren } from "lucide-react";

const StatsCards = ({ stats, donor }) => {
  const cards = [
    {
      title: "Total Donations",
      value: stats?.totalDonations ?? 0,
      icon: HeartHandshake,
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      text: "text-red-500",
    },

    {
      title: "Units Donated",
      value: stats?.unitsDonated ?? stats?.livesSaved ?? 0,
      icon: HeartPulse,
      bg: "bg-pink-50",
      iconBg: "bg-pink-100",
      text: "text-pink-500",
    },

    {
      title: "Blood Group",
      value: donor?.bloodGroup ?? "N/A",
      icon: Droplets,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      text: "text-blue-500",
    },

    {
      title: "Emergency Requests",
      value: stats?.emergencyRequestsCount ?? 0,
      icon: Siren,
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      text: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
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
  );
};

export default StatsCards;
