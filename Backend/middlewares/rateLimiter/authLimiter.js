// add rate limiting for auth later on
const rateLimit = require("express-rate-limit");

const keyGen = (req) => {
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';
    return ip.startsWith('::ffff:') ? ip.slice(7) : ip;
};

const makeHandler = (limitName) => (req, res, next, options) => {
    console.warn(
        `[RATE LIMIT] ${limitName} exceeded | IP: ${req.ip} | path: ${req.path}`
    );
    res.status(options.statusCode).json(options.message);
};

const limiterDefaults = {
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: keyGen,
    validate: {
        xForwardedForHeader: false,
        keyGeneratorIpFallback: false,
    },
    skip: (req) => req.path === "/health" 
};

// General auth limiter (login, signup, etc.)
const authLimiter = rateLimit({
    ...limiterDefaults,
    windowMs: 15 * 60 * 1000,
    max: 10,  // ⬇ was 20. College app: 10 attempts per 15min per IP is plenty
    message: { success: false, message: "Too many auth attempts, please try again later." },
    handler: makeHandler("authLimiter"),
});

// Stricter limiter for forgot/reset password
const passwordResetLimiter = rateLimit({
    ...limiterDefaults,
    windowMs: 60 * 60 * 1000,
    max: 3,  // ⬇ was 5. Password reset is a high-abuse vector, 3/hr is safe
    message: { success: false, message: "Too many password reset attempts, please try again after an hour." },
    handler: makeHandler("passwordResetLimiter"),
});

module.exports = {
    authLimiter,
    passwordResetLimiter,
};