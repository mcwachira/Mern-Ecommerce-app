import express from 'express'
import {
    authUser, registerUser, logOutUser, getUserProfile, updateUserProfile,    getUsers,
    getUserById ,updateUser, deleteUser
} from '../controllers/UserController.js'
import { protect , admin} from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)


router.post('/auth', authUser)

router.post('/register', registerUser)

router.post('/logout', logOutUser)

router.get('/profile', protect,  getUserProfile)

router.put('/profile',protect, updateUserProfile)

router.get('/:id',protect, admin,getUserById )

router.put('/:id',protect,admin, updateUser)

router.delete('/:id',protect, admin,deleteUser)

export default router