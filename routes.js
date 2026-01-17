const express = require('express');
const routes = express.Router()

const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const createAccount = require('./src/controllers/createAccountController')
const contatoController = require('./src/controllers/contatoController')

const { loginRequired } = require('./src/middlewares/middleware')

// rota da home
routes.get('/', homeController.home)


// rota de login
routes.get('/login', loginController.login)
routes.post('/login/register', loginController.register)
routes.get('/login/logout', loginController.logout)


// rota de cadastro de usuarios
routes.get('/createAccount', createAccount.createAccount)
routes.post('/createAccount/register', createAccount.registerAccount)


// rota de cadastro de contatos
routes.get('/contato', loginRequired, contatoController.read)
routes.post('/contato/register', loginRequired, contatoController.register)
routes.get('/contato/edit/:id', loginRequired, contatoController.editIndex)
routes.post('/contato/edit/:id', loginRequired, contatoController.editContact)
routes.get('/contato/delete/:id', loginRequired, contatoController.delete)

module.exports = routes