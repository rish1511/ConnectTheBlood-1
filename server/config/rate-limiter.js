const rateLimit =
require(
 "express-rate-limit"
);

const normalizeEmail = (value = "") =>
 String(value || "")
  .trim()
  .toLowerCase();

const loginLimiter =
rateLimit({

 windowMs:
 10 * 60 * 1000,

 max: 20,

 skipSuccessfulRequests:
 true,

 keyGenerator: (req) => {
  const email = normalizeEmail(req.body?.email);
  const ip = req.ip || req.socket?.remoteAddress || "unknown";

  if (!email) {
   return `login:${ip}`;
  }

  return `login:${email}:${ip}`;
 },

 handler: (req, res) => {
  const retryAfter = Number(req.rateLimit?.resetTime)
   ? Math.max(
      1,
      Math.ceil((new Date(req.rateLimit.resetTime).getTime() - Date.now()) / 60000),
    )
   : 10;

  return res.status(429).json({
   success: false,
   message: `Too many login attempts. Please try again in about ${retryAfter} minute(s).`,
  });
 },

 standardHeaders:
 true,

 legacyHeaders:
 false,
});

const registerLimiter =
rateLimit({

 windowMs:
 15 * 60 * 1000,

 max: 10,

 message: {
  success: false,
  message:
   "Too many registrations, please try again later.",
 },

 standardHeaders:
 true,

 legacyHeaders:
 false,
});

module.exports = {
 loginLimiter,
 registerLimiter,
};
