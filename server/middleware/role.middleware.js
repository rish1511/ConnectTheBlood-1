const { USER_ROLES } = require("../modules/auth/auth.constants");

const normalizeRoles = (user) => {
  const allowedRoles = Object.values(USER_ROLES);
  const userRoles = [
    ...(Array.isArray(user.roles) ? user.roles : []),
    user.role,
  ].filter((role) => allowedRoles.includes(role));

  return [...new Set(userRoles.length ? userRoles : [USER_ROLES.SEEKER])];
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRoles = normalizeRoles(req.user);

    if (!userRoles.some((role) => roles.includes(role))) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = authorizeRoles;
