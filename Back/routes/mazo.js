const express = require('express');
const router = express.Router();
const mazoController = require('../controllers/mazoController');
const AuthMiddleware = require('../middleware/auth');

router.post("/", AuthMiddleware, mazoController.generarMazo);
router.put("/retirar", AuthMiddleware, mazoController.retirarCartas);

module.exports = router;