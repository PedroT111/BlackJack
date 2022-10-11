const express = require('express');
const app = express();
//const cors = require('');
const db = require('./models/index');
const dotenv = require('dotenv').config();
const routesUsuario = require('./routes/usuario');

app.use(express.json());



(async () => {
    await db.sequelize.sync();
})();

app.use('/usuarios', routesUsuario);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});