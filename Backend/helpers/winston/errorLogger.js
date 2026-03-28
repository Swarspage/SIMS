const logger = require("./logger");

const errorLogger = (err, req, context = "Unknown") => {
  logger.error({
    message: `Error in ${context}`,
    error: err.message,
    stack: err.stack,
    route: req?.originalUrl,
    method: req?.method,
    userId: req?.user?.id || "guest",
    ip: req?.ip,
  });
};

module.exports = errorLogger;