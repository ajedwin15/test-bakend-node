//Importing libraries
const usuarios = require('./routes/usuarios');
const authorization = require('./routes/authorization');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config')



//Connect to the BD
mongoose.connect(config.get('configDB.HOST'), {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log('Not connected to MongoDB', err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/usarios', usuarios);
app.use('/api/authorization', authorization)




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api Res g.m');
});
