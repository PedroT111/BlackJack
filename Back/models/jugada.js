const usuario = require("./usuario");

module.exports = (sequelize, DataTypes)=> {
    const Jugada = sequelize.define('Jugada', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        puntajeCroupier: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        puntajeUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        freezeTableName: true
    });

    return Jugada;
}