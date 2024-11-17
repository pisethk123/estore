import express from 'express'
import { authUser, authorizedAsAdmin } from '../middlewares/authMiddleware.js'
import {
    createCategory,
    updateCategory,
    removeCategory,
    getCategories,
    getCategory
} from '../controllers/categoryController.js'

const router = express.Router()

router
.post('/', authUser, authorizedAsAdmin, createCategory)
.put('/:categoryId', authUser, authorizedAsAdmin, updateCategory)
.delete('/:categoryId', authUser, authorizedAsAdmin, removeCategory)
.get('/categories', authUser, authorizedAsAdmin, getCategories)
.get('/:categoryId', authUser, authorizedAsAdmin, getCategory)

export default router