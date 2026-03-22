// add rate limiting for auth later on
const rateLimit = require("express-rate-limit");

const isDev = true;

const keyGenIP = (req) => {
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';
    return ip.startsWith('::ffff:') ? ip.slice(7) : ip;
};

const keyGenEmail = (req) => {
    const ip = keyGenIP(req);
    const email = req.body?.email || 'no-email';
    return `${ip}-${email}`;
};

const keyGenStudentID = (req) => {
    const ip = keyGenIP(req);
    const studentID = req.body?.studentID || 'no-id';
    return `${ip}-${studentID}`;
};

const keyGenToken = (req) => {
    if (!req.params?.token) return "missing-token";
    return req.params.token;
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
    validate: {
        xForwardedForHeader: false,
        keyGeneratorIpFallback: false,
    },
    skip: (req) => req.path === "/health" 
};

const signupLimiter = rateLimit({
    ...limiterDefaults,
    keyGenerator: keyGenEmail,
    windowMs: 15 * 60 * 1000, // 15 min
    max: isDev ? 50 : 5,
    message: { success: false, message: "Too many auth attempts, please try again later." },
    handler: makeHandler("signupLimiter"),
});

// login limiter for students ( studentID + passowrd credentials used for login)
const studentLoginLimiter = rateLimit({
    ...limiterDefaults,
    keyGenerator: keyGenStudentID,
    skipSuccessfulRequests: true,
    windowMs: 15 * 60 * 1000, // 15 min
    max: isDev ? 50 : 10,
    handler: makeHandler("studentLoginLimiter"),
});

// login limiter for admin and divisionIncharge ( email + passowrd credentials used for login)
const emailLoginLimiter = rateLimit({
    ...limiterDefaults,
    keyGenerator: keyGenEmail,
    skipSuccessfulRequests: true,
    windowMs: 15 * 60 * 1000,
    max: isDev ? 50 : 10,
    handler: makeHandler("emailLoginLimiter"),
});

const emailVerificationLimiter = rateLimit({
    ...limiterDefaults,
    keyGenerator: keyGenToken,
    windowMs: 60 * 60 * 1000,  //1 hour
    max: isDev ? 50 : 10,
    message: { success: false, message: "Too many verification attempts. Please try again after an hour." },
    handler: makeHandler("emailVerificationLimiter"),
});

const resetPasswordLimiter = rateLimit({
    ...limiterDefaults,
    keyGenerator: keyGenToken,
    windowMs: 60 * 60 * 1000, //1 hour
    max: isDev ? 50 : 5,
    message: { success: false, message: "Too many reset attempts." },
    handler: makeHandler("resetPasswordLimiter"),
});

// for forgot password
const forgotPasswordLimiter = rateLimit({
    ...limiterDefaults,
    keyGenerator: keyGenEmail,
    windowMs: 60 * 60 * 1000, //1 hour
    max: isDev ? 50 : 5,
    message: { success: false, message: "Too many password reset attempts, please try again after an hour." },
    handler: makeHandler("forgotPasswordLimiter"),
});

module.exports = {
    signupLimiter,
    emailLoginLimiter,
    studentLoginLimiter,
    emailVerificationLimiter,
    resetPasswordLimiter,
    forgotPasswordLimiter,
};