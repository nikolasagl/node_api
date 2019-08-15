const { generateToken } = require('../helpers/AuthHelper')
const { atou, md5 } = require('../helpers/AuthHelper')
const { findUserByCpf, findUserByCnpj } = require('../services/UserService')

function _tryPass(partial, response, co, i) {
   if (i == ((partial.length) - 1)) {
      response.push([md5(co+partial[i][0])])
      response.push([md5(co+partial[i][1])])
      response.push([md5(co+partial[i][2])])
   } else {
      _tryPass(partial, response, co+partial[i][0], i+1)
      _tryPass(partial, response, co+partial[i][1], i+1)
      _tryPass(partial, response, co+partial[i][2], i+1)
   }
   return response
}

module.exports = {

   async login(req, res) {
      try {
         const input = req.body

         if (input.radio === 1) {
            var user = findUserByCpf(input.username)
         } else if (input.radio === 2) {
            var user = findUserByCnpj(input.username)
         }

         user.then(result => {
            if (!result)
               return res.json({error: 'Usuário não encontrado!'})
         })

         var arrayPass = input.password.split('fQ==')
         var partial = []
         
         arrayPass.forEach(element => {
            
            var button = []
            var num = atou(element).substr(1).split(',')
            
            num.forEach(value => {
               button.push([value])
            })
            partial.push(button)
         })
         
         partial.pop()
         
         var response = _tryPass(partial, [], '', 0)

         const data = {
            username: input.username,
            password: response
         }

         // Aqui metodos de autenticaçao e verificaçao de password

         // user.token = generateToken(user)
         user.senha_pes = undefined

         return res.json({ user })

      } catch (error) {
         console.log(error)
         return res.json({ error: "Autenticação do usuário falhou. Tente novamente mais tarde." })
      }
   },

   async recoverPassword(req, res) {
      try {
         const data = req.body

         if (data.radio === 1) {
            var user = await db('pessoa').where('cpf_pes', data.username).first()
         } else if (data.radio === 2) {
            var user = await db('pessoa').where('cnpj_pes', data.username).first()
         }

         if (!user)
            return res.status(400).json({ error: "User not found!" })

         // Aqui logica para envio de email e geraçao de senha provisoria

         return res.json({
            email: user.email_pes
         })

      } catch (error) {
         return res.status(400).json({ error: "Recover password failed! Try again later. Error: " + error })
      }
   }
}