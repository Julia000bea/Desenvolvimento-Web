// src/repository/UserRepository.js
const db = require('../db');

const UserRepository = {

  findAll() {
    return db.prepare('SELECT id, username, email, role, criado_em FROM usuarios').all();
  },

  findById(id) {
    return db.prepare('SELECT id, username, email, role, criado_em FROM usuarios WHERE id = ?').get(id);
  },

  findByUsername(username) {
    return db.prepare('SELECT * FROM usuarios WHERE username = ?').get(username);
  },

  findByEmail(email) {
    return db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
  },

  create({ username, email, password, role = 'user' }) {
    const result = db.prepare(
      'INSERT INTO usuarios (username, email, password, role) VALUES (?, ?, ?, ?)'
    ).run(username, email, password, role);
    return { id: result.lastInsertRowid, username, email, role };
  },

  deleteById(id) {
    const result = db.prepare('DELETE FROM usuarios WHERE id = ?').run(id);
    return result.changes > 0;
  },

  usernameExists(username) {
    return !!db.prepare('SELECT id FROM usuarios WHERE username = ?').get(username);
  },

  emailExists(email) {
    return !!db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email);
  }

};

module.exports = UserRepository;
