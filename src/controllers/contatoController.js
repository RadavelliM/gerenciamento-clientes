const contatoModel = require('../models/ContatoModel');

exports.read = (req, res) => {
     res.render('contato', {
          contato: {}
     })
}

exports.register = async (req, res) => {
     try {
          const CONTATO = new contatoModel(req.body)
          await CONTATO.register()

          if (CONTATO.errors.length > 0) {
               req.flash('errors', CONTATO.errors)
               req.session.save(() => res.redirect('/contato'))
               return
          }

          req.flash('success', `Contato "${CONTATO.contato.nome}" cadastrado com sucesso!`)
          req.session.save(() => res.redirect(`/contato/edit/${CONTATO.contato.id}`))
          return
     }
     catch (e) {
          console.log('apresentando erro na criacao contato ->', e)
          return res.render('404')
     }
}

exports.editIndex = async (req, res) => {
     if (!req.params.id) return res.render('404')

     const contato = await contatoModel.findContactByID(req.params.id)
     if (!contato) return res.render('404')
     return res.render('contato', {
          contato
     })
}

exports.editContact = async (req, res) => {
     try {
          if (!req.params.id) return res.render('404')

          const CONTATO = new contatoModel(req.body)
          await CONTATO.edit(req.params.id)

          if (CONTATO.errors.length > 0) {
               req.flash('errors', CONTATO.errors)
               req.session.save(() => res.redirect('/contato'))
               return
          }

          req.flash('success', `Contato "${CONTATO.contato.nome}" atualizado com sucesso!`)
          req.session.save(() => res.redirect(`/contato/edit/${CONTATO.contato.id}`))
          return
     }
     catch (e) {
          console.log('apresentando erro no edit de contatos ->', e)
          return res.render('404')
     }
}

exports.delete = async (req, res) => {
     try {
          if (!req.params.id) return res.render('404')

          const contato = await contatoModel.delete(req.params.id)
          if (!contato) return res.render('404')

          req.flash('success', `Contato "${contato.nome}" excluído com sucesso!`)
          req.session.save(() => res.redirect('/'))
     }
     catch (e) {
          console.log('apresentando erro no edit de contatos ->', e)
          return res.render('404')
     }
}