// src/controller/UserController.js
const UserService = require('../service/UserService');

const UserController = {

  listar(req, res) {
    try {
      return res.status(200).json({ usuarios: UserService.listarTodos() });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  buscar(req, res) {
    try {
      return res.status(200).json({ usuario: UserService.buscarPorId(req.params.id) });
    } catch (err) {
      return res.status(404).json({ erro: err.message });
    }
  },

  criar(req, res) {
    const { username, email, password, role } = req.body;
    const rolePermitido = req.session.usuario.role === 'admin' ? (role || 'user') : 'user';
    try {
      const novo = UserService.criar({ username, email, password, role: rolePermitido });
      return res.status(201).json({ mensagem: 'Usuário criado com sucesso.', usuario: novo });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  },

  remover(req, res) {
    try {
      UserService.remover(req.params.id, req.session.usuario);
      return res.status(200).json({ mensagem: 'Usuário removido com sucesso.' });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  }

};

module.exports = UserController;
