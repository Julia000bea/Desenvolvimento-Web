// src/middlewares/adminMiddleware/routes/userRoutes.js
const express          = require('express');
const router           = express.Router();
const UserController   = require('../../../controller/UserController');
const { authMiddleware, adminMiddleware } = require('../../auth');

router.get('/',      authMiddleware, adminMiddleware, UserController.listar);
router.get('/:id',   authMiddleware, adminMiddleware, UserController.buscar);
router.post('/',     authMiddleware, adminMiddleware, UserController.criar);
router.delete('/:id',authMiddleware, adminMiddleware, UserController.remover);

module.exports = router;
