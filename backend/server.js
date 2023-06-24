import express from 'express'
import { notFound, errorHandler} from './middleware/errorMiddleware.js'
import products from './data/products.js'
import dotenv from 'dotenv'
import  connectDb from './config/db.js'
import productRoute from "./routes/ProductRoute.js";


dotenv.config();


//mongodb database
connectDb()
const app = express();



const port = process.env.PORT  || 5000;



//routes

app.use('/api', productRoute)


//error handler
app.use(notFound);
app.use(errorHandler)
app.listen(port, () => console.log(`server is running on port ${port}`))