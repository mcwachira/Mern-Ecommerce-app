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
        type: Array

    },
    color: {
        type: Array

    },
    price: {
        type: String,

    },
    inStock: {
        type: Boolean,
        default: true,
    }
},
    {
        timestamps: true
    } //enable us to get time for user created or updated
)


module.exports = mongoose.model('Product', productSchema)
