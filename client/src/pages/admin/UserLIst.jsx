import React, { useEffect, useState } from "react";
import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation
} from '../../redux/api/usersApiSlice'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { TiDelete } from "react-icons/ti";

const UserLIst = () => {
    const {data: users, refetch, isLoading, error} = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const [editableUser, setEditableUser] = useState({
        userId: null,
        username: '',
        email: '',
        isAdmin: false
    })

    useEffect(() => {
        refetch()
    }, [refetch])

    const changeHandler = (e) => {
        setEditableUser({...editableUser, [e.target.id]: e.target.value})
    }

    const focusHandler = (user) => {
        setEditableUser(user)
    }

    const keyUpHandler  = async(e) => {
        await updateUser(editableUser).unwrap()
    }

    const deleteHandler = async(user) => {
        await deleteUser(user._id)
    }

    
  return <div className="px-20">
    <h1 className="text-2xl font-semibold mb-4">users</h1>
    {isLoading? <Loader/>
    : error? (<Message variant='danger'>{error?.data.message || error.message}</Message>)
    : (<div className="flex flex-col md:flex-row">
        {/* Admin Menu */}
        <table className="w-full md:w-4/5 mx-auto border-collapse">
            <thead>
                <tr className="bg-black text-gray-200">
                    <th className="px-4 py-2 text-left border border-slate-400">#</th>
                    <th className="px-4 py-2 text-left border border-slate-400">Name</th>
                    <th className="px-4 py-2 text-left border border-slate-400">Email</th>
                    <th className="px-4 py-2 text-left border border-slate-400">Admin</th>
                    <th className="px-4 py-2 text-left border border-slate-400"></th>
                </tr>
            </thead>

            <tbody>
                {users.map(user => (
                    <tr key={user._id} onFocus={() => focusHandler(user)} className="hover:bg-blue-100">
                        <td className="px-4 py-2 border border-slate-400">{user._id}</td>
                        <td className="border border-slate-400">
                            <input className="outline-blue-500 bg-transparent px-4 py-2 w-full" type="text" defaultValue={user.username} id="username" onKeyUp={keyUpHandler} onChange={changeHandler}/>
                        </td>
                        <td className="border border-slate-400">
                            <input className="outline-blue-500 bg-transparent px-4 py-2 w-full" type="text" defaultValue={user.email} id="email" onKeyUp={keyUpHandler} onChange={changeHandler} />
                        </td>
                        <td className="border border-slate-400">
                            <select className="outline-blue-500 bg-transparent px-4 py-2 w-full" id="isAdmin" defaultValue={user.isAdmin} onKeyUp={keyUpHandler} onChange={changeHandler}>
                                <option value={true}>true</option>
                                <option value={false}>false</option>
                            </select>
                        </td >     
                        <td className="border border-slate-400 ">
                            <TiDelete className="text-center w-full text-2xl text-red-400" onClick={() => deleteHandler(user)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)}
  </div>;
};

export default UserLIst;
