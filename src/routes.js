const express = require('express')
const requireDir = require('require-dir')

const routes = express.Router()

const controllers = requireDir('./controllers')

routes.get('/', controllers.UserController.index) // Não existe na aplicaçao real

routes.post('/login', controllers.AuthController.login)

routes.post('/recover', controllers.AuthController.recoverPassword)

routes.get('/dashboard/:id', controllers.UserController.dashboard) // Fututo metodo index

routes.get('/user/:id', controllers.UserController.getUser)

routes.get('/user/edit/:id', controllers.UserController.getUser)

// routes.use(authMiddleware)

// routes.get('/users', controllers.UserController.index)

module.exports = routes
