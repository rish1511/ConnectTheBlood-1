import { Bell, CheckCheck, User } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getMyNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../../Api/notificationApi";

const DashboardTopbar = ({
  user,
  fallbackName,
  subtitle,
  meta,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState("unread");

  const unreadNotifications = notifications.filter((item) => !item.isRead);
  const seenNotifications = notifications.filter((item) => item.isRead);
  const activeNotifications =
    activeTab === "unread" ? unreadNotifications : seenNotifications;

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await getMyNotifications();
      const data = response?.data || {};
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
      setActiveTab((data.unreadCount || 0) > 0 ? "unread" : "seen");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleReadAll = async () => {
    await markAllNotificationsRead();
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    setUnreadCount(0);
    setActiveTab("seen");
  };

  const handleItemClick = async (notificationId) => {
    const target = notifications.find((item) => item._id === notificationId);

    if (!target || target.isRead) {
      return;
    }

    await markNotificationRead(notificationId);
    setNotifications((prev) =>
      prev.map((item) =>
        item._id === notificationId ? { ...item, isRead: true } : item,
      ),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-gray-100 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-500">
          Welcome,{" "}
          <span className="text-red-700">{user?.fullName || fallbackName}</span>
        </h1>

        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="relative flex items-center gap-4">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 transition hover:bg-red-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />
          )}
        </button>

        {open && (
          <div className="absolute right-0 top-14 z-50 w-80 rounded-2xl border border-gray-100 bg-white p-3 shadow-lg">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-800">Notifications</p>
              <button
                type="button"
                onClick={handleReadAll}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                <CheckCheck className="h-4 w-4" />
                Mark all
              </button>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("unread")}
                className={`rounded-lg px-2 py-1 text-xs font-semibold transition ${
                  activeTab === "unread"
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-gray-600"
                }`}
              >
                Unread ({unreadNotifications.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("seen")}
                className={`rounded-lg px-2 py-1 text-xs font-semibold transition ${
                  activeTab === "seen"
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-gray-600"
                }`}
              >
                Seen ({seenNotifications.length})
              </button>
            </div>

            <div className="max-h-72 space-y-2 overflow-y-auto">
              {loading ? (
                <p className="py-4 text-center text-xs text-gray-500">Loading...</p>
              ) : activeNotifications.length === 0 ? (
                <p className="py-4 text-center text-xs text-gray-500">
                  {activeTab === "unread" ? "No unread notifications" : "No seen notifications"}
                </p>
              ) : (
                activeNotifications.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => handleItemClick(item._id)}
                    className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                      item.isRead
                        ? "border-gray-100 bg-gray-50"
                        : "border-red-100 bg-red-50"
                    }`}
                  >
                    <p className="text-xs font-semibold text-gray-900">{item.title}</p>
                    <p className="mt-1 text-xs text-gray-600">{item.message}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        <div className="flex cursor-pointer items-center gap-3 rounded-2xl bg-gray-100 px-3 py-2 transition hover:bg-gray-200">
          <User className="h-5 w-5 text-gray-700" />

          <div className="hidden lg:block">
            <h3 className="text-sm font-semibold text-gray-900">
              {user?.fullName || fallbackName}
            </h3>
            <p className="text-xs text-gray-500">{meta}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopbar;
