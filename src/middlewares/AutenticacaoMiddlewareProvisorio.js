const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).send({ error: 'No token provided!' })
  
  const parts = authHeader.split(' ')
  
  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token error!' })
  
  const [ scheme, token ] = parts

  if (scheme !== 'bearer')
    return res.status(401).send({ error: 'Token malformatted!' })

  jwt.verify(token, secret.secret, (err, decoded) => {
    if (err)
      return res.status(401).send({ error: 'Invalid token!' })

    req.userId = decoded.id

    return next()
  })
}