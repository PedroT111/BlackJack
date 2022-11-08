const express = require("express");
const router = express.Router();
const reporteController = require("../controllers/reporteController");
const AuthMiddleware = require("../middleware/auth");

router.get("/reporte1/:idUsuario", AuthMiddleware, reporteController.reporte1);
router.get("/reporte2/:idUsuario",AuthMiddleware, reporteController.reporte2);
router.get("/reporte3/:idUsuario",AuthMiddleware, reporteController.reporte3);


module.exports = router;