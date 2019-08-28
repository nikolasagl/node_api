const db = require('../config/database')
const moment = require('moment')

const SubscricaoModel = {

   buscaSubscricao: async (id) => {
      try {
         var subs = await db.select('*')
                           .from('pessoa')
                           .innerJoin('subscricao', 'subscricao.codigo_pes', 'pessoa.codigo_pes')
                           .where('ativo_pes', true)
                           .where('ativo_subs', true)
                           .where('pendente_subs', false)
                           .where('pessoa.codigo_pes', id)

         if (subs.length > 0)
            return subs
         else
            return false

      } catch (error) {
         return error
      }
   },

   buscaSubsCalculado: async (id) => {
      try {
         var subs = await db('subscricao_calculado')
                           .sum('total_liquito as totalLiquido')
                           .sum('total_bruto as totalBruto')
                           .sum('total_rend_liquido as totalRendLiquido')
                           .sum('total_rend_bruto as totalRendBruto')
                           .innerJoin('subscricao', 'subscricao.codigo_subs', 'subscricao_calculado.codigo_subs')
                           .innerJoin('pessoa', 'pessoa.codigo_pes', 'subscricao.codigo_pes')
                           .where('subscricao.ativo_subs', true)
                           .where('pessoa.ativo_pes', true)
                           .where('subscricao.pendente_subs', false)
                           .where('pessoa.codigo_pes', id)
                           .first()

         if (subs)
            return subs
         else
            return false

      } catch (error) {
         return error
      }
   },
}

module.exports = SubscricaoModel