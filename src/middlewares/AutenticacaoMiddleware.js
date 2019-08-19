const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const secret = require('../config/secret')

const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = () => {
    
    var strategy = new Strategy(params, (payload, done) => {
    
        var user = UsuarioModel.buscaUsuario(payload.id)
    
        user.then(result => {
            if (result)
                done(null, { result })
            else 
                done(null, false)
        }).catch(error => done(error, false) )
    })

    passport.use(strategy)

    return passport.authenticate('jwt', { session: false })
}