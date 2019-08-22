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

   async edit (req, res) {

      try {
         const id = req.params.id

         const aux = await UsuarioModel.buscaUsuarioComEndereco(id)

         const usuario = {
            dtnascimento_pes: aux.dtnascimento_pes,
            nome_pes: aux.nome_pes,
            cpf_pes: aux.cpf_pes,
            rg_pes: aux.rg_pes,
            cep_pes: aux.cep_pes,
            endereco_pes: aux.endereco_pes,
            bairro_pes: aux.bairro_pes,
            numero_pes: aux.numero_pes.toString(),
            complemento_pes: aux.complemento_pes,
            cidade_pes: aux.cidade_pes.nome_cid,
            estado_pes: aux.estado_pes.nome_est,
            telefone_pes: aux.telefone_pes,
            email_pes: aux.email_pes,
            banco_pes: aux.banco_pes,
            numerobanco_pes: aux.numero_pes.toString(),
            agencia_pes: aux.agencia_pes,
            conta_pes: aux.conta_pes,
            nometitular_pes: aux.nometitular_pes,
            login_pes: aux.login_pes
         }

         if (usuario)
            res.status(200).json({ usuario })
         else
            res.status(400).json({ error: 'Usuario não encontrado.' })
      } catch (error) {
         res.status(400).json({ error })         
      }
   },

   async update (req, res) {
      console.log(req.params.id)
      console.log(req.headers)
      console.log(req.body)
   },
}