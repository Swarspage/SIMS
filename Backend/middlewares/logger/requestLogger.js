// middlewares/requestLogger.js
const logger = require("../../helpers/winston/logger");

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const log = {
      method: req.method,
      route: req.originalUrl,
      status: res.statusCode,
      ip: req.ip,
      userId: req.user?.id || "guest",
      role: req.user?.role || "guest",
      userAgent: req.headers["user-agent"],
      responseTime: `${Date.now() - start}ms`,
    };

    // 🔥 classify logs
    if (res.statusCode >= 500) {
      logger.error(log);
    } else if (res.statusCode >= 400) {
      logger.warn(log);
    } else {
      logger.info(log);
    }

    // 🚨 detect suspicious activity
    if (res.statusCode === 401 || res.statusCode === 403) {
      logger.warn({
        type: "SECURITY_ALERT",
        ip: req.ip,
        route: req.originalUrl,
        userId: req.user?.id || "guest",
      });
    }
  });

  next();
};

module.exports = requestLogger;