const express = require('express')
const app = express()
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const goalRoute = require('./routes/goalRoutes')
const morgan = require("morgan")

connectDB()

//middlezqres
app.use(express.json())
// app.use(morgan("dev"))
         
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', goalRoute)
app.use('/api/users',require ('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port,() => console.log(`Server started on port ${port}`))

