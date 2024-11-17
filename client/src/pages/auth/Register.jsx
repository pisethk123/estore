import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
    const [formField, setFormField] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const searchParam = new URLSearchParams(search)
    const redirect = searchParam.get('redirect') || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const onChangeHandler = (e) => {
        setFormField({...formField, [e.target.id]: e.target.value})
    }

    const submitHandler = async(e) => {
        e.preventDefault()

         try {
            if(formField.password !== formField.confirmPassword) {
                return toast.error('password do not match')
            }
            const res = await register(formField)
            dispatch(setCredentials({...res}))
         } catch (error) {
            toast.error(error?.data?.message || error.message)
         }
    }

  return <section className="pl-[10rem] flex flex-wrap">
    <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb4">Register</h1>

        <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
                <label htmlFor="name" className="block text-sm font-medium">Username</label>
                <input type="text" className="mt-1 p-2 border rounded w-full" placeholder="Enter name" id='username' value={formField.username} onChange={onChangeHandler}/>
            </div>

            <div className="my-[2rem]">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input type="email" className="mt-1 p-2 border rounded w-full" placeholder="Enter email" id='email' value={formField.email} onChange={onChangeHandler}/>
            </div>

            <div className="my-[2rem]">
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input type="password" className="mt-1 p-2 border rounded w-full" placeholder="Enter password" id='password' value={formField.password} onChange={onChangeHandler}/>
            </div>

            <div className="my-[2rem]">
                <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                <input type="password" className="mt-1 p-2 border rounded w-full" placeholder="Enter confirm password" id='confirmPassword' value={formField.confirmPassword} onChange={onChangeHandler}/>
            </div>

            <button 
            disabled={isLoading}
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            type="submit">{isLoading? "Registering...": "Register"}</button>

            <div className="mt-4">
                <span>Already have an account?</span>
                {" "}
                <Link to={redirect? `/login?redirect=${redirect}`: "/login"} className="text-pink-500 hover:underline">Login</Link>
            </div>
        </form>
    </div>
  </section>;
};

export default Register;
