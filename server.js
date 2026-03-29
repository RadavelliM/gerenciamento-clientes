const path = require('path');

const dotenv = require('dotenv').config({
    path: path.resolve(__dirname, '.env')
});

const express = require('express');
const app = express()

const mongoose = require('mongoose');
const session = require('express-session')
const mongoStore = require('connect-mongo')
const flash = require('connect-flash')


const { middlewareGlobal, checkCSRF, csrfMiddleware } = require('./src/middlewares/middleware')
const routes = require('./routes');



mongoose.connect(process.env.DB_URL_CONN)
    .then(() => {
        console.log('conectado')
        app.emit('signal')
    })
    .catch((e) => { console.log('erro na conexao: ', e) })

const sessionOptions = session({
    secret: process.env.SECRET_KEY,
    store: mongoStore.MongoStore.create({ mongoUrl: process.env.DB_URL_CONN }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})


app.use(sessionOptions)
app.use(flash())


app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())


app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')



const helmet = require('helmet');
app.use(helmet())

const csurf = require('csurf');
app.use(csurf())


app.use(middlewareGlobal)
app.use(checkCSRF)
app.use(csrfMiddleware)
app.use(routes)



app.on('signal', () => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000')
        console.log('Acessar no endereco http://localhost:3000')
    })
})

// fetch('http:34.95.180.16/api/aluno').then(res => res.json()).then(res => console.log(res))