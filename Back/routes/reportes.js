const express = require("express");
const router = express.Router();
const reporteController = require("../controllers/reporteController");
const AuthMiddleware = require("../middleware/auth");

router.get("/reporte1/:idUsuario", reporteController.reporte1);
router.get("/reporte2/:idUsuario", reporteController.reporte2);
router.get("/reporte3/:idUsuario", reporteController.reporte3);


module.exports = router;