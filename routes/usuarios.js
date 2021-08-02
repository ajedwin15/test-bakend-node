const { json } = require('express');
const express = require('express');
const Usuario = require('../models/usuario_model');
const ruta = express.Router();


// GET
ruta.get('/',(req, res) => {
    res.json('Listo Get de Usarios');
});

//POST
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

//PUT
ruta.put('/:id', (req, res) => {
    let resultado = actulizarUsuario(req.params.id, req.body);
    resultado.then(user => {
        res.json(user)
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
    resultado.then(user => {
        res.json(user)
    }).catch(err => {
        res.status(400).json(err)
    })
})


// crear usario
async function crearUsuario(body){
    let usuario = new Usuario({
        email : body.email,
        nombre : body.nombre,
        password : body.password
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


module.exports = ruta;

