import React,{ useReducer,useState,useEffect, useContext,createContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate,useLocation } from 'react-router-dom';
import qs from 'qs'
import { authReducer } from '../reducer/authReducer';
import { LOGIN, LOGOUT, REGISTER, USER_BLOGS } from '../actions/authType';
import {axiosPrivateInstance, axiosPublicInstance} from '../../Utils/axios'


export const AuthContext = createContext()

// getting user and token from localStorage
const loadedUser  = JSON.parse(localStorage.getItem('user'))
const loadedToken = JSON.parse(localStorage.getItem('token'))

export function AuthProvider({children}) {
    const initialUserBlogs =[]
    const [userBlogs,dispatch] = useReducer(authReducer,initialUserBlogs)
    const [user,setUser] = useState(loadedUser?loadedUser : null)
    const [token,setToken] = useState(loadedToken?loadedToken : null)
    const [registerSubmit,setRegisterSubmit] = useState(false)
    const [loginSubmit,setLoginSubmit] = useState(false)
    const [profileSubmit,setProfileSubmit] = useState(false)
    const [passwordSubmit,setPasswordSubmit] = useState(false)
    const [multipleProfileData,setMultipleProfileData] = useState([])
    const [percentage,setPercentage] = useState(0)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        (async () => {
            if(user && token){
                loadAllProfile()
            }
        })()
    },[user,token,profileSubmit])

    useEffect(() => {
        (async () => {
            if(user && token){
                loadUserBlog()
            }
        })()
    },[user,token,profileSubmit])

    const passwordChange = async (data) => {
        try {
            setPasswordSubmit(true)
            const response = await axiosPrivateInstance(token).post('/auth/change-password/',{
            currentPassword : data.currentPassword,
            password : data.password,
            passwordConfirmation : data.passwordConfirmation
           }) 
           toast.success('Password change successfully,now you can login with new password', {
             position: "top-right",
             autoClose: 2000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
           });
           setPasswordSubmit(false)
           logout()
           navigate('/login')
         } catch (err) {
            setPasswordSubmit(false)
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

    const uploadPercentage = (total,loaded) => Math.floor((total/loaded)*100)
    const profile = async (data) => {
        const profileData= {
            user:user.id,
            firstName:data?.firstName,
            lastName:data?.lastName,
            facebookAccount:data?.facebookAccount,
            googlePlusAccount:data?.googlePlusAccount,
            instagramAccount:data?.instagramAccount,
            linkedinAccount:data?.linkedinAccount,
            twitterAccount:data?.twitterAccount,
        }
        const formData = new FormData()
        formData.append('files.profilePicture',data?.profilePicture[0],data?.profilePicture[0]?.name)
        formData.append('data',JSON.stringify(profileData))
       try {
          setProfileSubmit(true)
          const response = await axiosPrivateInstance(token).post('/profiles?populate=*',
            formData,
            {
                onUploadProgress:(progress) => {
                    const percentageData = uploadPercentage(progress.total,progress.loaded)
                    setPercentage(percentageData)
                }
            }
          )
          setProfileSubmit(false)
          toast.success('profile created successfully!')
       } catch (err) {
          setProfileSubmit(false)
          toast.error(err?.response?.data?.error?.message)
       }
    }
    
    const loadUserBlog = async () => {
        const query = qs.stringify({
            populate : [
                'blog_posts',
                'blog_posts.blog_image',
                'profile',
                'profile.profilePicture'
            ]
        })
        try {
            const response = await axiosPrivateInstance(token).get(`/users/me?${query}`)
            // console.log(response.data)
            const userBlogArr = response.data?.blog_posts?.map((blog) => {
                return ({
                    title : blog?.title,
                    id:blog?.id,
                    description : blog?.description,
                    blog_date : blog?.blog_date,
                    blog_image : blog?.blog_image?.url,
                    firstName : response.data?.profile?.firstName,
                    lastName : response.data?.profile?.lastName,
                    profilePicture : response.data?.profile?.profilePicture?.url,
                })
            })
            dispatch({type : USER_BLOGS,payload:userBlogArr})
        } catch (err) {
            console.log(err.response)
        }
    }

    const loadAllProfile = async () => {
       try {
         const response = await axiosPrivateInstance(token).get('/profiles?populate=*')
         const profileArr = response.data.data?.map((profile) => {
                return ({
                    profileId : profile?.id,
                    userId : profile?.attributes?.user?.data?.id,
                    profilePictureId : profile?.attributes?.profilePicture?.data?.id,
                    // userEmail : profile?.attributes?.user?.data?.attributes?.email,
                    firstName : profile?.attributes?.firstName,
                    lastName : profile?.attributes?.lastName,
                    facebookAccount : profile?.attributes?.facebookAccount,
                    twitterAccount : profile?.attributes?.twitterAccount,
                    googlePlusAccount : profile?.attributes?.googlePlusAccount,
                    instagramAccount : profile?.attributes?.instagramAccount,
                    linkedinAccount : profile?.attributes?.linkedinAccount,
                    profilePicture : profile?.attributes?.profilePicture?.data?.attributes?.formats?.thumbnail?.url ? profile?.attributes?.profilePicture?.data?.attributes?.formats?.thumbnail?.url : profile?.attributes?.profilePicture?.data?.attributes?.url,
                    imgId : profile?.attributes?.profilePicture?.data?.id,
                })
         })
         setMultipleProfileData(profileArr)
       } catch (err) {
         console.log(err.response)
       }
    }
 
    const login = async (data) => {
        try {
            setLoginSubmit(true)
            const response = await axiosPublicInstance.post('/auth/local',data)
            dispatch({type : LOGIN ,payload: {data : response.data,setUser,setToken}})
            navigate(location?.state?.from ? location?.state?.from : '/')
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
        profileSubmit,
        login,
        user,
        token,
        profile,
        percentage,
        multipleProfileData,
        loadAllProfile,
        userBlogs,
        passwordChange,
        passwordSubmit,
        loadUserBlog,
    }
  return (
    <AuthContext.Provider value={value}>
         {children}
    </AuthContext.Provider>
  )
}



