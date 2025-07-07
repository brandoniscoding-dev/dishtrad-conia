const jwt = require('jsonwebtoken');
const ENV = require('../config/env.config');

const generateAccessToken = (user) => {
  if (!user || !user.id || !user.role) {
    throw new Error('L\'objet utilisateur doit contenir un id et un rôle');
  }
  return jwt.sign(
    { id: user.id, role: user.role },
    ENV.jwtSecret,
    { expiresIn: '1d' } // Changé de '15m' à '1d' pour une durée de 24 heures
  );
};

const generateRefreshToken = (user) => {
  if (!user || !user.id) {
    throw new Error('L\'objet utilisateur doit contenir un id');
  }
  return jwt.sign(
    { id: user.id },
    ENV.jwtSecret,
    { expiresIn: '7d' }
  );
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, ENV.jwtSecret);
  } catch (error) {
    const err = new Error('Token de rafraîchissement invalide ou expiré');
    err.status = 401;
    throw err;
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken };