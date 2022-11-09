const express = require('express')
const dotEnv = require('dotenv').config();
const colors = require('colors')
const bodyParser = require('body-parser');
const {errorHandler}   = require('./middleware/errorMiddleware')
const connectDb = require('./config/db')
const app = express()

const PORT = process.env.PORT || 5000;

connectDb()

//using the body-parser middleware to parse the JSON request body,
app.use(bodyParser.json())

//to get values from our body

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(errorHandler)

app.use('/api/goals',require('./routes/goalRoutes') )
app.use('/api/user', require('./routes/userRoute'))

app.listen(PORT, () => {
    console.log(`server working on port ${PORT}`)
} )