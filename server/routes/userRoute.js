import express from 'express'
import {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    userProfile,
    updateUserProfile,
    deleteUser,
    getUserById,
    updateUserById
} from '../controllers/userController.js'
import { authUser, authorizedAsAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router
// user routes
.post('/', createUser)
.post('/auth', loginUser)
.post('/logout', logoutUser)
.get('/profile', authUser, userProfile)
.put('/profile', authUser, updateUserProfile)
// admin routes
.get('/', authUser, getAllUsers)
.delete('/:id', authUser, authorizedAsAdmin, deleteUser)
.get('/:id', authUser, authorizedAsAdmin, getUserById)
.put('/:id', authUser, authorizedAsAdmin, updateUserById)

export default router