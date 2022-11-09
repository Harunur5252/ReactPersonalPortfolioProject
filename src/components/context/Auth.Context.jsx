import React,{ useReducer,useState,useEffect, useContext,createContext } from 'react';
import { toast } from 'react-toastify';
import slugify from 'slugify'
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
    const [blogUpdate,setBlogUpdate] = useState(false)
    const [blogImgDelete,setBlogImgDelete] = useState(false)
    const [userBlogDelete,setUserBlogDelete] = useState(false)
    const [multipleProfileData,setMultipleProfileData] = useState([])
    const [percentage,setPercentage] = useState(0)
    const [imageError,setImageError] = useState({
        error:''
    })

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
    },[user,token,profileSubmit,blogUpdate,blogImgDelete,userBlogDelete])

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

    const deleteUserBlogImg = async (imgId) => {
        try {
            setBlogImgDelete(true)
            const response = await axiosPrivateInstance(token).delete(`upload/files/${imgId}`)
            setBlogImgDelete(false)
        } catch (err) {
            setBlogImgDelete(false)
            console.log(err.response)
        }
    }

    const blogDelete = async (id) => {
       try {
        setUserBlogDelete(true)
         const response = await axiosPrivateInstance(token).delete(`/blog-posts/${id}`)
         toast.success('blog deleted successfully!')
         setUserBlogDelete(false)
       } catch (err) {
        setUserBlogDelete(false)
        toast.success(err?.response?.data?.error?.message)
       }
    }

    const userBlogUpdate = async (data,foundBlog) => {
        const blogData = {
			title : data.title,
			description : data.description,
			blog_date : data.blog_date,
			author:user?.id,
		}

		try {
            if((blogData.title && blogData.description && blogData.blog_date)  && (data?.blog_image[0]  && foundBlog?.imgId)){
                setImageError({
                    error : 'You have already an image,if you want to update then delete before image'
                })
                toast.error('already an image exist')
            }else if((blogData.title && blogData.description && blogData.blog_date && data?.blog_image[0]) && !foundBlog?.imgId){
                const formData = new FormData()
                formData.append('files.blog_image',data?.blog_image[0],data?.blog_image[0]?.name)
                formData.append('data',JSON.stringify(blogData))
                setBlogUpdate(true)
                const response = await axiosPrivateInstance(token).put(`/blog-posts/${foundBlog?.blogId}`,
                  formData
                )
                setImageError({
                    error : ''
                })
                setBlogUpdate(false)
                toast.success('blog updated successfully with image!')
            }else if((blogData.title || blogData.description || blogData.blog_date) && (data?.blog_image[0] && !foundBlog?.imgId)){
                const formData = new FormData()
                formData.append('files.blog_image',data?.blog_image[0],data?.blog_image[0]?.name)
                formData.append('data',JSON.stringify(blogData))
                setBlogUpdate(true)
                const response = await axiosPrivateInstance(token).put(`/blog-posts/${foundBlog?.blogId}`,
                  formData
                )
                setImageError({
                    error : ''
                })
                setBlogUpdate(false)
                toast.success('blog updated successfully with image!')
            }else if(blogData.title && blogData.description && blogData.blog_date){
                setBlogUpdate(true)
                const response = await axiosPrivateInstance(token).put(`/blog-posts/${foundBlog?.blogId}`,
                  {
                    data : blogData
                  }
                )
                if(foundBlog?.imgId){
                    setImageError({
                    error : 'You have already an image,if you want to update then delete before image'
                   })
                }else if(!foundBlog?.imgId){
                    setImageError({
                        error : ''
                    })
                }
                
                setBlogUpdate(false)
                toast.success('blog update successfully!')
            }else if (blogData.title || blogData.description || blogData.blog_date){
                setBlogUpdate(true)
                const response = await axiosPrivateInstance(token).put(`/blog-posts/${foundBlog?.blogId}`,
                  {
                    data : blogData
                  }
                )
                if(foundBlog?.imgId){
                    setImageError({
                    error : 'You have already an image,if you want to update then delete before image'
                   })
                }else if(!foundBlog?.imgId){
                    setImageError({
                        error : ''
                    })
                }
                
                setBlogUpdate(false)
                toast.success('blog update successfully!')
            }else if((!blogData.title && !blogData.description && !blogData.blog_date) && !data?.blog_image[0]){
                toast.error('please fill up fields')
            }else if((data?.blog_image[0] && !foundBlog?.imgId) && (!blogData?.title || !blogData?.description || !blogData?.blog_date)){
                toast.error('please fill up other fields with image')
            }else if((data?.blog_image[0] && !foundBlog?.imgId) && (!blogData?.title && !blogData?.description && !blogData?.blog_date)){
                toast.error('please fill up other fields with image')
            }
           } catch (err) {
               setBlogUpdate(false)
               console.log(err.response)
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
                    slug : blog?.slug,
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
        userBlogUpdate,
        blogUpdate,
        deleteUserBlogImg,
        blogImgDelete,
        imageError,
        blogDelete,
        userBlogDelete
    }
  return (
    <AuthContext.Provider value={value}>
         {children}
    </AuthContext.Provider>
  )
}



