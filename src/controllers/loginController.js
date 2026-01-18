const login = require('../models/loginModel')

exports.login = (req, res) => {
    if (req.session.user) return res.render('logado')
    return res.render('login')
}

exports.register = async (req, res) => {
    try {
        const LOGIN = new login(req.body)
        await LOGIN.login()

        if (LOGIN.errors.length > 0) {
            req.flash('errors', LOGIN.errors)
            req.session.save(function () {
                return res.redirect('/login')
            })
            return
        }

        req.flash('success', 'Logado com sucesso')
        req.session.user = LOGIN.user
        req.session.emailUser = LOGIN.user.email
        req.session.save(function () {
            return res.redirect('/login')
        })
    }
    catch (e) {
        console.log('apresentando erro ->', e)
        return res.render('404')
    }
}


exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}