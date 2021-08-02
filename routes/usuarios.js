const { json } = require('express');
const express = require('express');
const Usuario = require('../models/usuario_model');
const ruta = express.Router();



ruta.get('/',(req, res) => {
    res.json('Listo Get de Usarios');
});

ruta.post('/', (req, res) => {
    let body = req.body;
    let resultado = crearUsuario(body);
    
    resultado.then( user => {
        res.json({
            valor: user
        })
    }).catch( err => {
        res.status(400).json({
            eror: err
        })
    });
});

ruta.put('/:id', (req, res) => {
    let resultado = actulizarUsuario(req.params.id, req.body);
    resultado.then(user => {
        res.json(user)
    }).catch(err => {
        res.status(400)-json(err)
    })
})


async function crearUsuario(body){
    let usuario = new Usuario({
        email : body.email,
        nombre : body.nombre,
        password : body.password
    });
    return await usuario.save();
}

async function actulizarUsuario(id, body){
let usuario = await Usuario.findByIdAndUpdate(id, {
    $set: {
        email : body.email,
        nombre : body.nombre,
        password : body.password
    }
}, {new: true});
return usuario;
}
module.exports = ruta;