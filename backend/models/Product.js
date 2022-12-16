const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,

    },
    img: {
        type: String,
        require: true,
    },
    categories: {
        type: Array,

    },
    size: {
        type: String,

    },
    color: {
        type: String,

    },
    price: {
        type: String,

    },
},
    {
        timestamps: true
    } //enable us to get time for user created or updated
)


module.exports = mongoose.model('Product', productSchema)
