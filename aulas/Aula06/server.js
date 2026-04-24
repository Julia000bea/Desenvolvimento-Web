// server.js
const express  = require('express');
const session  = require('express-session');
const path     = require('path');
require('dotenv').config();

// Bootstrap do banco
require('./src/db');

// Rotas
const authRoutes      = require('./src/middlewares/adminMiddleware/routes/authRoutes');
const userRoutes      = require('./src/middlewares/adminMiddleware/routes/userRoutes');
const dashboardRoutes = require('./src/middlewares/adminMiddleware/routes/dashboardRoutes');

const app  = express();
const PORT = 3000;

// ── Middlewares globais ─────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, '..')));

// ── Sessão (MELHORADA) ──────────────────────────────────
app.use(session({
  name: 'cartoongram.sid', // nome do cookie

  secret: process.env.SESSION_SECRET || 'segredo-dev',

  resave: false,
  saveUninitialized: false,

  cookie: {
    secure: false,         // true só em HTTPS
    httpOnly: true,
    sameSite: 'lax',       // 🔥 importante pro frontend funcionar
    maxAge: 1000 * 60 * 60 * 2
  }
}));

// ── Rotas ───────────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/dashboard', dashboardRoutes);

// ── 404 ─────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

// ── Start ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 CartoonGram rodando em http://localhost:${PORT}`);
});