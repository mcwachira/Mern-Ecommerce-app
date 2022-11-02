const express = require('express')

const app = express()

const PORT = 3000;
app.get('/', (req, res) => {
    console.log('hello from node')
})

app.listen(PORT, () => {
    console.log(`server working on port ${PORT}`)
} )