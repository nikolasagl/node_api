const db = require('../config/database')

const UsuarioModel = {

   buscarUsuarioId: async (id) => {
      try {
         var user = await db('pessoa').where('codigo_pes', id).first()      
         
         if (user)
            return user
         else
            return false
      
      } catch (error) {
         return false
      }
   },

   buscaUsuarioCpf: async (cpf) => {
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

   buscaUsuarioCnpj: async (cnpj) => {
      try {
         var user = await db('pessoa').where('cnpj_pes', cnpj).first()
   
         return user
         
      } catch (error) {
         return false         
      }
   },

   logar: async (data) => {
      try {
         var user = await db('pessoa')
                           .where('cpf_pes', data.username)
                           .orWhere('cnpj_pes', data.username)
                           .whereIn('senha_pes', data.password)
                           .where('ativo_pes', 1)
                           .first()
         
         if (user) 
            return true
         else
            return false

      } catch (error) {
         return false
      }
   }
}

module.exports = UsuarioModel