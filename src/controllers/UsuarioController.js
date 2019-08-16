const UsuarioModel = require('../model/UsuarioModel')

module.exports = {

   // Nao deve existir em produçao
   async index (req, res) {

      const usuarios = await db('pessoa')

      if (usuarios) {
         res.json({usuarios})
      }
   },

   async dashboard (req, res) {

      try {
         const id = req.params.id

         var subs = await UsuarioModel.buscaSubscricao(id)

         if (subs.codigo_subs) {
            var subsCalculado = await UsuarioModel.buscaSubsCalculado(subs.codigo_subs)
            var resgates = await UsuarioModel.buscaResgates(subs.codigo_subs)

            res.json({
               dash: [
                  {
                     title: 'valorSub',
                     label: 'Valor Investido',
                     value: subs.valor_subs
                  },
                  {
                     title: 'totalBruto',
                     label: 'Saldo Bruto',
                     value: subsCalculado.total_bruto
                  },
                  {
                     title: 'cupom',
                     label: 'Cupom Recebido',
                     value: null
                  },
                  {
                     title: 'totalLiquido',
                     label: 'Saldo Liquido',
                     value: subsCalculado.total_liquito
                  },
                  {
                     title: 'totalRendB',
                     label: 'Lucro Bruto',
                     value: subsCalculado.total_rend_bruto
                  },
                  {
                     title: 'totalRendL',
                     label: 'Lucro Liquido',
                     value: subsCalculado.total_rend_liquido
                  },
                  {
                     title: 'resgates',
                     label: 'Resgates',
                     value: resgates ? resgates : null
                  }
               ]
            })
         } else {
            res.status(400).json({ error: 'Não foi possivel recuperar os dados do Usuario.' })
         }
         
      } catch (error) {
         res.status(400).json({ error: 'Não foi possivel recuperar os dados do Usuario.' })
      }
   },

   async getUsuario(req, res) {
         
      const id = req.params.id

      const usuario = await UsuarioModel.buscaUsuarioComEndereco(id)

      console.log(usuario)

      if (usuario)
         res.status(200).json({ usuario })
      else
         res.status(400).json({ error: 'Usuario não encontrado.' })
   }
}