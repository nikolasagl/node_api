const express = require('express')
const requireDir = require('require-dir')
const AutenticacaoMiddleware = require('./middlewares/AutenticacaoMiddleware')
const AutenticacaoMiddlewareProvisorio = require('./middlewares/AutenticacaoMiddlewareProvisorio')

const routes = express.Router()

const controllers = requireDir('./controllers')
const validators = requireDir('./validators')

routes.get('/', controllers.UsuarioController.index) // Não existe na aplicaçao real

routes.all('/login', validators.AutenticacaoValidation.validate('login'), controllers.AutenticacaoController.login)

routes.post('/recuperar', validators.AutenticacaoValidation.validate('recuperar'), controllers.AutenticacaoController.recuperarSenha)

// ROTAS USUARIO
routes.get('/usuario/:id/dashboard', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.dashboard)
routes.get('/usuario/:id', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.buscaUsuario)
routes.get('/usuario/:id/edit', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.edit)
routes.put('/usuario/:id', AutenticacaoMiddlewareProvisorio, controllers.UsuarioController.update)

routes.get('/agenda/:id', AutenticacaoMiddlewareProvisorio, controllers.AgendaController.index)

module.exports = routes
