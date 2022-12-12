const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        minlength: [2, 'to short'],
        maxlength: [32, ' too long'],

    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please add  password'],

    },
    about: {
        type: String,
        trim: true,


    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }

}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)