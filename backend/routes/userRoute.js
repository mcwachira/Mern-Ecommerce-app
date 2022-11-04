const express = require('express');
const {protect} = require('../middleware/authMIddleware')
const router = express.Router()
const { registerUser,
    loginUser,
    getUserData } = require('../controllers/userController')

//register user
router.post('/', registerUser);

//login user
router.post('/login', loginUser);


router.get('/me', protect, getUserData);

module.exports = router