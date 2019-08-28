const db = require('../config/database')

const ResgateModel = {

   buscaResgates: async (codigo_subs) => {
      try {
         var resgates = await db('resgate').where('codigo_subs', codigo_subs).where('ativo_resg', 1)

         if (resgates.length > 0)
            return resgates
         else
            return false

      } catch (error) {
         return false
      }
   },

   buscaResgateSolicitado: async (codigo_subs) => {
      try {
         var resgates = await db('resgate').where('codigo_subs', codigo_subs).where('ativo_resg', 1).where('tipo_resg', 1)
         
         if (resgates.length > 0)
            return resgates
         else
            return false

      } catch (error) {
         return false
      }
   },

   buscaResgateCupom: async (codigo_subs) => {
      try {
         var resgates = await db('resgate').where('codigo_subs', codigo_subs).where('ativo_resg', 1).where('tipo_resg', 0)

         if (resgates.length > 0)
            return resgates
         else
            return false

      } catch (error) {
         return false
      }
   },
}

module.exports = ResgateModel