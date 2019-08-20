const express = require('express')
const requireDir = require('require-dir')
const AutenticacaoMiddleware = require('./middlewares/AutenticacaoMiddleware')
const AutenticacaoMiddlewareProvisorio = require('./middlewares/AutenticacaoMiddlewareProvisorio')

const routes = express.Router()

const controllers = requireDir('./controllers')

routes.get('/', controllers.UsuarioController.index) // Não existe na aplicaçao real

routes.all('/login', controllers.AutenticacaoController.validate('login'), controllers.AutenticacaoController.login)

routes.post('/recuperar', controllers.AutenticacaoController.recuperarSenha)

// TODAS ROTAS DO MIDDLEWARE PARA BAIXO SERÃO EXECUTADAS APENAS APOS O MIDDLEWARE SER EXECUTADO
// routes.use(AutenticacaoMiddlewareProvisorio) // PROVISORIO ATÉ DESCOBRIR O QUE HÁ DE ERRADO COM O PASSPORT

// ROTAS USUARIO
routes.get('/usuario/:id/dashboard', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.dashboard)
routes.get('/usuario/:id', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.buscaUsuario)
routes.get('/usuario/:id/edit', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.buscaUsuario)
routes.put('/usuario/:id', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.update)



module.exports = routes
