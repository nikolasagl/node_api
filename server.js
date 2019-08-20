const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const router = require('./src/routes')

const app = express()

app.use(bodyParser.json())

app.use(cors({
   origin: '*'
}))

app.use(router)

app.listen(3000, () => {
   console.log('Server is running on port 3000...')
})

// app.use(passport.initialize())
