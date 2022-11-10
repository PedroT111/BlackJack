const db = require("../models/index.js");
var sequelize = require("../config/configBD");
const Usuario = db.models.Usuario;
const Jugada = db.models.Jugada;

//Cantidad de jugadas ganadas, perdidas y empatadas
const reporte1 = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    console.log(idUsuario);
    if (idUsuario === null) {
      res.status(501).send("Debe haber un parámetro id");
    } else {
      const totalJugadas = await Jugada.count({
        where: { UsuarioId: idUsuario },
      });
      const gano = await Jugada.count({
        where: { UsuarioId: idUsuario, resultado: 1 },
      });
      const perdio = await Jugada.count({
        where: { UsuarioId: idUsuario, resultado: -1 },
      });
      const empato = await Jugada.count({
        where: { UsuarioId: idUsuario, resultado: 0 },
      });

      res.status(200).json({
        gano,
        perdio,
        empato,
        totalJugadas,
      });
    }
  } catch (error) {
    res.status(501).send({ Error: error.message });
  }
};

const reporte2 = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    console.log(idUsuario);
    if (idUsuario === null) {
      res.status(501).send("Debe haber un parámetro id");
    } else {
      const totalJugadasGanadas = await Jugada.count({
        where: { UsuarioId: idUsuario, resultado: 1 },
      });
      const blackjack = await Jugada.count({
        where: { UsuarioId: idUsuario, blackjack: 1, resultado: 1 },
      });
      const ganoSinBj = await Jugada.count({
        where: { UsuarioId: idUsuario, blackjack: 0, resultado: 1 },
      });
      const porcBlackjack = (blackjack / totalJugadasGanadas) * 100;
      const porcSinBj = (ganoSinBj / totalJugadasGanadas) * 100;
      res.status(200).json({
        porcBlackjack,
        porcSinBj,
      });
    }
  } catch (error) {
    res.status(501).send({ Error: error.message });
  }
};
const reporte3 = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    if (idUsuario === null) {
      res.status(501).send("Debe haber un parámetro id");
    } else {
      const jugadas = await Jugada.count({
        where: { UsuarioId: idUsuario },
        attributes: [
          [
            db.sequelize.fn("weekday", db.sequelize.col("createdAt")),
            "weekday",
          ],
        ],
        order: [["weekday"]],
        group: ["weekday"],
      });
      res.status(200).json({ jugadas: jugadas });
    }
  } catch (error) {
    res.status(501).send({ Error: error.message });
  }
};

module.exports = { reporte1, reporte2, reporte3 };
