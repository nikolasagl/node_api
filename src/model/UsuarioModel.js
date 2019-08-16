const db = require('../config/database')

const UsuarioModel = {

   buscarTodos: async () => {
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
   },

   buscaSubscricao: async (id) => {
      try {
         var subs = await db('subscricao').where('codigo_pes', id).first()
         
         if (subs)
            return subs
         else
            return false
      
      } catch (error) {
         return false
      }
   },

   buscaSubsCalculado: async (codigo_subs) => {
      try {
         var subs = await db('subscricao_calculado').where('codigo_subs', codigo_subs).first()
         
         if (subs)
            return subs
         else
            return false
      
      } catch (error) {
         return false
      }
   },

   buscaResgates: async (codigo_subs) => {
      try {
         var resgates = await db('resgate').where('codigo_subs', codigo_subs).first()
         
         if (resgates)
            return resgates
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