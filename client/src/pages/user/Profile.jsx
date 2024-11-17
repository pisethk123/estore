import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
    const [formField, setFormField] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth)
    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

    useEffect(() => {
        setFormField({...formField, username: userInfo.username, email: userInfo.email})
    }, [userInfo.email, userInfo.username])
    
    const channgeHandler = (e) => {
        setFormField({...formField, [e.target.id]: e.target.value})
    }

    const submitHandler = async(e) => {
        e.preventDefault()
        
        try {
            if(formField.password || formField.confirmPassword) {
                if(formField.password !== formField.confirmPassword) {
                    toast.error('password do not match')
                }
            }

            const res = await updateProfile(formField).unwrap()
            dispatch(setCredentials({...res}))
            toast.success("profile updated successfully")
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }
    
  return <div className="container mx-auto p-4 mt-[10rem]">
    <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2">Name</label>
                    <input type="text" className="form-input p-2 rounded-sm w-full" placeholder="Enter name" value={formField.username} id="username" onChange={channgeHandler}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input type="email" className="form-input p-2 rounded-sm w-full" placeholder="Enter email" value={formField.email} id="email" onChange={channgeHandler}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">New Password</label>
                    <input type="password" className="form-input p-2 rounded-sm w-full" placeholder="Enter password" value={formField.password} id="password" onChange={channgeHandler}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block mb-2">Confirm password</label>
                    <input type="password" className="form-input p-2 rounded-sm w-full" placeholder="Enter confirm password" value={formField.confirmPassword} id="confirmPassword" onChange={channgeHandler}/>
                </div>

                <div className="flex justify-between">
                    <button type="submit" className="text-white bg-pink-500 py-2 px-4 rounded hover:bg-pink-600">Update</button>
                    <Link to={'/users-orders'} className="text-white bg-pink-600 py-2 px-4 rounded hover:bg-pink-700">My Orders</Link>
                </div>
            </form>
        </div>
        
    </div>
  </div>
};

export default Profile;
