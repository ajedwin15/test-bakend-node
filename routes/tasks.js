const express = require('express');
const ruta = express.Router();

ruta.get('/',(req, res) => {
    res.json('Listo Get de tasks');
});

module.exports = ruta;