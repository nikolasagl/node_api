const db = require('../config/database')

const ExtratoModel = {

   buscaExtratoTotal: async (id) => {
      try {
         
         var dadosExtrato = await db.raw(
            'select subscricao.data_subs as data, '+
                  'sum(subscricao.valor_subs) as valor, '+
                  "'Valor Investimento' as tipo "+
            'from subscricao '+
            'where subscricao.codigo_pes = '+id+' and ativo_subs = 1 and pendente_subs = 0 '+
            'group by data '+
                        
            'UNION '+
		                  
            'select rendimento.data_rend as data, '+
                  'rendimento.valor_rend as valor, '+
                  "'Rendimento Diário' as tipo "+
            'from rendimento inner join subscricao on rendimento.codigo_subs = subscricao.codigo_subs '+
            'where subscricao.codigo_pes = '+id+' and pendente_subs = 0 and ativo_subs = 1 '+
            
            'UNION '+
            
            'select resgate.dataresgatado_resg as data, '+
                  '-sum(resgate.valor_resg) as valor, '+
                  "'Resgate' as tipo "+
            'from resgate inner join subscricao on resgate.codigo_subs = subscricao.codigo_subs '+
            'where subscricao.codigo_pes = '+id+' and tipo_resg = 1 and pendente_subs = 0 and ativo_subs = 1 and ativo_resg = 1 '+
            
            'UNION '+
            
            'select resgate.dataresgatado_resg as data, '+
                  '-sum(resgate.valor_resg) as valor, '+
                  "'Cupom Mensal' as tipo "+
            'from resgate inner join subscricao on resgate.codigo_subs = subscricao.codigo_subs '+
            'where subscricao.codigo_pes = '+id+' and tipo_resg = 0 and pendente_subs = 0 and ativo_subs = 1 and ativo_resg = 1 '+
            'ORDER BY data asc, '+
            
            "CASE WHEN tipo = 'Resgate' THEN '1' "+
               "WHEN tipo = 'Rendimento Diário' THEN '2' "+
               "WHEN tipo = 'Cupom Mensal' THEN '3' "+
               "WHEN tipo = 'Valor Investimento' THEN '4' END;"
         )
         
         if (dadosExtrato)
            return dadosExtrato
         else
            return false

      } catch (error) {
         return false
      }
   }
}

module.exports = ExtratoModel