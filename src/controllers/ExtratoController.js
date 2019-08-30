const ExtratoModel = require('../model/ExtratoModel')
const moment = require('moment')

module.exports = {

   async buscaExtratoTotal(req, res) {

      if (parseInt(req.params.id) === req.userId)
         var id = req.params.id
      else
         res.json({ error: 'Problema de autenticação. Faça login novamente.' })

      try {
         var aux = await ExtratoModel.buscaExtratoTotal(id)
         aux = aux[0]

         var extrato = []
         var total = 0

         var dataInicial = moment(req.query.dataInicial)
         var dataFinal = moment(req.query.dataFinal)

         aux.forEach((element) => {
            var data = moment(element.data)
            if (data >= dataInicial && data <= dataFinal && element.valor != 0) {
               total += element.valor
               element.total = total
               extrato.push(element)
            }
         })

         console.log(extrato)
   
         if (extrato) {
            res.json({ extrato })
         }
         
      } catch (error) {
         res.json({ error: 'Não foi possivel recuperar os dados do Extrato. Error: ' + error })
      }
   }
}