const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
//updateUser

const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id


    const { name, password, email } = req.body
    //check the data 

    if (!name || !email) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    //check id the user exist
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: ' No user with that id exits' })
    }


    //check if username is already in use
    // const duplicateUser = await User.findOne({ username }).lean().exec()
    // if (duplicateUser && duplicateUser?._id.toString() !== id) {
    //     return res.status(409).json({ message: 'Username already in use' })
    // }


    //check if password is needed to change
    let updatedPassword

    if (password) {
        //hash the password
        updatedPassword = await bcrypt.hash(password, 10) //salt rounds
    }

    //update the user details
    const updatedUserDetails = {
        name: name,
        email: email,
        password: updatedPassword

    }

    const updatedUser = await User.findByIdAndUpdate(
        id, updatedUserDetails, {
        new: true
    })

    res.status(200).json(updatedUser)
})


//delete user
const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    // const user = req.profile
    // const deletedUser = await await user.remove()
    // const deletedUser = await User.findByIdAndDelete(id)

    // let user = req.profile
    // let deletedUser = await user.remove()
    // deletedUser.hashed_password = undefined
    // deletedUser.salt = undefined
    // res.json(deletedUser)

    if (!user) {
        res.status(400).json({ message: ' No user with that id exits' })
    }
    res.status(200).json({ message: 'user deleted successfully' })
})


//get list of users 
const getUserList = asyncHandler(async (req, res) => {


    const query = req.query.new
    const users = query ? await User.find().select('name email updated created').sort({ _id: -1 }).limit(3) : await User.find()

    if (!users?.length) {
        res.status(400).json({ message: 'no users found' })
    }

    res.status(200).json(users)
})


const getUserById = asyncHandler(async (req, res) => {

    const id = req.params.id
    console.log(id)
    let user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({
            error: "User not found"
        })

    }

    res.status(200).json(user)


})

const getUserStats = asyncHandler(async (req, res) => {

    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    const data = await User.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: lastYear
                }
            }
        },
        {


            $project: {
                month: {
                    $month: "$createdAt"
                },
            },

        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }
    ])


    if (!data) {
        res.status(401).json({ message: ' data not found' })
    }

    res.status(200).json(data)


})


module.exports = {
    updateUser,
    deleteUser,
    getUserById,
    getUserList,
    getUserStats
}