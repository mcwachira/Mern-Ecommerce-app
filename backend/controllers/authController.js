
const jwt = require('jsonwebtoken') //generate token
const { expressjwt: expressJwt } = require("express-jwt");//
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')


//@desc  Register user 
//@route  /api/user/register
//@access  route
const registerUser = asyncHandler(async (req, res) => {

    //get data from the body
    const { name, email, password, confirmPassword } = req.body

    if (!name || !email || !password || !confirmPassword) {
        res.status(400).json({ error: ' PLease add all the fields' })

    }

    //check if the user exist
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400).json({ error: 'user with that email exist' })
    }


    //check if password and confirm password are the same

    if (password !== confirmPassword) {
        res.status(400).json({ error: 'passwords do not match please enter the password again' })
    }
    //generate hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    })


    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.hashedPassword,
            // token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('error creating user')
    }

})

//@desc  Authenticate user
//@route  /api/user/login
//@access  route
const signInUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email })


    if (!user) {
        return res.status(401).json({ error: 'User with that email not found' })
    }
    //will check for a better way to handle email and password
    const value = await bcrypt.compare(password, user.password)
    // console.log(value)
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Email and password do not match ' })
    }

    // const token = jwt.sign(
    //     {  id: user._id },
    //     process.env.JWT_SECRET,
    //     {
    //         expiresIn: '1h'
    //     }
    // )

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    //storing our token in the cookie
    res.cookie('t', token, { expire: new Date() + 999 })

    // console.log(user)
    // const accessToken = generateAccessToken(user)
    // const refreshToken = generateRefreshToken(user)

    //res.cookie('t', token, { expiresIn: new Date() + 999})
    // return res.status(200).json({
    //     'user': user,
    //     'accessToken': accessToken,
    //     'refreshToken': refreshToken,
    // }
    // )


    if (!token) {

        res.status(400).json({
            error: 'Could not sign you in no token generated'
        })
    }
    res.status(200).json({
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }

    })

})


const signOutUser = (req, res) => {
    res.clearCookie('t')
    res.json({ error: 'Sign out successfully' })
}


const requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
})



//auth middleware
const isAuth = asyncHandler(async (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id === req.auth._id

    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        })
    }

    next()

})



//auth middleware not working properly
const isAdmin = asyncHandler(async (req, res, next) => {
    const profile = await req.profile
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resource access denied'
        })
    }



    next()

})

//@desc  Authenticate user
//@route  /api/user/login
//@access  private
const getUserData = asyncHandler(async (req, res) => {

    const { _id, email, name } = User.findById(req.user.id)


    await res.status(200).json({

        id: _id,
        name,
        email
    })
})


module.exports = {
    registerUser,
    signInUser,
    signOutUser,
    signOutUser,
    requireSignIn,
    getUserData,
    isAdmin, isAuth
}