// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { loginSchema, userSchema } = require('../utils/validators');

router.post('/login', validate(loginSchema), authController.login);
router.post('/register', validate(userSchema), authController.register);

module.exports = router;


