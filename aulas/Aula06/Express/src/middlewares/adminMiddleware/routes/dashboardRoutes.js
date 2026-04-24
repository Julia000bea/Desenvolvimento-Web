// src/middlewares/adminMiddleware/routes/dashboardRoutes.js
const express  = require('express');
const router   = express.Router();
const { authMiddleware, adminMiddleware } = require('../../auth');

// Área comum — qualquer usuário logado
router.get('/', authMiddleware, (req, res) => {
  const u = req.session.usuario;
  res.status(200).json({ mensagem: `Bem-vindo ao dashboard, ${u.username}!`, usuario: u });
});

// Área exclusiva de admin
router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({
    mensagem: '🔐 Área administrativa — acesso exclusivo para admins.',
    usuario: req.session.usuario
  });
});

module.exports = router;
