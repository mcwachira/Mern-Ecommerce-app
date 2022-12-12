const express = require('express');
const router = express.Router()
const { createCategory } = require('../controllers/categoryController')
const { isAuth, isAdmin, requireSignIn } = require('../controllers/authController')

const {
    getUserById,

} = require('../controllers/userController')

// creates a category
router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, createCategory)

router.param('userId', getUserById)

module.exports = router