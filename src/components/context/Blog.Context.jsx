import React,{ useReducer,useContext,createContext,useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import { axiosPrivateInstance } from '../../Utils/axios'
import { ADD, LOAD_ALL_BLOGS } from '../actions/blogType'
import { blogReducer } from '../reducer/blogReducer'
import { AuthContext } from './Auth.Context'


export const BlogContext = createContext()
const initialBlogs = []

export function BlogProvider({children}) {
  const [blogs,dispatch] = useReducer(blogReducer,initialBlogs)
  const {user,token} = useContext(AuthContext)
  const [blogSubmit,setBlogSubmit] = useState(false)
  const [loaded,setLoaded] = useState(false)
  const [loadedCategory,setLoadedCategory] = useState([])
  const [loadedLike,setLoadedLike] = useState(false)
  const [loadedUnLike,setLoadedUnLike] = useState(false)
  const navigate = useNavigate()
  const [percentage,setPercentage] = useState(0)

  useEffect(() => {
    if(user && token){
        (async () => {
          loadAllBlog()
        })()
    }
  },[user,token,loadedLike,loadedUnLike])

  useEffect(() => {
    if(user && token){
        (async () => {
          loadAllCategory()
        })()
    }
  },[user,token])


  const handleLike = async (blogId) => {
      try {
          setLoadedLike(true)
          const response = await axiosPrivateInstance(token).post('/likes?populate=*',{
          data : {
            blog_post : blogId,
            user:user.id
          }
        })
        setLoadedLike(false)
        toast.success('like successfully added!')
           
      } catch (err) {
        toast.error(err.response?.data?.error?.message)
      }
  }

  const handleUnLike = async (blogId,likeId) => {
    try {
        setLoadedUnLike(true)
        const response = await axiosPrivateInstance(token).delete(`/likes/${likeId}`)
        setLoadedUnLike(false)
        toast.success('like successfully deleted!')
    } catch (err) {
      toast.error(err.response?.data?.error?.message)
    }
}

  const query = qs.stringify({
    populate: {
      blog_image:{
        populate: ['attributes']
      },
      comments:{
        populate: ['data']
      },
      likes:{
        populate:['user']
      },
      categories:{
        populate: {
          blog_posts:{
              populate:['data']
          }
        }
      },
      author: {
        populate: {
          profile:{
            populate:['profilePicture']
          }
        },
      }
    }
  }, {
    encodeValuesOnly: true, 
  });

  const loadAllBlog = async () => {
    try {
      setLoaded(true)
      const response = await axiosPrivateInstance(token).get(`/blog-posts?${query}`)
      // console.log(response.data)
      const blogArray = response.data.data.map((data) =>{
          return (
            {
              blogId:data?.id,
              imgId:data?.attributes?.blog_image?.data?.id,
              authorId :data?.attributes?.author?.data?.id,
              profileId :data?.attributes?.author?.data?.attributes?.profile?.data?.id,
              categories : data?.attributes?.categories?.data,
              likes : data?.attributes?.likes?.data,
              profilePictureId :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.id,
              title : data?.attributes?.title,
              description:data?.attributes?.description,
              blog_image:data?.attributes?.blog_image?.data?.attributes?.url,
              blog_date:data?.attributes?.blog_date,
              firstName :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.firstName,
              lastName :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.lastName,
              address :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.address,
              facebookAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.facebookAccount,
              googleAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.googleAccount,
              instagramAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.instagramAccount,
              linkdinAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.linkdinAccount,
              twitterAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.twitterAccount,
              website :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.website,
              profilePicture :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.attributes?.url,
            }
          )
        })
      dispatch({type:LOAD_ALL_BLOGS,payload : blogArray})
      setLoaded(false)
     } catch (err) {
      setLoaded(false)
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
  
  const query_two = qs.stringify({
    populate : [
         'blog_posts',
         'blog_posts.likes',
         'blog_posts.comments',
         'blog_posts.blog_image',
         'blog_posts.author',
         'blog_posts.author.profile',
         'blog_posts.author.profile.profilePicture',
    ]
  })

  const loadAllCategory = async () => {
     try {
        const response = await axiosPrivateInstance(token).get(`/categories?${query_two}`)
        const categoryArr = response.data.data?.map((category) => {
           return ({
            categoryId:category?.id,
            name : category?.attributes?.name,
            totalPostLength : category?.attributes?.blog_posts.data.length,
            categoryWisePostData : category?.attributes?.blog_posts
           })
        })
        setLoadedCategory(categoryArr)
     } catch (err) {
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
  const createBlog = async (data) => {
     const blogData = {
        blog_date : data.blog_date,
        title : data.title,
        description : data.description,
        author:user.id,
        categories : Number(data.category)
     }
     try {
      setBlogSubmit(true)
      const formData = new FormData()
      formData.append('files.blog_image',data.blog_image[0],data.blog_image[0].name)
      formData.append('data',JSON.stringify(blogData))
      const response = await axiosPrivateInstance(token).post(`/blog-posts?${query}`,
      formData,
      {
        onUploadProgress:(progress) => {
            const percentageData = uploadPercentage(progress.total,progress.loaded)
            setPercentage(percentageData)
        }
      }
    )
    // console.log(response.data)
      const blogs_data ={
        blogId:response.data.data?.id,
        imgId:response.data.data?.attributes?.blog_image?.data?.id,
        authorId : response.data.data?.attributes?.author?.data?.id,
        profileId :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.id,
        profilePictureId :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.id,
        categories : response.data.data?.attributes?.categories?.data,
        likes : response.data.data?.attributes?.likes?.data,
        title : response.data.data?.attributes?.title,
        description:response.data.data?.attributes?.description,
        blog_image:response.data.data?.attributes?.blog_image?.data?.attributes?.url,
        blog_date:response.data.data?.attributes?.blog_date,
        firstName :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.firstName,
        lastName :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.lastName,
        address :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.address,
        facebookAccount :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.facebookAccount,
        googleAccount :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.googleAccount,
        instagramAccount :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.instagramAccount,
        linkdinAccount :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.linkdinAccount,
        twitterAccount :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.twitterAccount,
        website :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.website,
        profilePicture :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.attributes?.url,
     }
      dispatch({type:ADD,payload : blogs_data})
        navigate('/all-blogs')
        toast.success('Blog created successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBlogSubmit(false)
     } catch (err) {
      setBlogSubmit(false)
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
  const value = {
    createBlog,
    blogs,
    loadAllBlog,
    blogSubmit,
    percentage,
    blogs,
    loaded,
    loadedCategory,
    handleLike,
    handleUnLike,
  }
  return (
    <BlogContext.Provider value={value}>
          {children}
    </BlogContext.Provider>
  )
}
