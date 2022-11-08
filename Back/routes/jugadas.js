const express = require("express");
const router = express.Router();
const jugadaController = require("../controllers/jugadaController");
const AuthMiddleware = require("../middleware/auth");
const jugada = require("../models/jugada");

router.get("/ultima/:idUsuario", AuthMiddleware, jugadaController.consultarUltimaJugada);
router.put("/terminar",AuthMiddleware, jugadaController.terminarJugada);
router.post("/nueva", AuthMiddleware, jugadaController.nuevaJugada);
router.put("/actualizar",AuthMiddleware, jugadaController.procesarJugada);

module.exports = router;