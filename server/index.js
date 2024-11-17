// packages
import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import orderRoute from './routes/orderRoute.js'

dotenv.config()
connectDB()

const port = process.env.PORT || 8000


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/users', userRoute)
app.use('/api/category', categoryRoute)
app.use('/api/products', productRoute)
app.use("/api/upload", uploadRoute)
app.use("/api/order", orderRoute)

app.use('/api/config/paypal', (req, res)=>{
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname + '/uploads')))
app.listen(port, () => console.log('server is running on port: '+ port))