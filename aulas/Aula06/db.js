// src/db.js
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../cartoongram.db'));

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    username  TEXT    NOT NULL UNIQUE,
    email     TEXT    NOT NULL UNIQUE,
    password  TEXT    NOT NULL,
    role      TEXT    NOT NULL DEFAULT 'user',
    criado_em TEXT    NOT NULL DEFAULT (datetime('now'))
  );
`);

const adminExiste = db.prepare("SELECT id FROM usuarios WHERE username = 'admin'").get();
if (!adminExiste) {
  db.prepare(`
    INSERT INTO usuarios (username, email, password, role) VALUES
      ('admin',  'admin@cartoongram.com',  'admin123',  'admin'),
      ('julia',  'julia@cartoongram.com',  'julia123',  'user'),
      ('marcos', 'marcos@cartoongram.com', 'marcos123', 'user')
  `).run();
  console.log('[DB] Usuários padrão criados.');
}

console.log('[DB] Banco inicializado.');
module.exports = db;
