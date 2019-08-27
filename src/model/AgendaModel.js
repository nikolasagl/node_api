const db = require('../config/database')

const AgendaModel = {

   buscaEventos: async (id) => {
      try {
         const eventos = await db('agenda').where('codigo_pes', id).orderBy('data_age', 'asc')

         if (eventos)
            return eventos
         else
            return false

      } catch (error) {
         return false
      }
   }
}

module.exports = AgendaModel