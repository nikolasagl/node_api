const axios = require('axios')
const qs = require('qs')

// param options = object contendo url e method da requisição
// param data = object com os dados a serem transmitidos na requisição
// return object com resposta do servidor ou erro gerado pelo axios

module.exports = {

    phpServerRequest: (options, data) => {

        options.data = qs.stringify(data)

        return axios(options).then((response) => {
            return response.data
        }).catch((error) => {
            return error
        })
    }
}
