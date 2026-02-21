const express = require("express");
const app = express();

app.use(express.json());

// "banco" em memória
const usuarios = [];
let proximoId = 1;

// util: achar usuário pelo id
function acharUsuarioIndex(id) {
    return usuarios.findIndex((u) => u.id === id);
}

// 1) GET /usuarios
app.get("/usuarios", (req, res) => {
    return res.json(usuarios);
});

// 2) POST /usuarios
app.post("/usuarios", (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: "nome e email são obrigatórios" });
    }

    if (typeof nome !== "string" || typeof email !== "string") {
        return res.status(400).json({ erro: "nome e email devem ser texto" });
    }

    const novoUsuario = {
        id: proximoId++,
        nome: nome.trim(),
        email: email.trim(),
    };

    usuarios.push(novoUsuario);

    return res.status(201).json(novoUsuario);
});

// 3) PUT /usuarios/:id
app.put("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ erro: "id inválido" });
    }

    const index = acharUsuarioIndex(id);
    if (index === -1) {
        return res.status(404).json({ erro: "usuário não encontrado" });
    }

    const { nome, email } = req.body;

    // PUT normalmente exige o recurso completo
    if (!nome || !email) {
        return res.status(400).json({ erro: "PUT exige nome e email" });
    }

    if (typeof nome !== "string" || typeof email !== "string") {
        return res.status(400).json({ erro: "nome e email devem ser texto" });
    }

    const usuarioAtualizado = {
        id, // mantém o mesmo id
        nome: nome.trim(),
        email: email.trim(),
    };

    usuarios[index] = usuarioAtualizado;

    return res.json(usuarioAtualizado);
});

// 4) PATCH /usuarios/:id
app.patch("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ erro: "id inválido" });
    }

    const index = acharUsuarioIndex(id);
    if (index === -1) {
        return res.status(404).json({ erro: "usuário não encontrado" });
    }

    const { nome, email } = req.body;

    // PATCH aceita atualizar um ou outro (ou ambos),
    // mas precisa ter pelo menos 1 campo válido
    if (nome === undefined && email === undefined) {
        return res.status(400).json({ erro: "envie nome e/ou email para atualizar" });
    }

    if (nome !== undefined && typeof nome !== "string") {
        return res.status(400).json({ erro: "nome deve ser texto" });
    }
    if (email !== undefined && typeof email !== "string") {
        return res.status(400).json({ erro: "email deve ser texto" });
    }

    const usuario = usuarios[index];

    if (nome !== undefined) usuario.nome = nome.trim();
    if (email !== undefined) usuario.email = email.trim();

    return res.json(usuario);
});

// 5) DELETE /usuarios/:id
app.delete("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ erro: "id inválido" });
    }

    const index = acharUsuarioIndex(id);
    if (index === -1) {
        return res.status(404).json({ erro: "usuário não encontrado" });
    }

    // remove 1 item
    const removido = usuarios.splice(index, 1)[0];

    // pode retornar 204 sem body, ou 200 com o removido
    return res.json({ removido });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});