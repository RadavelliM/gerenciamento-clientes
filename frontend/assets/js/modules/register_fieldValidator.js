
const validator = require('validator');

export default class Register {
    constructor(loginForm) {
        this.form = loginForm
        this.errors = false
    }

    init() {
        this.events()
    }

    events() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate()
            if (!this.errors) this.form.submit()
        })
    }

    validate() {
        const colorErrorMsg = document.querySelectorAll('.colorErrorMsg').forEach(field => { field.remove() })

        const email = this.form.querySelector('.email')
        const password = this.form.querySelector('.password')
        const nome = this.form.querySelector('.nome')

        if (!nome.value) this.createError(nome, 'Nome inválido')
        if (!validator.isEmail(email.value)) this.createError(email, 'Email inválido')
        if (password.value.length < 3 || password.value.length > 30) this.createError(password, 'Senha precisa ter entre 3 e 30 caracteres')

    }

    createError(field, msg) {
        this.errors = true
        const errorMsg = document.createElement('p')
        errorMsg.innerHTML = msg
        errorMsg.setAttribute('class', 'colorErrorMsg')
        field.insertAdjacentElement('afterend', errorMsg)
    }
}
