// src/middlewares/adminMiddleware/routes/authRoutes.js
const express        = require('express');
const router         = express.Router();
const AuthController = require('../../../controller/AuthController');
const { authMiddleware } = require('../../auth');

router.post('/login',  AuthController.login);
router.get('/logout',  authMiddleware, AuthController.logout);
router.get('/me',      authMiddleware, AuthController.me);

module.exports = router;
