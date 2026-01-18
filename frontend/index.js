import 'core-js/stable'
import 'regenerator-runtime/runtime'

import './assets/css/style.css'


import Login from './assets/js/modules/login_fieldValidator'
try {
    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.querySelector('.loginForm')
        const objLogin = new Login(loginForm)
        objLogin.init()
    })
} catch (e) { console.log() }


import Register from './assets/js/modules/register_fieldValidator'
try {
    document.addEventListener('DOMContentLoaded', () => {
        const register = document.querySelector('.register')
        const objRegister = new Register(register)
        objRegister.init()

    })
} catch (e) { console.log() }


import Contact from './assets/js/modules/contact_fieldValidator'
try {
    document.addEventListener('DOMContentLoaded', () => {
        const contact = document.querySelector('.contact')
        const objContact = new Contact(contact)
        objContact.init()
    })
} catch (e) { console.log() }