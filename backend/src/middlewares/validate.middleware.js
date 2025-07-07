// src/middlewares/validate.middleware.js
const logger = require('../utils/logger');

const validate = (schema) => {
  return (req, res, next) => {
    if (!schema || typeof schema.validate !== 'function') {
      logger.error('Invalid schema provided to validate middleware');
      return res.status(500).json({ error: 'Internal server error: Invalid schema' });
    }
    const { error } = schema.validate(req.body);
    if (error) {
      logger.error(`Validation error: ${error.details[0].message}`);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = validate;