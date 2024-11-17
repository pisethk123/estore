import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

const authUser = asyncHandler(async(req, res, next) => {
    const token = req.cookies.jwt
    if(token) {
        const {userId} = jwt.verify(token, process.env.JWT_SECRET)
        if(userId) {
            req.user = await User.findById(userId).select("-password")
            return next()
        }
        return res.status(401).json({message: "not authorized, token failed"})
    }
    throw new Error("not authorized, no token")
}) 

const authorizedAsAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    }else{
        res.status(401).json({message: "not authorized as admin"})
    }
}

export { authUser, authorizedAsAdmin }