
const validator = require('validator');

export default class Contact {
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

        const nome = this.form.querySelector('.nome')
        const email = this.form.querySelector('.email')
        const telefone = this.form.querySelector('.telefone')

        if (!nome.value) this.createError(nome, 'Nome inválido')
        if (email.value && !validator.isEmail(email.value)) this.createError(email, 'Email inválido')
        if (!email.value && !telefone.value) this.createError(email, 'Ao menos um meio de contato deve ser preenchido')
        if (!email.value && !telefone.value) this.createError(telefone, 'Ao menos um meio de contato deve ser preenchido')

    }

    createError(field, msg) {
        this.errors = true
        const errorMsg = document.createElement('p')
        errorMsg.innerHTML = msg
        errorMsg.setAttribute('class', 'colorErrorMsg')
        field.insertAdjacentElement('afterend', errorMsg)
    }
}
