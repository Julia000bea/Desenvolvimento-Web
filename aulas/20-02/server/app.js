const express = require("express");
const db = require('./database');
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const usuarioRoutes = require('./routes/UsuarioRoutes');
app.use(usuarioRoutes);

app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
