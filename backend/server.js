import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Api is running ....')
})


app.get('/api/products', (req, res) => {

    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
 const product = products.find((p) =>p._id === req.params.id )

    res.json(product)
})

const port = process.env.PORT  || 5000;



app.listen(port, () => console.log(`server is running on port ${port}`))