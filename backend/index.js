const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const connectDb = require('./config/db')
require('dotenv').config()




//initialize express app
const app = express()

//create our port 
const PORT = process.env.PORT || 8001

//connect our database
connectDb()

// for parsing application/json
app.use(express.json({ limit: "30mb", extended: true }))
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "30mb", extended: true }))


//enabling cors
app.use(cors())

//enables us to se logs in our terminal
app.use(morgan('tiny')) //used to log request from the frontend
//get cookies
app.use(cookieParser())

/*enabling express to locate static files
app.use(express.static('public')) */

//enabling express to locate static files using virtual path /
app.use('/', express.static(path.join(__dirname, '/public')))


//get my routes

const userRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')
const productRouter = require('./routes/productRoute')
const orderRouter = require('./routes/orderRoute')
const cartRouter = require('./routes/cartRoute')

app.use('/api/v1', userRouter)
app.use('/api/v1', authRouter)
app.use('/api/v1', productRouter)
app.use('/api/v1', orderRouter)
app.use('/api/v1', cartRouter)
// app.use('/', authRouter)



app.listen(PORT, (req, res) => {
    console.log(`app running on port ${PORT}`)
})
