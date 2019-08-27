const AgendaModel = require('../model/AgendaModel')

module.exports = {

   async index(req, res) {

      if (parseInt(req.params.id) === req.userId)
         var id = req.params.id
      else
         res.json({ error: 'Problema de autenticação. Faça login novamente.' })

      const aux = await AgendaModel.buscaEventos(id)

      var items = {}
      var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      aux.forEach(element => {
         items[element.data_age.toLocaleDateString('default', options)] = [{name: element.desc_age, height: 50}]
      })

      if(items) {
         res.json({ items })
      }
   } 
}