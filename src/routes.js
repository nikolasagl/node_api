const express = require('express')
const requireDir = require('require-dir')
const AutenticacaoMiddleware = require('./middlewares/AutenticacaoMiddleware')
const AutenticacaoMiddlewareProvisorio = require('./middlewares/AutenticacaoMiddlewareProvisorio')

const routes = express.Router()

const controllers = requireDir('./controllers')

routes.get('/', controllers.UsuarioController.index) // Não existe na aplicaçao real

routes.all('/login', controllers.AutenticacaoController.login)

routes.post('/recuperar', controllers.AutenticacaoController.recuperarSenha)

// TODAS ROTAS DO MIDDLEWARE PARA BAIXO SERÃO EXECUTADAS APENAS APOS O MIDDLEWARE SER EXECUTADO
routes.use(AutenticacaoMiddlewareProvisorio) // PROVISORIO ATÉ DESCOBRIR O QUE HÁ DE ERRADO COM O PASSPORT
// routes.use(AutenticacaoMiddleware)

routes.get('/dashboard/:id', controllers.UsuarioController.dashboard)

routes.get('/usuario/:id', controllers.UsuarioController.getUsuario)

routes.get('/usuario/edit/:id', controllers.UsuarioController.getUsuario)

module.exports = routes
