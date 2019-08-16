const db = require('../config/database')
const { generateHash } = require('../helpers/UsuarioHelper')

module.exports = {
   // Nao deve existir em produçao
   async index (req, res) {

      const usuarios = await db('pessoa')

      if (usuarios) {
         res.json({usuarios})
      }
   },

   async dashboard (req, res) {
      
      // Precisa de verificaçoes mais robustas
      try {
         const id = req.params.id

         var subs = await db('subscricao').where('codigo_pes', id).first()

         if (subs.codigo_subs) {
            var subsCalculado = await db('subscricao_calculado').where('codigo_subs', subs.codigo_subs).first()
            var resgates = await db('resgate').where('codigo_subs', subs.codigo_subs).first()

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
            res.status(400).json({ error: 'Não foi possivel recuperar os dados do Usuario. 1' })
         }
         
      } catch (error) {
         res.status(400).json({ error: 'Não foi possivel recuperar os dados do Usuario. 2' })
      }
   },

   async getUsuario(req, res) {

      try {
         
         const id = req.params.id

         const usuario = await db('pessoa').where('codigo_pes', id).first()

         if (!usuario) {
            res.status(400).json({error: 'Usuario nao encontrado!'})
         }

         usuario.senha_pes = undefined

         const cidade = await db('cidades').where('codigo_cid', usuario.codigo_cid).first()
         const estado = await db('estados').where('codigo_est', cidade.codigo_est).first()

         usuario.cidade_pes = cidade
         usuario.estado_pes = estado

         res.json({
            usuario
         })

      } catch (error) {
         res.status(400).json({error: 'Houve um erro ao buscar os dados do usuario. Tente novamente mais tarde!'})         
      }
   },

   // async editUser(req, res) {

   //    try {
         
   //       const id = req.params.id


   //    } catch (error) {
         
   //    }
   // },
}