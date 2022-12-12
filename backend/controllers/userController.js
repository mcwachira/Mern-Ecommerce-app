const jwt = require('jsonwebtoken') //generate token
const { expressjwt: expressJwt } = require("express-jwt");//
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')


// const getUserById = asyncHandler(async (req, res) => {

//     const userId = req.params

//     //check if user exist based on the id

//     const user = User.findById(id).exec()

//     if (!user) {
//         res.status(400).json({ error: 'user with that id does not exist' })
//     }

//     res.status(200).json(user)

// })

const getUserById = asyncHandler(async (req, res, next, id) => {

    // const userId = req.params

    //check if user exist based on the id

    const user = await User.findById(id).exec()

    if (!user) {
        res.status(400).json({ error: 'user with that id does not exist' })
    }

    req.profile = user
    next()

    //res.status(200).json(user)

})


module.exports = { getUserById }