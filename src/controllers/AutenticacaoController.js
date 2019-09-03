const { validationResult } = require('express-validator')
const AutenticacaoHelper = require('../helpers/AutenticacaoHelper')
const MainHelper = require('../helpers/MainHelper')
const UsuarioModel = require('../model/UsuarioModel')
const { setCpfMask, setCnpjMask } = require('../helpers/UsuarioHelper')

async function login(req, res) {
   try {
      const erros = validationResult(req)
      
      if (!erros.isEmpty()) {
         return res.json({ errors: erros.array() })   
      }
      
      const input = req.body

      if (input.radio === 1) {
         var aux = setCpfMask(input.username) // PROVISORIO, POIS DEVE VIR DO FRONT COM A MASCARA COMPLETA
         var usuario = await UsuarioModel.buscaUsuarioCpf(aux)
      } else if (input.radio === 2) {
         var aux = setCnpjMask(input.username) // PROVISORIO, POIS DEVE VIR DO FRONT COM A MASCARA COMPLETA
         var usuario = await UsuarioModel.buscaUsuarioCnpj(aux)
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
         username: aux,
         password: response,
         radio: input.radio
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
}

async function recuperarSenha(req, res) {
   try {
      const erros = validationResult(req)
      
      if (!erros.isEmpty()) {
         return res.json({ errors: erros.array() })   
      }
      
      const input = req.body

      if (input.radio === 1) {
         var usuario = await UsuarioModel.buscaUsuarioCpf(input.username)
      } else if (input.radio === 2) {
         var usuario = await UsuarioModel.buscaUsuarioCnpj(input.username)
      }

      if (!usuario)
         return res.json({ error: "Usuario não encontrado." })

      const data = { documento: input.username }
      const options = {
         method: "POST",
         url: "http://localhost/fmi_cliente/login_cliente/recuperaSenha",
      }

      MainHelper.phpServerRequest(options, data).then((response) => {
         return res.json({ response })
      })

   } catch (error) {
      return res.json({ error: "Recuperação de senha falhou. Tente novamente mais tarde. Error: " + error })
   }
}
module.exports = { login, recuperarSenha }