require('dotenv').config()

const express = require('express')
const userRoutes = require('./routes/users')

//creates express app
const app = express()

//middleware

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/users',userRoutes)

app.listen(process.env.PORT, () => {
console.log('listening on port', process.env.PORT)
})

