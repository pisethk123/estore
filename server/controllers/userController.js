import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/createToken.js'

// create user
const createUser = asyncHandler(async(req, res) => {

    const {username, email, password} = req.body
    if(!username || !email || !password) {
        throw new Error("all fields are required!")
    }

    const userExist = await User.findOne({email})
    if(userExist) {
        res.status(400).send("user already exists")
    }

    const hasdedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({username, email, password: hasdedPassword})

    try {
        await newUser.save()
        generateToken(res, newUser._id)
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        })
    } catch (error) {
        throw new Error("Invalid user data")
    }
})

// login user
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new Error("all field is required")
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
        const verifyUser = await bcrypt.compare(password, existingUser.password)
        
        if(verifyUser) {
            generateToken(res, existingUser._id)
            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            })
            return
        }
        return res.status(401).json({message: 'invalid password'}) 
    }
    return res.status(401).json({message: 'invalid email address'}) 
})

// logout user
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'logout successful'})
})

// get users
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({}).select("-password")
    res.status(200).json(users)
})

// get profile
const userProfile = asyncHandler(async(req, res) => {
    const userProfile = await User.findById(req.user._id).select("-password")
    res.status(200).json(userProfile)
})

// update user profile
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if(req.body.password) {
            const hasdedPassword = await bcrypt.hash(req.body.password, 10)
            user.password = hasdedPassword
        }

        const updatedUser = await user.save()
        res.status(200).json({message: "user updated"})
    }else{
        res.status(404).json({message: "user not found"}) 
    }
})

// delete user
const deleteUser  = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id) 
    if(user) {
        if(user.isAdmin) {
            res.status(400)
            throw new Error("cannot delete admin user")
        }
        const deletedUser = await User.deleteOne({_id: user._id})
        return res.status(200).json({message: "user deleted successfully"})
    }
    res.status(404).json({message: "user not found"})
})

// get specific user
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select("-password")

    if(user) {
        return res.status(200).json(user)
    }
    res.status(404)
    throw new Error("user not found")
})

// update user specific
const updateUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select("-password")

    if(user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)
        
        if(req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            user.password = hashedPassword
        }
        const updatedUser = await user.save()
        return res.status(200).json(updatedUser)
    }
    res.status(404)
    throw new Error("invalid user id")
})

export {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    userProfile,
    updateUserProfile,
    deleteUser,
    getUserById,
    updateUserById
}