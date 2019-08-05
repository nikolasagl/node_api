const express = require('express')
const app = express()
const consign = require('consign')
const router = require('./src/routes')

consign()
   .then('./src/middlewares/middlewares.js')
   .into(app)

app.use(router)

app.listen(3000, () => {
   console.log('Server is running on port 3000...')
})