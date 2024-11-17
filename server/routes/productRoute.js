import express from 'express'
import formidable from 'express-formidable'
import { authUser, authorizedAsAdmin } from '../middlewares/authMiddleware.js'
import checkId from '../middlewares/checkId.js'
import {
    addProduct,
    updateProductDetails,
    removeProduct,
    getProducts,
    getProduct,
    getAllProducts,
    addProductReview,
    topProduct,
    newProduct,
    filteredProducts
} from '../controllers/productController.js'

const router = express.Router()

router
.get('/top', topProduct)
.get('/getallproducts', getAllProducts)
.get('/newproduct', newProduct)

.post('/:id/reviews', authUser, checkId, addProductReview)
.post('/', authUser, authorizedAsAdmin, addProduct)
.put('/:id', authUser, authorizedAsAdmin, updateProductDetails)
.delete('/:id', authUser, authorizedAsAdmin, removeProduct)
.get('/', getProducts)
.get('/:id', getProduct)

.post('/filtered-products', filteredProducts)

export default router