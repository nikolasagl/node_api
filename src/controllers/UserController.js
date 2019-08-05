const db = require('../config/database')
const { generateHash } = require('../helpers/UserHelper')

module.exports = {
   async index (req, res) {

      const users = await db('pessoa')
      
      generateHash()

      if (users) {
         res.json({users})
      }
   },

   async dashboard (req, res) {
      
      // Precisa de verificaçoes mais robustas
      try {
         const id = req.params.id
         subs = await db('subscricao').select('codigo_subs').where('codigo_pes', id).first()
         
         if (subs.codigo_subs) {
            var userDash = {
               valorSub: await db('subscricao').select('valor_subs').where('codigo_pes', id).first(),
               totalBruto: await db('subscricao_calculado').select('total_bruto').where('codigo_subs', subs.codigo_subs),
               totalLiquido: await db('subscricao_calculado').select('total_liquito').where('codigo_subs', subs.codigo_subs),
               totalRendB: await db('subscricao_calculado').select('total_rend_bruto').where('codigo_subs', subs.codigo_subs),
               totalRendL: await db('subscricao_calculado').select('total_rend_liquido').where('codigo_subs', subs.codigo_subs),
               resgates: await db('resgate').where('codigo_subs', subs.codigo_subs)
            }         
         } else {
            res.status(400).json({ error: 'Não foi possivel recuperar os dados do Usuario. 1' })
         }
   
         res.json({userDash})
         
      } catch (error) {
         res.status(400).json({ error: 'Não foi possivel recuperar os dados do Usuario. 2' })
      }
   }
}