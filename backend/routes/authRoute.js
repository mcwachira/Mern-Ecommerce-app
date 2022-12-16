const express = require('express')

const router = express.Router()
const {
    registerUser,
    logInUser
} = require('../controllers/authController')


router.post('/register', registerUser)

router.post('/logIn', logInUser)



module.exports = router