import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { notFound, errorHandler} from './middleware/errorMiddleware.js'
import products from './data/products.js'
import dotenv from 'dotenv'
import  connectDb from './config/db.js'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";



dotenv.config();
const port = process.env.PORT  || 5000;

//mongodb database
connectDb()
const app = express();

// for parsing application/json
app.use(express.json({ limit: "30mb", extended: true }))
// for parsing application/x-www-form-urlencoded /form data
app.use(express.urlencoded({ limit: "30mb", extended: true }))

//enabling helmet
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

//enabling cors
app.use(cors())

//enables us to se logs in our terminal
app.use(morgan('tiny')) //used to log request from the frontend
//get cookies
app.use(cookieParser())






//routes

app.use('/api/v1/products', productRoutes)

app.use('/api/v1/users', userRoutes)

app.use('/api/v1/orders', orderRoutes)


//error handler
app.use(notFound);
app.use(errorHandler)
app.listen(port, () => console.log(`server is running on port ${port}`))