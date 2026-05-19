const Notification = require("./notification.model");
const User = require("../auth/auth.model");

const createNotification = async ({ user, title, message, type = "info", meta = {} }) => {
  if (!user || !title || !message) {
    return null;
  }

  return Notification.create({
    user,
    title,
    message,
    type,
    meta,
  });
};

const createNotificationsForUsers = async ({ userIds = [], title, message, type = "info", meta = {} }) => {
  const uniqueUserIds = [...new Set(userIds.map((id) => String(id)).filter(Boolean))];

  if (!uniqueUserIds.length || !title || !message) {
    return;
  }

  await Notification.insertMany(
    uniqueUserIds.map((userId) => ({
      user: userId,
      title,
      message,
      type,
      meta,
    })),
  );
};

const getUsersByRole = async (role) => {
  return User.find({
    $or: [{ role }, { roles: role }],
    isBlocked: false,
  })
    .select("_id")
    .lean();
};

const notifyRole = async ({ role, title, message, type = "info", meta = {} }) => {
  const users = await getUsersByRole(role);
  const userIds = users.map((user) => user._id);

  await createNotificationsForUsers({ userIds, title, message, type, meta });
};

const getMyNotificationsService = async (userId) => {
  const notifications = await Notification.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(25)
    .lean();

  const unreadCount = await Notification.countDocuments({
    user: userId,
    isRead: false,
  });

  return {
    unreadCount,
    notifications,
  };
};

const markNotificationReadService = async (userId, notificationId) => {
  return Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { isRead: true },
    { new: true },
  ).lean();
};

const markAllNotificationsReadService = async (userId) => {
  await Notification.updateMany(
    { user: userId, isRead: false },
    { isRead: true },
  );

  return true;
};

module.exports = {
  createNotification,
  createNotificationsForUsers,
  notifyRole,
  getMyNotificationsService,
  markNotificationReadService,
  markAllNotificationsReadService,
};
