const validator = require('validator');
const contatoSchema = require('../schema/mongo.contact.schema');

class Contato {
    constructor(body, email) {
        this.body = body
        this.userEmail = email
        this.errors = []
        this.contato = null
    }

    async register() {
        this.valida()

        if (this.errors.length > 0) return

        this.contato = await contatoSchema.create(this.body)
    }


    valida() {
        this.cleanUp()

        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido')
        if (!this.body.nome) this.errors.push('O campo "Nome" é obrigatório')
        if (!this.body.email && !this.body.telefone) this.errors.push('Ao menos uma das informações de contato precisa ser preenchida.')

    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
            emailUsuario: this.userEmail
        }
    }

    static async findContactByID(id) {
        if (typeof id !== 'string') return
        const user = await contatoSchema.findById(id)
        return user
    }

    async edit(id) {
        if (typeof id !== 'string') return
        this.valida()
        if (this.errors.length > 0) return
        this.contato = await contatoSchema.findByIdAndUpdate(id, this.body, { new: true })
    }


    static async findContact(id, email) {
        const user = await contatoSchema.find({ emailUsuario: email }).sort({ dataCriacao: 1 })
        return user
    }

    static async delete(id) {
        if (typeof id !== 'string') return
        const user = await contatoSchema.findOneAndDelete({ _id: id })
        return user
    }
}

module.exports = Contato