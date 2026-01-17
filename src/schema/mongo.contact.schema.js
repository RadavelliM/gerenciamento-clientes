const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    telefone: {type: String, required: false, default: ''},
    dataCriado: {type: Date, default: Date.now()}
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

module.exports = ContatoModel