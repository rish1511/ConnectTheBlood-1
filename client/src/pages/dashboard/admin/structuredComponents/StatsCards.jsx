import {
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Droplets,
  HeartHandshake,
  UserCheck,
  Users,
} from "lucide-react";

const StatsCards = ({ stats = {} }) => {
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers ?? 0,
      icon: Users,
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Total Donors",
      value: stats.totalDonors ?? 0,
      icon: HeartHandshake,
      bg: "bg-rose-50",
      iconBg: "bg-rose-100",
      text: "text-rose-600",
    },
    {
      title: "Total Recipients",
      value: stats.totalRecipients ?? 0,
      icon: UserCheck,
      bg: "bg-sky-50",
      iconBg: "bg-sky-100",
      text: "text-sky-600",
    },
    {
      title: "Blood Banks",
      value: stats.bloodBanks ?? 0,
      icon: Building2,
      bg: "bg-violet-50",
      iconBg: "bg-violet-100",
      text: "text-violet-600",
    },
    {
      title: "Total Requests",
      value: stats.totalRequests ?? 0,
      icon: ClipboardList,
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      text: "text-orange-600",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests ?? 0,
      icon: Clock3,
      bg: "bg-amber-50",
      iconBg: "bg-amber-100",
      text: "text-amber-600",
    },
    {
      title: "Completed Donations",
      value: stats.completedDonations ?? 0,
      icon: CheckCircle2,
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    {
      title: "Available Donors",
      value: stats.availableDonors ?? 0,
      icon: Droplets,
      bg: "bg-pink-50",
      iconBg: "bg-pink-100",
      text: "text-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.title}
            className={`${item.bg} rounded-[28px] border border-white/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/70`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-gray-950">
                  {item.value}
                </h2>
              </div>

              <div
                className={`${item.iconBg} flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl`}
              >
                <Icon className={`h-7 w-7 ${item.text}`} />
              </div>
            </div>

            <p className="mt-5 text-xs font-medium text-gray-500">
              Updated from admin overview
            </p>
          </article>
        );
      })}
    </div>
  );
};

export default StatsCards;
