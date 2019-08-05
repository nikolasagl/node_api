const db = require('../config/database')
const { generateToken } = require('../helpers/AuthHelper')

module.exports = {
   async login(req, res) {
      try {
         const data = req.body

         if (data.radio === 1) {
            var user = await db('pessoa').where('cpf_pes', data.username).first()
         } else if (data.radio === 2) {
            var user = await db('pessoa').where('cnpj_pes', data.username).first()
         }

         if (!user)
            return res.status(400).json({ error: "User not found!" })

         // Aqui metodos de autenticaçao e verificaçao de password

         user.token = generateToken(user)
         user.senha_pes = undefined

         return res.json({
            user
         })

      } catch (error) {
         return res.status(400).json({ error: "User authentication failed! Try again later. Error: " + error })
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