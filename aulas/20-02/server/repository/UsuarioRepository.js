const db = require("../database");

function listAll(callback) {
    db.all(
        "SELECT * FROM usuário",
        [],
        callback
    );
}

function insert(texto, callback) {
    db.run(
        "INSERT INTO usuario (texto) VALUES (?)",
        [texto],
        callback
    );
}

module.exports = { listAll, insert };