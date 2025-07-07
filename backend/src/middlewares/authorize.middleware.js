// src/middlewares/authorize.middleware.js
const logger = require('../utils/logger');

const authorize = (requiredRole) => {
  return (req, res, next) => {
    // Simuler req.user à partir des en-têtes pour les tests cURL
    const userRole = req.headers['x-user-role'];
    const userId = req.headers['x-user-id'];

    // Si req.user est déjà défini (par exemple, par un middleware d'authentification futur), l'utiliser
    const user = req.user || (userRole ? { id_user: userId ? parseInt(userId, 10) : null, role: userRole } : null);

    if (!user) {
      logger.error('No user found in request or headers');
      return res.status(401).json({ error: 'Unauthorized: No user found' });
    }

    if (user.role !== requiredRole) {
      logger.error(`User role ${user.role} does not match required role ${requiredRole}`);
      return res.status(403).json({ error: 'Forbidden: Insufficient role' });
    }

    // S'assurer que req.user est défini pour les middlewares suivants
    req.user = user;
    next();
  };
};

module.exports = authorize;