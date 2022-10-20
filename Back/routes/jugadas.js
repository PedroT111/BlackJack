const express = require("express");
const router = express.Router();
const jugadaController = require("../controllers/jugadaController");
const AuthMiddleware = require("../middleware/auth");

router.get("/ultima/:id", AuthMiddleware, jugadaController.UltimaJugadaDelUsuario);
router.post("/nueva", AuthMiddleware, jugadaController.nuevaJugada);
router.put("/actualizar", AuthMiddleware, jugadaController.actualizarJugada);

module.exports = router;