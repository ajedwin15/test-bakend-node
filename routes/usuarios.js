const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario_model');
const Joi = require('joi');
const verificarToken = require('../middlewares/authorization');
const ruta = express.Router();


const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required()});

// GET

ruta.get('/',verificarToken, (req, res) => {
    let resultado = listarJUGADORES();
    resultado.then(usuario => {
        res.json(usuario)
    }).catch(err => {
        res.status(400).json(err);
    })
});

//POST
ruta.post('/', (req, res) => {
    let body = req.body;
    const {error, value}=schema.validate({name: body.name});
    if(!error){
        let resultado = crearJUGADOR(body);
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
    let resultado = actulizarJUGADOR(req.params.id, req.body);
    resultado.then(user => {
        res.json({ user})
    }).catch(err => {
        res.status(400).json(err)
    })
})
//DELETE
ruta.delete('/:id', (req, res) => {
    let resultado = eliminarJUGADOR(req.params.id, req.body);
    resultado.then(user => {
        res.json('usario eliminado')
    }).catch(err => {
        res.status(400).json(err)
    })
})

//PATCH
ruta.patch('/:id/active', (req, res) => {
    let resultado = activarJUGADOR(req.params.id, req.body);
    resultado.then(valor => {
        res.json({
            name : body.name,
            age : body.age,
            squad_number: body.squad_number,
            position: body.position,
            nationality: body.nationality,
            team: body.team,
            league: body.league,
            country: body.country,
            email: body.email,
        })
    }).catch(err => {
        res.status(400).json(err)
    })
})


// create player
async function crearJUGADOR(body){
    let usuario = new Usuario({
        name : body.name,
        age : body.age,
        squad_number: body.squad_number,
        position: body.position,
        nationality: body.nationality,
        team: body.team,
        league: body.league,
        country: body.country,
        email: body.email,
        password : bcrypt.hashSync(body.password, 10)
    });
    return await usuario.save();
}

//create player data
async function actulizarJUGADOR(id, body){
let usuario = await Usuario.findByIdAndUpdate(id, {
    $set: {
        name : body.name,
        age : body.age,
        squad_number: body.squad_number,
        position: body.position,
        nationality: body.nationality,
        team: body.team,
        league: body.league,
        country: body.country,
        email: body.email
    }
}, {new: true});
return usuario;
}

//delete player data
async function eliminarJUGADOR(id, body){
    let usuario = await Usuario.deleteOne({_id: id});
    }

//activate player
async function activarJUGADOR(id, body){
    let usuario = await Usuario.findByIdAndUpdate(id, {
        $set: {
            estado: true
        }
    }, {new: true});
    return usuario;
    }
//list of active players
async function listarJUGADORES(){
    let usuario = await Usuario.find({"estado": true})
    .select({ name:1, age:1, squad_number: 1, position: 1, nationality: 1, team: 1, league: 1 , country: 1 , email: 1,  estado:1 })
    return usuario;
    }


module.exports = ruta;

