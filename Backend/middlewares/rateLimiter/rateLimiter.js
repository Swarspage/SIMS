const rateLimit = require("express-rate-limit");

const keyGen = (req) => {
    if (req.user?.id) return req.user.id.toString();
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';
    return ip.startsWith('::ffff:') ? ip.slice(7) : ip;
};

const makeHandler = (limitName) => (req, res, next, options) => {
    console.warn(
        `[RATE LIMIT] ${limitName} exceeded | user: ${req.user?.id || "unauthenticated"} | IP: ${req.ip} | path: ${req.path}`
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
};

const generalLimiter = rateLimit({
    ...limiterDefaults,  // spread here
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { success: false, message: "Too many requests, please try again later." },
    handler: makeHandler("generalLimiter"),
});

const readLimiter = rateLimit({
    ...limiterDefaults,
    windowMs: 15 * 60 * 1000,
    max: 150,
    message: { success: false, message: "Too many requests, please slow down." },
    handler: makeHandler("readLimiter"),
});

const writeLimiter = rateLimit({
    ...limiterDefaults,
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: { success: false, message: "Too many write requests, please try again later." },
    handler: makeHandler("writeLimiter"),
});

const uploadLimiter = rateLimit({
    ...limiterDefaults,
    windowMs: 60 * 60 * 1000,
    max: 15,
    message: { success: false, message: "Too many upload requests, please try again after an hour." },
    handler: makeHandler("uploadLimiter"),
});

const exportLimiter = rateLimit({
    ...limiterDefaults,
    windowMs: 60 * 60 * 1000,
    max: 15,
    message: { success: false, message: "Too many export requests, please try again after an hour." },
    handler: makeHandler("exportLimiter"),
});

module.exports = {
    generalLimiter,
    readLimiter,
    writeLimiter,
    uploadLimiter,
    exportLimiter,
};