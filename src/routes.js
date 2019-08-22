const express = require('express')
const requireDir = require('require-dir')
const AutenticacaoMiddleware = require('./middlewares/AutenticacaoMiddleware')
const AutenticacaoMiddlewareProvisorio = require('./middlewares/AutenticacaoMiddlewareProvisorio')

const routes = express.Router()

const controllers = requireDir('./controllers')

routes.get('/', controllers.UsuarioController.index) // Não existe na aplicaçao real

routes.all('/login', controllers.AutenticacaoController.validate('login'), controllers.AutenticacaoController.login)

routes.post('/recuperar', controllers.AutenticacaoController.recuperarSenha)

// ROTAS USUARIO
routes.get('/usuario/:id/dashboard', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.dashboard)
routes.get('/usuario/:id', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.buscaUsuario)
routes.get('/usuario/:id/edit', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.edit)
routes.put('/usuario/:id', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.update)

module.exports = routes
