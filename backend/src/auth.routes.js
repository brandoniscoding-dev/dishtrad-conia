const express = require('express');
const router = express.Router();
const { registerUser, loginUser, refreshToken, logoutUser } = require('./controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { registerUserSchema, loginUserSchema } = require('./utils/validators');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/register', validate(registerUserSchema), registerUser);
router.post('/login', validate(loginUserSchema), loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', authenticate, logoutUser);

module.exports = router;