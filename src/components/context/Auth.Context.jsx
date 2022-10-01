import React,{ useReducer,useState } from 'react';
import { createContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { authReducer } from '../reducer/authReducer';
import { LOGIN, LOGOUT, REGISTER } from '../actions/authType';
import {axiosPublicInstance} from '../../Utils/axios'


export const AuthContext = createContext()

// getting user and token from localStorage
const loadedUser  = JSON.parse(localStorage.getItem('user'))
const loadedToken = JSON.parse(localStorage.getItem('token'))

export function AuthProvider({children}) {
    const initialUserContacts =[]
    const [userBlogs,dispatch] = useReducer(authReducer,initialUserContacts)
    const [user,setUser] = useState(loadedUser?loadedUser : null)
    const [token,setToken] = useState(loadedToken?loadedToken : null)
    const [registerSubmit,setRegisterSubmit] = useState(false)
    const [loginSubmit,setLoginSubmit] = useState(false)
    const [logoutTrack,setLogoutTrack] = useState(false)
    const navigate = useNavigate()
    
    const login = async (data) => {
        try {
            setLoginSubmit(true)
            const response = await axiosPublicInstance.post('/auth/local',data)
            dispatch({type : LOGIN ,payload: {data : response.data,setUser,setToken}})
            navigate('/')
            toast.success('Login successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
             });
             setLoginSubmit(false)
        } catch (err) {
            setLoginSubmit(false)
            toast.error(err.response?.data?.error?.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const registerUser = async (data) => {
        try {
            setRegisterSubmit(true)
            const response = await axiosPublicInstance.post('/auth/local/register',data)
            dispatch({type : REGISTER ,payload: {data : response.data,setUser,setToken}})
            navigate('/')
            toast.success('Registration successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
             });
             setRegisterSubmit(false)
        } catch (err) {
            setRegisterSubmit(false)
            toast.error(err.response?.data?.error?.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const logout = () => {
        dispatch({type : LOGOUT , payload : {setUser,setToken}})
        navigate('/login')
        setLogoutTrack(true)
        toast.success('Logout successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }

    const value = {
        registerUser,
        logout,
        registerSubmit,
        loginSubmit,
        login,
        user,
        token,
        logoutTrack
    }
  return (
    <AuthContext.Provider value={value}>
         {children}
    </AuthContext.Provider>
  )
}



