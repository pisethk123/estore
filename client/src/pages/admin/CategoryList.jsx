import React, { useState } from "react";
import { toast } from "react-toastify";
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoryQuery
} from '../../redux/api/categoryApi'
import { TiDelete } from "react-icons/ti";
import { userApiSlce } from "../../redux/api/usersApiSlice";

const CategoryList = () => {
    const {data: categories} = useGetAllCategoryQuery()  
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()
    const [createCategory] = useCreateCategoryMutation()
    const [categoryName, setCategoryName] = useState({id: null,
        name: ''
    })
    const [newCat, setNewCat] = useState('')
    const focusHandler = (category) => {
        setCategoryName(category)
    }

    const changeHandler = (e) => {
        setCategoryName({...categoryName, [e.target.id]: e.target.value})

    }

    const keyUpHandler = async() => {
        await updateCategory(categoryName)
    }

    const deleteHandler = async(category) => {
        await deleteCategory(category._id)
    }

    const addChangeHandler = (e) => {
        setNewCat(e.target.value)
    }

    const addCatHandler = async(e) => {
        e.preventDefault()

        await createCategory({name: newCat})
        setNewCat('')
    }

    return <div className="ml-[10rem]">
        <h1 className="text-2xl font-semibold mb-2 mt-4">Add New Category</h1>
        <form onSubmit={addCatHandler}>
            <input type="text" value={newCat} className="py-2 px-4 m-auto w-1/2  border border-slate-400 outline-blue-300" onChange={addChangeHandler}/>
            <br />
            <button type="submit" className="bg-green-600 mt-2 py-2 px-4 rounded text-white">Add NEw cat</button>
        </form>

        <h1 className="text-2xl font-semibold mb-2 mt-4">All categories</h1>
        <table>
            <thead>
                <tr>
                    <th className="py-2 px-4 border border-gray-200">#</th>
                    <th className="py-2 px-4 border border-gray-200">name</th>
                    <th className="py-2 px-4 border border-gray-200"></th>
                </tr>
            </thead>
            <tbody>
                {categories && categories.map(category => (
                    <tr key={category._id} onFocus={() => focusHandler(category)}>
                        <td className="py-2 px-4 border border-gray-200">{category._id}</td>
                        <td className="border border-gray-200">
                            <input type="text" defaultValue={category.name} className="py-2 px-4 m-auto w-full outline-blue-300" onChange={changeHandler} onKeyUp={keyUpHandler} id="name"/>
                        </td>
                        <td className="py-2 px-4 border border-gray-200">
                            <TiDelete onClick={() => deleteHandler(category)} fontSize={24} color="red"/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>;
};

export default CategoryList;
