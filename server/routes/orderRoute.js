import express from 'express'
import { authorizedAsAdmin, authUser } from '../middlewares/authMiddleware.js'
const router = express.Router()

import {
    createOrder,
    getAllOrders,
    getUserOrder,
    countTotalOrders,
    totalSales,
    totalSalesByDate,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDelivered
} from '../controllers/orderController.js'

router
.post('/', authUser, createOrder)
.get('/', authUser, authorizedAsAdmin, getAllOrders)

.get('/:id', authUser, findOrderById)
.put('/:id/pay', authUser, markOrderAsPaid)
.put('/:id/deliver', authUser, authorizedAsAdmin, markOrderAsDelivered)

.get('/mine', authUser, getUserOrder)
.get('/total-orders', countTotalOrders)
.get('/total-sales', totalSales)
.get('/total-sales-by-date', totalSalesByDate)


export default router