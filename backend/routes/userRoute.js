const express = require('express');
const router = express.Router()

const {
    getUserById,

} = require('../controllers/userController')
const { requireSignIn,
    isAdmin,
    isAuth } = require('../controllers/authController')

router.get('/users/:userId', requireSignIn, isAuth, isAdmin, async (req, res) => {
    const profile = await req.profile
    console.log(profile)
    res.json({
        user: profile
    })
})

router.param('userId', getUserById)

module.exports = router