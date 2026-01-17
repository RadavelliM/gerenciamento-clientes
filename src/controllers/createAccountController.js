const createAccount = require('../models/createAccountModel')

exports.createAccount = (req, res) => {
    res.render('createAccount')
}

exports.registerAccount = async (req, res) => {
    try {
        const CREATEACCOUNT = new createAccount(req.body)
        await CREATEACCOUNT.register()

        if (CREATEACCOUNT.errors.length > 0) {
            req.flash('errors', CREATEACCOUNT.errors)
            req.session.save(function () {
                return res.redirect('/createAccount')
            })
            return
        }

        req.flash('success', 'Usuário criado com sucesso!')
        req.session.save(function () {
            return res.redirect('/createAccount')
        })
    }
    catch (e) {
        console.log('apresentando erro ->', e)
        return res.render('404')
    }
}