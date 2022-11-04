
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')


//@desc  Register user 
//@route  /api/user/register
//@access  route
const registerUser = asyncHandler(async (req, res) => {

    //get data from the body
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('please add all the fields')
    }

    //check if the user exist
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error ('user with that email exist')
    }

    //generate hashed password
    const salt =await  bcrypt.genSalt(10)
        const hashedPassword = await  bcrypt.hash(password, salt)

        const user = await User.create({
            name:name,
            email:email,
            password:hashedPassword,
        })
    
    
        if(user){
            res.status(201).json({
                id:user._id,
                name:user.name,
                email:user.email, 
                password:user.hashedPassword,
                token:generateToken(user._id)
            })
        }else{
            res.status(400)
            throw new Error('error creating user')
        }

})

//@desc  Authenticate user
//@route  /api/user/login
//@access  route
const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;
//check for user email
 
const user = await User.findOne({email})

if(user && (await bcrypt.compare(password, user.password))){
    res.status(201).json({
          id:user._id,
                name:user.name,
                email:user.email, 
                  token:generateToken(user._id)
    })
}else{
        res.status(400)
        throw new Error('user credentials are wrong')
    }

})


//@desc  Authenticate user
//@route  /api/user/login
//@access  private
const getUserData = asyncHandler(async (req, res) => {

const {_id, email, name} =  User.findById(req.user.id)


   await  res.status(200).json({

    id:_id,
    name,
    email
   })
})


const generateToken = (id) => {
 return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn:'30d'
 })
}

module.exports  ={
    registerUser,
    loginUser,
    getUserData
}