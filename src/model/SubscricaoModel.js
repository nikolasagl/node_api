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

   buscaSaldo: async (id) => {
      try {
         var saldo = await db('subscricao_calculado')
                           .sum('total_liquito as saldo')
                           .innerJoin('subscricao', 'subscricao.codigo_subs', 'subscricao_calculado.codigo_subs')
                           .innerJoin('pessoa', 'pessoa.codigo_pes', 'subscricao.codigo_pes')
                           .where('subscricao.ativo_subs', true)
                           .where('pessoa.ativo_pes', true)
                           .where('subscricao.pendente_subs', false)
                           .where('pessoa.codigo_pes', id)
                           .first()
         
         if (saldo)
            return saldo
         else
            return false

      } catch (error) {
         return error
      }
   },

   buscaSubscricaoOrderedByData: async (id) => {
      try {
         var subs = await db.raw(
            'SELECT subscricao.*, valor_subs, pessoa.*, '+
            '(select sum(valor_rend) from rendimento where rendimento.codigo_subs = subscricao.codigo_subs and ativo_rend = 1 as rendimento and data_rend <= contabiliza_subs, '+
            '(select sum(valor_rendbr) from rendimento_bruto where rendimento_bruto.codigo_subs = subscricao.codigo_subs and ativo_rendbr = 1 as rendimentobruto and data_rendbr <= contabiliza_subs, '+
            '(select max(seqdia_rendbr) from rendimento_bruto where rendimento_bruto.codigo_subs = subscricao.codigo_subs and ativo_rendbr = 1 as ultimodia and data_rendbr <= contabiliza_subs, '+
            '(select sum(valor_ir) from irenda where irenda.codigo_subs = subscricao.codigo_subs and ativo_ir = 1 as ir and data_ir <= contabiliza_subs,'+
            '(select sum(valor_resg) from resgate where resgate.codigo_subs = subscricao.codigo_subs and ativo_resg = 1 and dataresgatado_resg <= contabiliza_subs as resgate, contabiliza_subs as ultimo ')
            .from('pessoa')
            .innerJoin('subscricao', 'subscricao.codigo_pes', 'pessoa.codigo_pes')
            .where('ativo_pes', true)
            .where('ativo_subs', true)
            .where('pendente_subs', false)
            .where('pessoa.codigo_pes', id)
            .orderBy('subscricao.data_subs')

         if (subs.length > 0)
            return subs
         else
            return false

      } catch (error) {
         return error
      }
   }
}

module.exports = SubscricaoModel