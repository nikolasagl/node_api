const SubscricaoModel = require('../model/SubscricaoModel')
const moment = require('moment')

async function solicitaResgate(req, res) {

   if (parseInt(req.params.id) === req.userId)
      var id = req.params.id
   else
      res.json({ error: 'Problema de autenticação. Faça login novamente.' })

   try {
      const valor = req.query.valor
      const data = moment().format('YYYY-MM-DD')
      const subs = await SubscricaoModel.buscaSubscricaoOrderedByData(id)

      console.log(subs)
      console.log(valor)
      console.log(data)
   } catch (error) {
      res.json({ error: 'Não foi possivel executar a solicitação de Resgate. Error: ' + error })
   }
}

module.exports = { solicitaResgate }