const UsuarioModel = require('../model/UsuarioModel')
const SubscricaoModel = require('../model/SubscricaoModel')
const ResgateModel = require('../model/ResgateModel')

// Nao deve existir em produçao
async function index(req, res) {

   const usuarios = await UsuarioModel.buscaTodos()

   if (usuarios) {
      res.json({ usuarios })
   }
}

async function dashboard(req, res) {

   try {
      if (parseInt(req.params.id) === req.userId)
         var id = req.params.id
      else
         res.json({ error: 'Problema de autenticação. Faça login novamente.' })

      var subs = await SubscricaoModel.buscaSubscricao(id)

      var totalSubs = 0
      var resgates = []

      subs.forEach(async (element) => {
         totalSubs += element.valor_subs

         var aux = await ResgateModel.buscaResgates(element.codigo_subs)
         if (aux != false) resgates.push(aux)
      })

      var subsCalculado = await SubscricaoModel.buscaSubsCalculado(id)
      
      var resgateSolicitado = 0
      var resgateCupom = 0

      resgates.forEach(element => {
         element.forEach(resgate => {
            if (resgate.tipo_resg === 0) {
               resgateCupom += resgate.valor_resg
            }
            if (resgate.tipo_resg === 1) {
               resgateSolicitado += resgate.valor_resg
            }
         })
      })
      
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
               value: resgateSolicitado
            },
            {
               title: 'cupom',
               label: 'Cupom Recebido',
               value: resgateCupom
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
      res.json({ error: 'Não foi possivel recuperar os dados do Usuario. Error: ' + error })
   }
}

async function buscaUsuario(req, res) {

   try {
      if (parseInt(req.params.id) === req.userId)
         var id = req.params.id
      else
         res.json({ error: 'Problema de autenticação. Faça login novamente.' })

      const usuario = await UsuarioModel.buscaUsuarioComEndereco(id)
      usuario.userId = req.userId

      if (usuario)
         res.json({ usuario })
      else
         res.json({ error: 'Usuario não encontrado.' })
   } catch (error) {
      res.json({ error })
   }
}

async function edit(req, res) {

   try {
      if (parseInt(req.params.id) === req.userId)
         var id = req.params.id
      else
         res.json({ error: 'Problema de autenticação. Faça login novamente.' })

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
         res.json({ usuario })
      else
         res.json({ error: 'Usuario não encontrado.' })
   } catch (error) {
      res.json({ error })
   }
}

async function update(req, res) {
   if (parseInt(req.params.id) === req.userId)
      var id = req.params.id
   else
      res.json({ error: 'Problema de autenticação. Faça login novamente.' })
   // console.log(id)
   // console.log(req.headers)
   console.log(req.body)
}

module.exports = { index, dashboard, buscaUsuario, edit, update }