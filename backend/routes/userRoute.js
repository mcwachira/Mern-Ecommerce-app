const express = require('express')
const {
    updateUser,
    deleteUser,
    getUserById,
    getUserList,
    getUserStats } = require('../controllers/userController')
const { verifyToken, verifyAdmin } = require('../middleware/auth')

const router = express.Router()


//updating user
router.put('/user/:id', verifyToken, updateUser)

//delete user
router.delete('/user/:id', verifyToken, deleteUser)

//get all users
router.get('/users/find', verifyAdmin, getUserList)

//get a specific  user based on id
router.get('/users/find/:id', verifyToken, verifyAdmin, getUserById)


//get user stats

router.get('/users/stats', verifyAdmin, getUserStats)




module.exports = router