const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    products: [
        {

            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            }


        },
    ],

},
    {
        timestamps: true
    } //enable us to get time for user created or updated
)


module.exports = mongoose.model('Cart', cartSchema)
