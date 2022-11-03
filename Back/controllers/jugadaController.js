const db = require("../models/index.js");
const jugada = require("../models/jugada.js");
const { crearService } = require("../services/crear");
const { procesarService } = require("../services/procesar.js");
const { generarMazo } = require("../utils/mazo");
const { obtenerPuntos } = require("../utils/resultado");
const Usuario = db.models.Usuario;
const Jugada = db.models.Jugada;

const consultarUltimaJugada = async (req, res) => {
  try {
    const {idUsuario} = req.params;
    console.log(idUsuario)
    if (idUsuario === null) {
      res.status(501).send("Debe haber un parámetro id");
    } else {
      const jugada = await Jugada.findOne({ where: { UsuarioId: idUsuario, terminada: false } });
      res.status(200).send({ jugada });
    }
  } catch (error) {
    res.status(501).send({ Error: error.message });
  }
};

const nuevaJugada = async (req, res) => {
  try {
    const { UsuarioId, cantMazos } = req.body;

    const findUsuario = await Usuario.findOne({ where: { id: UsuarioId } });
    if (!findUsuario) {
      return res.status(404).json({
        error: "El usuario no existe",
      });
    }

    const mazo = generarMazo(cantMazos);

    const nuevaJugada = await Jugada.create({
      puntajeCroupier: 0,
      puntajeUsuario: 0,
      UsuarioId: UsuarioId,
      cartasCroupier: [],
      cartasUsuario: [],
      mazo: mazo,
      resultado: 0,
      terminada: false,
      blackjack: false
    });

    if (nuevaJugada) {
      return res.status(200).json({
        jugada: nuevaJugada,
      });
    }
  } catch (err) {
    console.log("Error: ", err.message);
  }
};

const procesarJugada = async (req, res) => {
  try {
    const { JugadaId, participante, cantCartas } = req.body;

    const jugadaProcesada = await procesarService(
      JugadaId,
      participante,
      cantCartas
    );

    console.log(jugadaProcesada)

    res.status(200).send(jugadaProcesada);
  } catch (error) {
    console.log(error.message);
  }
};

const terminarJugada = async (req, res) => {
  try{
    const {idJugada} = req.body;
    console.log(idJugada);
    const jugada = await Jugada.findOne({where: {id: idJugada}});
    if(jugada){
      await jugada.update({terminada: true});
      res.status(200).json(jugada);
    } else{
      return res.status(404).json({
        error: "La jugada no existe",
      });
    }    

  } catch (error) {
    console.log(error.message);
  }

}

module.exports = { nuevaJugada, procesarJugada, consultarUltimaJugada, terminarJugada };
