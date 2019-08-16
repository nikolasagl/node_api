const AutenticacaoHelper = require('../helpers/AutenticacaoHelper')
const UsuarioModel = require('../model/UsuarioModel')

module.exports = {

   async login(req, res) {
      try {
         const input = req.body

         if (input.radio === 1) {
            var usuario = await UsuarioModel.buscaUsuarioCpf(input.username)
         } else if (input.radio === 2) {
            var usuario = await UsuarioModel.buscaUsuarioCnpj(input.username)
         }

         if (!usuario)
            return res.json({error: 'Usuário não encontrado.'})

         var arraySenha = input.password.split('fQ==')
         var parcial = []
         
         arraySenha.forEach(element => {  
            
            var botoes = []
            var num = AutenticacaoHelper.decode64(element).substr(1).split(',')
            
            num.forEach(value => {
               botoes.push([value])
            })
            parcial.push(botoes)
         })
         
         parcial.pop()
         
         var response = AutenticacaoHelper._trySenhas(parcial, [], '', 0)

         const data = {
            username: input.username,
            password: response
         }         

         const retorno = await UsuarioModel.logar(data)

         if (retorno === false)
            return res.json({ error: 'Senha incorreta.' })

         // ARMAZENA INFORMAÇOES CLIENTE NA TABELA log_acesso_cliente
         // const ip = req.ip
         // const ipDetails = fetch(`http://ip-api.com/php/${ip}`)

         // LoggerModel.logAcessoCliente(ipDetails)

         usuario.token = AutenticacaoHelper.gerarToken(usuario)
         usuario.senha_pes = undefined

         return res.json({ usuario })

      } catch (error) {
         console.log(error)
         return res.json({ error: "Autenticação do usuário falhou. Tente novamente mais tarde." })
      }
   },

   async recuperarSenha(req, res) {
      try {
         const data = req.body

         if (data.radio === 1) {
            var user = await db('pessoa').where('cpf_pes', data.username).first()
         } else if (data.radio === 2) {
            var user = await db('pessoa').where('cnpj_pes', data.username).first()
         }

         if (!user)
            return res.status(400).json({ error: "User not found!" })

         // Aqui logica para envio de email e geraçao de senha provisoria

         return res.json({
            email: user.email_pes
         })

      } catch (error) {
         return res.status(400).json({ error: "Recover password failed! Try again later. Error: " + error })
      }
   }
}