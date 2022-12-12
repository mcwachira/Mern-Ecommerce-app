const express = require('express')
const dotEnv = require('dotenv').config();
const colors = require('colors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const connectDb = require('./config/db')





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
// app.use('/', express.static(path.join(__dirname, '/public')))


//import my routes

const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRoute')
const categoryRouter = require('./routes/categoryRoute')
const productRouter = require('./routes/productRoute')



app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)

app.listen(PORT, () => {
    console.log(`server working on port ${PORT}`)
})