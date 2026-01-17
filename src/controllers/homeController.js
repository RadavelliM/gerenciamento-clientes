const contato = require('../models/ContatoModel')

exports.home = async (req, res) => {
    const contatos = await contato.findContact(req.params.id)
    return res.render('index', { contatos })
}