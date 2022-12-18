const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    img: { type: String }
},
    {
        timestamps: true
    } //enable us to get time for user created or updated
)


module.exports = mongoose.model('User', userSchema)
