const mongoose = require('mongoose')

const goalsSchema = new mongoose.Schema({

    name: {
       type: String,
       required:[true, 'please add a name'],
        minlength: [2, 'to short'],
        maxlength: [32, ' too ling'],

    },
    description:{
      type:  String,
        required: [true, 'please add a description'],

    }

}, { timestamps: true })



module.exports = mongoose.model('Goals', goalsSchema)