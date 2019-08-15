const db = require('../config/database')

module.exports = {

   async findUserByCpf(cpf) {
      try {
         var user = await db('pessoa').where('cpf_pes', cpf).first()

         if (user)
            return user
         else
            return false
         
      } catch (error) {
         return false
      }
   },

   async findUserByCnpj(cnpj) {
      try {
         var user = await db('pessoa').where('cnpj_pes', cnpj).first()
   
         return user
         
      } catch (error) {
         return false         
      }
   }

}