const db = require('../models/index.js');
const Usuario = db.models.Usuario;
const Jugada = db.models.Jugada;

const postJugada = async (req, res) => { 
    try{
        const {puntajeCroupier, puntajeUsuario, UsuarioId, cartasCroupier, cartasUsuario} = req.body;
        const findUsuario = await Usuario.findOne({where:{id: UsuarioId }});
        if(!findUsuario){
            return res.status(404).json({
                error: 'El usuario noexiste'
            });
        }
        const nuevaJugada = await Jugada.create({
            puntajeCroupier: puntajeCroupier,
            puntajeUsuario: puntajeUsuario,
            UsuarioId: UsuarioId 
            //falta agregar las cartas de cada uno
        });

        return res.status(200).json({
            jugada: nuevaJugada
        });
    }
    catch(err){
        console.log(err);
    }
}

module.exports= {postJugada}