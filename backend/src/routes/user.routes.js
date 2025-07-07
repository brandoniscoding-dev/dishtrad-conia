const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authorize = require('../middlewares/authorize.middleware');
const validate = require('../middlewares/validate.middleware');
const { userSchema } = require('../utils/validators');
const { User } = require('../models/user.model');

router.get('/', authorize('admin'), userController.getAllUsers);
router.get('/:id', authorize('admin'), userController.getUserById);
router.put('/:id', [authorize('admin'), validate(userSchema)], userController.updateUser);
router.delete('/:id', authorize('admin'), userController.deleteUser);

router.get('/me', async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'];

    if (!userId) {
      return res.status(401).json({ error: 'Non authentifié (ID utilisateur manquant)' });
    }

    const user = await User.findByPk(userId, {
      attributes: ['id_user', 'username', 'email', 'role', 'country', 'birthdate'],
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    if (userRole && userRole !== user.role) {
      return res.status(403).json({ error: 'Rôle non autorisé' });
    }

    res.json({
      id_user: user.id_user,
      username: user.username,
      email: user.email,
      role: user.role,
      country: user.country || null,
      birthdate: user.birthdate || null,
    });
  } catch (error) {
    console.error('Erreur dans /users/me :', error);
    next(error);
  }
});

module.exports = router;