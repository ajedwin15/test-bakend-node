const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario_model');
const Joi = require('joi');
const ruta = express.Router();


const schema = Joi.object({
    nombre: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required()});

// GET
ruta.get('/',(req, res) => {
    let resultado = listarUsario();
    resultado.then(usuario => {
        res.json(usuario)
    }).catch(err => {
        res.status(400).json(err);
    })
});

//POST
ruta.post('/', (req, res) => {
    let body = req.body;
    const {error, value}=schema.validate({nombre: body.nombre});
    if(!error){
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
    }else{
        res.status(400).json({
            error: error
        })
    }
});

//PUT
ruta.put('/:id', (req, res) => {
    let resultado = actulizarUsuario(req.params.id, req.body);
    resultado.then(user => {
        res.json({
            nombre: user.nombre,
            email: user.email,
            estado: user.estado
        })
    }).catch(err => {
        res.status(400).json(err)
    })
})
//DELETE
ruta.delete('/:id', (req, res) => {
    let resultado = eliminarUsario(req.params.id, req.body);
    resultado.then(user => {
        res.json('usario eliminado')
    }).catch(err => {
        res.status(400).json(err)
    })
})

//PATCH
ruta.patch('/:id/active', (req, res) => {
    let resultado = activarUsario(req.params.id, req.body);
    resultado.then(valor => {
        res.json({
            nombre: valor.nombre,
            email: valor.email,
            estado: valor.estado
        })
    }).catch(err => {
        res.status(400).json(err)
    })
})


// crear usario
async function crearUsuario(body){
    let usuario = new Usuario({
        email : body.email,
        nombre : body.nombre,
        password : bcrypt.hashSync(body.password, 10)
    });
    return await usuario.save();
}

//actualizar datos del usario
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

//Eliminar los datos de un usario
async function eliminarUsario(id, body){
    let usuario = await Usuario.deleteOne({_id: id});
    }

//Activar usario
async function activarUsario(id, body){
    let usuario = await Usuario.findByIdAndUpdate(id, {
        $set: {
            estado: true
        }
    }, {new: true});
    return usuario;
    }
//listarCursos activos
async function listarUsario(){
    let usuario = await Usuario.find({"estado": true})
    .select({nombre:1, email:1, estado:1})
    return usuario;
    }


module.exports = ruta;

