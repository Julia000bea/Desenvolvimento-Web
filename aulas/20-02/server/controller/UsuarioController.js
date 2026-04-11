const usuarioService = require("../service/UsuarioService");

function listAll(req, res) {
    usuarioService.listAll((err, dados) => {
        console.log(dados)
        res.json(dados);
    });
}

function insert(req, res) {
    const { texto } = req.body;
    usuarioService.insert(texto, (err) => {
        if (err) {
            res.status(500).json({ error: "Erro ao inserir usuario" });
        } else {
            res.status(201).json({ message: "Usuário inserida com sucesso" });
        }
    });
}

module.exports = { listAll, insert };