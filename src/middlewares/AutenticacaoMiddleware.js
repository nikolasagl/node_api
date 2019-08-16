const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const secret = require('../config/secret')
const UsuarioModel = require('../model/UsuarioModel')

module.exports = (req, res, next) => {

    const params = {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    passport.use(new Strategy(params, (payload, done) => {

        var user = UsuarioModel.buscarUsuario(payload.id)

        user.then(result => {
            if (result)
                done(null, { result })
            else 
                done(null, false)
        }).catch(error => done(error, false) )
    }))

    passport.initialize()
    passport.authenticate('jwt', { session: false })
}