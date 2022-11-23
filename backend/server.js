require ('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')

// express app
const app = express()

//middleware (code executed between getting request on server and sending a response)
app.use(express.json()) // since we use this, all of that request body that come along with the request is going to be passed into the request object so we can use it
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes (panggil dari folder routes)
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to db')
    })
    .catch((error) => {
        console.log(error)
    })

// listen for request
app.listen(process.env.PORT, ()=> {
    console.log('listening on port', process.env.PORT)
})