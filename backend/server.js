require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const puzzleRoutes = require('./routes/puzzles')
const attemptRoutes = require('./routes/attempts')
const userRoutes = require('./routes/user')
//creates express app
const app = express()

//middleware

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(cors())


app.use('/api/puzzles',puzzleRoutes)
app.use('/api/attempts',attemptRoutes)
app.use('/api/user',userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
})



