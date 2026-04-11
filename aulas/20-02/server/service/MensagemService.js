const usuarioRepository = require("../repository/UsuarioRepository");

function listAll(callback) {
    usuarioRepository.listAll(callback);
}

function insert(texto, callback) {
    if (!texto || typeof texto !== "string" || texto.trim() === "") {
        return callback(new Error("Texto inválido"));
    }
    usuarioRepository.insert(texto, callback);
}

module.exports = { listAll, insert };