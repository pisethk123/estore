import { response } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import Category from '../models/categoryModel.js'

const createCategory = asyncHandler(async(req, res) => {
    try {
        const {name} = req.body
        
        if(!name) {
            return res.json({error: "name is required"})
        }

        if(await Category.findOne({name})) {
            return res.json({error: "Already exist"})
        }
        const category = await new Category({name}).save()
        res.json(category)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

const updateCategory = asyncHandler(async(req, res) => {
    try {
        const {name} = req.body
        const {categoryId} = req.params

        const category = await Category.findOne({_id: categoryId})
        if(!category) {
            return res.status(404).json({error: "category not found"})
        }

        if(!name) {
            return res.status(404).json({error: "name is required"})
        }

        category.name = name
        const updatedCategory = await category.save()
        return res.status(200).json(updatedCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
})

const removeCategory = asyncHandler(async(req, res) => {
    const {categoryId} = req.params
    const category = await Category.findById(categoryId)

    if(!category) {
        return res.status(404).json({message: "message not found"})
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId)
    return res.status(200).json({message: "category deleted successfully"})
})

const getCategories = asyncHandler(async(req, res) => {
    try {
        const categories = await Category.find({})
        return res.status(200).json(categories)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: 'internal server error'})
    }
})

const getCategory = asyncHandler(async(req, res) => {
    try {
        const {categoryId} = req.params
        const category = await Category.findById(categoryId)
        return res.status(200).json(category)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: 'internal server error'})
    }
})

export {
    createCategory,
    updateCategory,
    removeCategory,
    getCategories,
    getCategory
}