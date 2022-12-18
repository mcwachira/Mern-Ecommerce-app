const express = require('express')

const router = express.Router()
const {
    registerUser,
    logInUser
} = require('../controllers/authController')


router.post('/auth/register', registerUser)

router.post('/auth/logIn', logInUser)



module.exports = router