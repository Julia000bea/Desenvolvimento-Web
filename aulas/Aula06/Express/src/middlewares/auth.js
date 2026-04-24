// src/middlewares/auth.js
function authMiddleware(req, res, next) {
  if (!req.session || !req.session.usuario) {
    return res.status(401).json({ erro: 'Não autorizado. Faça login primeiro.' });
  }
  next();
}

function adminMiddleware(req, res, next) {
  if (!req.session.usuario || req.session.usuario.role !== 'admin') {
    return res.status(403).json({ erro: 'Acesso negado. Apenas administradores.' });
  }
  next();
}

module.exports = { authMiddleware, adminMiddleware };
