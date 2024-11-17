import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'

const Login = () => {
    const [formField, setFormField] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()

    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const searchParam = new URLSearchParams(search)
    const redirect = searchParam.get('redirect') || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const formChangeHandler = (e) => {
        setFormField({...formField, [e.target.id]: e.target.value})
    }
    
    const submitHandler = async(e) => {
        e.preventDefault()
        
        try {
            const res = await login(formField).unwrap()
            dispatch(setCredentials({...res}))
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
            <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

            <form onSubmit={submitHandler} className='container w-[40rem]'>
                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                    <input id='email' type="email" className="mt-1 p-2 border rounde w-full" value={formField.email} onChange={formChangeHandler}/>
                </div>

                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-sm font-medium">Password</label>
                    <input id='password' type="password" className="mt-1 p-2 border rounde w-full" value={formField.password} onChange={formChangeHandler}/>
                </div>
                
                <button type='submit' disabled={isLoading} className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>
                    {isLoading? "Sign In...": "Sign In"}
                </button>
                {isLoading && <Loader/>}
            </form>

            <div className="mt-4">
                    <p>
                        New Customer? 
                        {" "}
                        <Link to={redirect? `/register?redirect=${redirect}`: "/register"} className='text-pink-500 hover:underline'>Register</Link>
                    </p>
                </div>
        </div>
      </section>
    </div>
  )
}

export default Login
