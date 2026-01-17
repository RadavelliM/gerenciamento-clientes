const validator = require('validator');
const bcryptjs = require('bcryptjs');
const createAccountModel = require('../schema/mongo.userLogin.schema')


class createAccount {
    constructor(body) {
        this.body = body
        this.email = body.email
        this.password = body.password
        this.errors = []
        this.user = null
    }

    async register() {
        this.valida()

        if (this.errors.length > 0) return

        await this.userExists()

        if (this.errors.length > 0) return

        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        this.user = await createAccountModel.create(this.body)
    }

    async userExists() {
        const userResponse = await createAccountModel.findOne({
            email: this.body.email
        })

        if (userResponse) this.errors.push('Usuário já cadastrado no sistema')
    }

    valida() {
        this.cleanUp()

        
        if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido')

        if (this.body.password.length < 3 || this.body.password.length > 30) this.errors.push('A senha precisa conter entre 3 a 30 caracteres')
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            nome: this.body.nome.toUpperCase(),
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = createAccount