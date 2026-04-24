// src/service/UserService.js
const UserRepository = require('../repository/UserRepository');

const UserService = {

  autenticar(username, password) {
    if (!username || !password) throw new Error('Usuário e senha são obrigatórios.');
    const usuario = UserRepository.findByUsername(username);
    if (!usuario || usuario.password !== password) throw new Error('Credenciais inválidas.');
    const { password: _, ...semSenha } = usuario;
    return semSenha;
  },

  listarTodos() {
    return UserRepository.findAll();
  },

  buscarPorId(id) {
    const usuario = UserRepository.findById(id);
    if (!usuario) throw new Error('Usuário não encontrado.');
    return usuario;
  },

  criar({ username, email, password, role = 'user' }) {
    if (!username || !email || !password) throw new Error('Username, email e senha são obrigatórios.');
    if (username.length < 3)  throw new Error('Username deve ter pelo menos 3 caracteres.');
    if (password.length < 6)  throw new Error('Senha deve ter pelo menos 6 caracteres.');
    if (UserRepository.usernameExists(username)) throw new Error('Username já está em uso.');
    if (UserRepository.emailExists(email))       throw new Error('E-mail já está em uso.');
    return UserRepository.create({ username, email, password, role });
  },

  remover(idAlvo, usuarioLogado) {
    if (idAlvo == usuarioLogado.id) throw new Error('Você não pode remover sua própria conta.');
    const alvo = UserRepository.findById(idAlvo);
    if (!alvo) throw new Error('Usuário não encontrado.');
    if (alvo.role === 'admin' && usuarioLogado.role !== 'admin') throw new Error('Sem permissão.');
    const ok = UserRepository.deleteById(idAlvo);
    if (!ok) throw new Error('Falha ao remover usuário.');
    return true;
  }

};

module.exports = UserService;
