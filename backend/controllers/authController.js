const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const { generateAccessToken,
    generateRefreshToken } = require('../utils/generateToken')

// @desc register user
// @route POST /users
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    //first thing is to check the data

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    //check for existing user or duplicates
    //.exec() enables use to get a promise back
    const duplicateUser = await User.findOne({ email }).lean().exec()
    if (duplicateUser) {
        return res.status(409).json({ message: 'user with that email already in use' })
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10) //salt rounds 10

    const userObject = {
        "name": name,
        email: email,
        'password': hashedPassword,

    }
    const user = await User.create(userObject)

    if (user) {
        res.status(201).json(user)
    } else {

        res.status(400).json({ message: 'user not created . invalid user data' })
    }
})


const logInUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //first thing is to check the data

    if (!email || !password) {
        return res.status(400).json({ message: 'all fields are required' })
    }





    const user = await User.findOne({ email }).lean().exec()

    if (!user) {
        return res.status(400).json({ message: 'user with that email does not exist' })
    }


    //check if password is correct

    let value = await bcrypt.compare(password, user.password)

    console.log(value)
    if (user && value === false) {
        return res.status(401).send({ error: 'Email and password do not match ' })
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return res.status(200).json({
        ...user,
        accessToken,
        // refreshToken
    }
    )

})



module.exports = {
    registerUser,
    logInUser
}