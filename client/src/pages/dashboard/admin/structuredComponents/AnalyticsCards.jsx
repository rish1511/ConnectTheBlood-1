import { Activity, BarChart3, MapPin } from "lucide-react";

const AnalyticsBlock = ({ title, subtitle, icon: Icon, items = [], color }) => {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <article className="rounded-[24px] border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-950">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-600">{item.label}</span>
              <span className="font-bold text-gray-950">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-white">
              <div
                className={`${color} h-2 rounded-full`}
                style={{ width: `${Math.max((item.value / maxValue) * 100, 8)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

const AnalyticsCards = ({ analytics = {} }) => {
  return (
    <section id="analytics" className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-red-600">Analytics</p>
        <h2 className="mt-1 text-xl font-bold text-gray-950">
          Donation Intelligence
        </h2>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <AnalyticsBlock
          title="Blood Group Distribution"
          subtitle="Registered donor mix"
          icon={BarChart3}
          items={analytics.bloodGroups}
          color="bg-red-500"
        />
        <AnalyticsBlock
          title="Monthly Donations"
          subtitle="Completed donation trend"
          icon={Activity}
          items={analytics.monthlyDonations}
          color="bg-emerald-500"
        />
        <AnalyticsBlock
          title="City-wise Emergency Requests"
          subtitle="Demand hotspots"
          icon={MapPin}
          items={analytics.cityRequests}
          color="bg-orange-500"
        />
      </div>
    </section>
  );
};

export default AnalyticsCards;
