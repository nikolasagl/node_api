const express = require('express')
const requireDir = require('require-dir')

const routes = express.Router()

const controllers = requireDir('./controllers')

routes.get('/', controllers.UserController.index)

routes.post('/login', controllers.AuthController.login)

routes.post('/recover', controllers.AuthController.recoverPassword)

routes.get('/dashboard/:id', controllers.UserController.dashboard)

// routes.use(authMiddleware)

// routes.get('/users', controllers.UserController.index)

module.exports = routes
