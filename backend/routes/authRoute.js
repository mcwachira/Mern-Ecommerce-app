const express = require('express');
const router = express.Router()
//const expressValidator = require('../validator/index')
const { registerUser,
    signInUser,
    signOutUser,
    requireSignIn,
    getUserData } = require('../controllers/authController')

//register user
router.post('/auth/signup', registerUser);

//login user
router.post('/auth/signin', signInUser);

//sign out user

router.get('/auth/signout', signOutUser)


// router.get('/me', protect, getUserData);

module.exports = router