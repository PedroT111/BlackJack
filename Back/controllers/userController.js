const db = require('../models/index.js');
const Usuario = db.models.Usuario;

const Register = async (req, res) => {
    try{
        const {usuario, password} = req.body;
        /*const findUsuario = await Usuario.findOne({where:{usuario: usuario}});
        if(findUsuario){
            return res.status(404).json({
                error: 'El usuario ya existe'
            });
        }*/
        const newUsuario = await Usuario.create({
            usuario: usuario,
            password: password
        });

        return res.status(200).json({
            usuario: newUsuario
        });
    }
    catch(err){
        console.log(err);
    }
}

module.exports= {Register}