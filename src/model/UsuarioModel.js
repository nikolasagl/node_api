const db = require('../config/database')

const UsuarioModel = {

   buscaTodos: async () => {
      try {
         var usuarios = await db('pessoa')      
         
         if (usuarios)
            return usuarios
         else
            return false
      
      } catch (error) {
         return false
      }
   },

   buscaUsuarioId: async (id) => {
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
                           .whereIn('senha_pes', data.password)
                           .where('cpf_pes', data.username)
                           .orWhere('cnpj_pes', data.username)
                           .where('ativo_pes', 1)
                           .first()
         
         if (user) 
            return true
         else
            return false

      } catch (error) {
         return false
      }
   },

   buscaUsuarioComEndereco: async (id) => {
      try {
         const usuario = await db('pessoa').where('codigo_pes', id).first()
         
         if (usuario) {
            const cidade = await db('cidades').where('codigo_cid', usuario.codigo_cid).first()
            const estado = await db('estados').where('codigo_est', cidade.codigo_est).first()
            
            usuario.cidade_pes = cidade
            usuario.estado_pes = estado
            console.log(usuario)

            return usuario

         } else {
            return false
         }
      
      } catch (error) {
         return false
      }
   }
}

module.exports = UsuarioModel