const UsuarioModel = require('../model/UsuarioModel')
const SubscricaoModel = require('../model/SubscricaoModel')

module.exports = {

   // Nao deve existir em produçao
   async index (req, res) {

      const usuarios = await UsuarioModel.buscaTodos()

      if (usuarios) {
         res.json({usuarios})
      }
   },

   async dashboard (req, res) {

      try {
         const id = req.params.id

         var subs = await SubscricaoModel.buscaSubscricao(id)

         var totalSubs = 0
         subs.forEach(element => {
            totalSubs += element.valor_subs
         })

         var subsCalculado = await SubscricaoModel.buscaSubsCalculado(id)
         // var resgates = await SubscricaoModel.buscaResgates(subs.codigo_subs)

         res.json({
            dash: [
               {
                  title: 'valorSub',
                  label: 'Valor Investido',
                  value: totalSubs
               },
               {
                  title: 'resgates',
                  label: 'Resgates',
                  value: null
                  // value: resgates ? resgates : null
               },
               {
                  title: 'cupom',
                  label: 'Cupom Recebido',
                  value: null
               },
               {
                  title: 'totalRendB',
                  label: 'Lucro Bruto',
                  value: subsCalculado.totalRendBruto
               },
               {
                  title: 'totalBruto',
                  label: 'Saldo Bruto',
                  value: subsCalculado.totalBruto
               },
               {
                  title: 'totalRendL',
                  label: 'Lucro Liquido',
                  value: subsCalculado.totalRendLiquido
               },
               {
                  title: 'totalLiquido',
                  label: 'Saldo Liquido',
                  value: subsCalculado.totalLiquido
               }
            ]
         })
         
      } catch (error) {
         res.status(400).json({ error: 'Não foi possivel recuperar os dados do Usuario. Error: '+error })
      }
   },

   async buscaUsuario (req, res) {

      try {
         const id = req.params.id

         const usuario = await UsuarioModel.buscaUsuarioComEndereco(id)

         if (usuario)
            res.status(200).json({ usuario })
         else
            res.status(400).json({ error: 'Usuario não encontrado.' })
      } catch (error) {
         res.status(400).json({ error })         
      }
   },

   async update (req, res) {},
}