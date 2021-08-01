//Importando expres y mongoose
const usuarios = require('./routes/usuarios');
const express = require('express');
const mongoose = require('mongoose');

//conectarnos a la BD
mongoose.connect('mongodb://localhost:27017/curisos', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('conectado a MongoDB'))
    .catch(err => console.log('No se logro conectar con MongoDB', err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/usarios', usuarios);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api Res LA');
});