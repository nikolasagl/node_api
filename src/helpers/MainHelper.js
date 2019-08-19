const axios = require('axios')

module.exports = {

    recuperarSenha: (options) => {

        axios(options).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log('error'+error)
        })
    }
}
