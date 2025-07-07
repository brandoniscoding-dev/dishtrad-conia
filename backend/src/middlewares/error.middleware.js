// src/middlewares/error.middleware.js
const logger = require('../utils/logger');

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  logger.error(`Error: ${message} - Path: ${req.path} - Method: ${req.method} - Stack: ${err.stack}`);
  res.status(status).json({
    error: message,
  });
};

module.exports = errorMiddleware;