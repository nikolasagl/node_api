const moment = require('moment')
const db = require('../config/database')

const ExtratoModel = {
   
   buscaExtratoTotal: async (id) => {
      console.log(moment().format('YYYY-MM-DD'))
      try {
         var dadosExtrato = await db.raw(
            'SELECT subscricao.data_subs AS data, '+
                  'SUM(subscricao.valor_subs) AS valor, '+
                  "'Valor Investimento' AS tipo "+
            'FROM subscricao '+
            'WHERE subscricao.codigo_pes = '+id+' AND ativo_subs = 1 AND pendente_subs = 0 '+
            'GROUP BY data '+
                        
            'UNION '+
		                  
            'SELECT rendimento.data_rend AS data, '+
                  'SUM(rendimento.valor_rend) AS valor, '+
                  "'Rendimento Diário' AS tipo "+
            'FROM rendimento inner join subscricao on rendimento.codigo_subs = subscricao.codigo_subs '+
            'WHERE subscricao.codigo_pes = '+id+' AND pendente_subs = 0 AND ativo_subs = 1 AND ativo_rend = 1 '+
            'GROUP BY data '+

            'UNION '+
            
            'SELECT resgate.dataresgatado_resg AS data, '+
                  '-SUM(resgate.valor_resg) AS valor, '+
                  "'Resgate' AS tipo "+
            'FROM resgate inner join subscricao on resgate.codigo_subs = subscricao.codigo_subs '+
            'WHERE subscricao.codigo_pes = '+id+' AND tipo_resg = 1 AND pendente_subs = 0 AND ativo_subs = 1 AND ativo_resg = 1 AND dataresgatado_resg <= COALESCE(contabiliza_subs,'+ moment().format('YYYY-MM-DD') +') '+
            'GROUP BY data '+

            'UNION '+
            
            'SELECT resgate.dataresgatado_resg AS data, '+
                  '-SUM(resgate.valor_resg) AS valor, '+
                  "'Cupom Mensal' AS tipo "+
            'FROM resgate inner join subscricao on resgate.codigo_subs = subscricao.codigo_subs '+
            'WHERE subscricao.codigo_pes = '+id+' AND tipo_resg = 0 AND pendente_subs = 0 AND ativo_subs = 1 AND ativo_resg = 1 '+
            'GROUP BY data '+
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
   },
}

module.exports = ExtratoModel