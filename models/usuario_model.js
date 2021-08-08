const { number } = require('joi');
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    name:{

        type: String,
        require: true,
      
    },
    age:{
        type: Number,
        require: true
    },
    squad_number:{
        type: Number,
        require: false
    },
    position:{
        type: String,
        require: false
    },
    nationality: {
        type: String,
        require: false
    },
    team:{
        type: String,
        require: true
    },
    league:{
        type: String,
        require: true
    },
    country:{
        type: String,
        require: false
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Usuario', usuarioSchema);