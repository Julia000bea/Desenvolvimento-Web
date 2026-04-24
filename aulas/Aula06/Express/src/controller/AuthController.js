// src/controller/AuthController.js
const UserService = require('../service/UserService');

const AuthController = {

  login(req, res) {
    const { username, password } = req.body;
    try {
      const usuario = UserService.autenticar(username, password);
      req.session.usuario = usuario;
      return res.status(200).json({
        mensagem: `Bem-vindo, ${usuario.username}!`,
        usuario: { id: usuario.id, username: usuario.username, email: usuario.email, role: usuario.role }
      });
    } catch (err) {
      return res.status(401).json({ erro: err.message });
    }
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
    });
  },

  me(req, res) {
    if (!req.session.usuario) return res.status(401).json({ erro: 'Não autenticado.' });
    return res.status(200).json({ usuario: req.session.usuario });
  }

};

module.exports = AuthController;
