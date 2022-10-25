const express = require("express");
const router = express.Router();
const jugadaController = require("../controllers/jugadaController");
const AuthMiddleware = require("../middleware/auth");
const jugada = require("../models/jugada");

router.get("/ultima/:idUsuario", jugadaController.consultarUltimaJugada);
router.post("/nueva", AuthMiddleware, jugadaController.nuevaJugada);
router.put("/actualizar", jugadaController.procesarJugada);

module.exports = router;