const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const loginModel = require('../schema/mongo.userLogin.schema')


class login {
    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null
    }

    async login() {
        this.cleanUp()
        
        this.user = await loginModel.findOne({
            email: this.body.email
        })

        if (!this.user) {
            this.errors.push('Usuário não existe')
            return
        }

        console.log(typeof this.body.password)
        console.log(typeof this.user.password)

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida')
            this.user = null
            return
        }

    }


    cleanUp() {
        // for (let key in this.body) {
        //     if (typeof this.body[key] !== 'string') {
        //         this.body[key] = ''
        //     }
        // }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

}

module.exports = login