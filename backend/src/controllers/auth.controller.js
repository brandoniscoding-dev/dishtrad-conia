const authService = require('../services/auth.service');

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body.email, req.body.password);
    res.json({
      id_user: user.id_user,
      username: user.username,
      email: user.email,
      role: user.role,
      country: user.country || null,
      birthdate: user.birthdate || null,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      id_user: user.id_user,
      username: user.username,
      email: user.email,
      role: user.role,
      country: user.country || null,
      birthdate: user.birthdate || null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};