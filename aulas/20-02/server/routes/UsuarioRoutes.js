const express = require("express");

const router = express.Router();
const controller = require("../controller/UsuarioController");

router.get("/mensagem", controller.listAll);
router.post("/mensagem", controller.insert);


module.exports = router;