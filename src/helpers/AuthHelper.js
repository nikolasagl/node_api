const jwt = require("jsonwebtoken")
const secret = require('../config/auth')

module.exports = {

   generateToken(user) {
      return jwt.sign({ id: user.id }, secret.secret, {
         expiresIn: 86400
       })
   }
}