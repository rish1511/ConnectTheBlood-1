const jwt = require("jsonwebtoken");
const { USER_ROLES } = require("../modules/auth/auth.constants");

const normalizeRoles = (user) => {
  const allowedRoles = Object.values(USER_ROLES);
  const roles = [
    ...(Array.isArray(user.roles) ? user.roles : typeof user.roles === "string" ? [user.roles] : []),
    ...(typeof user.role === "string" ? [user.role] : []),
  ].filter((role) => allowedRoles.includes(role));

  return [...new Set(roles.length ? roles : [USER_ROLES.SEEKER])];
};

const getPrimaryRole = (roles) => {
  const priority = [
    USER_ROLES.ADMIN,
    USER_ROLES.BLOODBANK,
    USER_ROLES.DONOR,
    USER_ROLES.SEEKER,
  ];

  return priority.find((role) => roles.includes(role)) || USER_ROLES.SEEKER;
};

const generateToken = (user) => {
  const roles = normalizeRoles(user);

  return jwt.sign(
    {
      id: user._id,
      role: getPrimaryRole(roles),
      roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;
