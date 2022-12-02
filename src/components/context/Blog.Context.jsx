import React,{ useReducer,useContext,createContext,useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
// import TurndownService from 'turndown'

import slugify from 'slugify'
import qs from 'qs'
import { axiosPrivateInstance } from '../../Utils/axios'
import { ADD, LOAD_ALL_BLOGS } from '../actions/blogType'
import { blogReducer } from '../reducer/blogReducer'
import { AuthContext } from './Auth.Context'


export const BlogContext = createContext()
const initialBlogs = []
const initialBlogsWithoutPaginationData = []

export function BlogProvider({children}) {
  const [blogs,dispatch] = useReducer(blogReducer,initialBlogs)
  const [blogsWithoutPaginationData,setBlogsWithoutPaginationData] = useState(initialBlogsWithoutPaginationData)
  const {user,token,loadUserBlog,loginSubmit,registerSubmit,blogUpdate,blogImgDelete,userBlogDelete} = useContext(AuthContext)
  const [blogSubmit,setBlogSubmit] = useState(false)

  const [loaded,setLoaded] = useState(false)
  const [loadedCategory,setLoadedCategory] = useState([])
  const [tags,setTags] = useState([])

  const [commentLoadedArr,setCommentLoadedArr] = useState([])
  const [commentSubmit,setCommentSubmit] = useState(false)

  const [loadedLike,setLoadedLike] = useState(false)
  const [trigger,setTrigger] = useState(false)
  const [loadedUnLike,setLoadedUnLike] = useState(false)
  const navigate = useNavigate()
  const [percentage,setPercentage] = useState(0)
  const [pageNumber,setPageNumber] = useState(1)
  const [pageCount,setPageCount] = useState(null)

  useEffect(() => {
    if(loginSubmit || registerSubmit){
      setPageNumber(1)
    }
  },[loginSubmit,registerSubmit])

  useEffect(() => {
    if(user && token){
        (async () => {
          loadAllBlog()
        })()
    }
  },[user,token,pageNumber,trigger,blogSubmit,blogImgDelete,blogUpdate,userBlogDelete])

  useEffect(() => {
    if(user && token){
        (async () => {
          loadAllTag()
        })()
    }
  },[user,token,blogSubmit,userBlogDelete])

  useEffect(() => {
    if(user && token){
        (async () => {
          loadAllBlogWithoutPagination()
        })()
    }
  },[user,token,loadedLike,loadedUnLike,blogSubmit,blogImgDelete,blogUpdate,userBlogDelete])

  useEffect(() => {
    if(user && token){
        (async () => {
          loadAllCategory()
        })()
    }
  },[user,token,blogSubmit,userBlogDelete])

  useEffect(() => {
    if(user && token){
        (async () => {
          loadAllComment()
        })()
    }
  },[user,token,commentSubmit,userBlogDelete])

  useEffect(() => {
    (async () => {
        if(user && token){
            loadUserBlog()
        }
    })()
},[user,token,blogSubmit])



  const loadAllComment = async () => {
    const query = qs.stringify({
      populate : [
         'replay_comments',
         'replay_comments.comment',
         'replay_comments.comment.blog_post',
         'replay_comments.user',
         'replay_comments.user.profile',
         'replay_comments.user.profile.profilePicture',
         'blog_post',
         'user',
         'user.profile',
         'user.profile.profilePicture'
      ]
   })
     try {
        const response = await axiosPrivateInstance(token).get(`/comments?${query}`)
        // console.log(response.data)
        const commentArr = response.data?.data?.map((comment) => {
            return ({
              cmtId : comment?.id,
              blogId: comment?.attributes?.blog_post?.data?.id,
              userId : comment?.attributes?.user?.data?.id,
              replay_comments:comment?.attributes?.replay_comments,
              profilePictureId : comment?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.id,
              description: comment?.attributes?.description,
              commentDate: comment?.attributes?.commentDate,
              userProfileId : comment?.attributes?.user?.data?.attributes?.profile?.data?.id,
              firstName : comment?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.firstName,
              lastName : comment?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.lastName,
              profilePicture : comment?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.attributes?.url,
            })
        })
        setCommentLoadedArr(commentArr)
     } catch (err) {
        console.log(err.response)
     }
  }

  const comment = async (data,blogId) => {
     const commentData = {
        description : data?.description,
        commentDate: new Date(),
        blog_post : blogId,
        user : user?.id,
     }
     try {
      setCommentSubmit(true)
       const response = await axiosPrivateInstance(token).post('/comments?populate=*',
       {
           data : commentData
       }
       ) 
       setCommentSubmit(false)
       toast.success('comment added successfully')
     } catch (err) {
        setCommentSubmit(false)
        toast.error(err?.response?.data?.error?.message)
     }
  }

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

  const loadAllBlog = async () => {
    const query = qs.stringify({
      sort:['id:desc'],
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
      },
      pagination:{
        page:pageNumber,
        pageSize:5
      }
    }, {
      encodeValuesOnly: true, 
    });

    try {
      setLoaded(true)
      const response = await axiosPrivateInstance(token).get(`/blog-posts?${query}`)
      const blogArray = response.data?.data?.map((data) =>{
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
              slug : data?.attributes?.slug,
              description:data?.attributes?.description,
              blog_image:data?.attributes?.blog_image?.data?.attributes?.url,
              blog_date:data?.attributes?.blog_date,
              firstName :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.firstName,
              lastName :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.lastName,
              address :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.address,
              facebookAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.facebookAccount,
              googlePlusAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.googlePlusAccount,
              instagramAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.instagramAccount,
              linkedinAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.linkedinAccount,
              twitterAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.twitterAccount,
              website :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.website,
              profilePicture :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.attributes?.url,
            }
          )
      })
      dispatch({type:LOAD_ALL_BLOGS,payload : blogArray})
      setPageCount(response.data?.meta?.pagination?.pageCount)
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

  const loadAllBlogWithoutPagination = async () => {
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
    try {
      const response = await axiosPrivateInstance(token).get(`/blog-posts?${query}`)
      const blogArray = response.data?.data?.map((data) =>{
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
              slug : data?.attributes?.slug,
              description:data?.attributes?.description,
              blog_image:data?.attributes?.blog_image?.data?.attributes?.url,
              blog_date:data?.attributes?.blog_date,
              firstName :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.firstName,
              lastName :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.lastName,
              facebookAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.facebookAccount,
              googlePlusAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.googlePlusAccount,
              instagramAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.instagramAccount,
              linkedinAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.linkedinAccount,
              twitterAccount :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.twitterAccount,
              profilePicture :data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.attributes?.url,
            }
          )
      })
      setBlogsWithoutPaginationData(blogArray)
    } catch (err) {
       console.log(err.response)
    }
  }

  const loadAllTag = async () => {
    const query = qs.stringify({
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
    try {
      const response = await axiosPrivateInstance(token).get(`/tags?${query}`)
      const tagArr = response.data.data?.map((tag) => {
        return ({
         tagId:tag?.id,
         name : tag?.attributes?.name,
         slug : tag?.attributes?.slug,
         tagWisePostData : tag?.attributes?.blog_posts
        })
     })
     setTags(tagArr)
    } catch (err) {
      console.log(err.response)
    }
  }

  const loadAllCategory = async () => {
    const query = qs.stringify({
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
     try {
        const response = await axiosPrivateInstance(token).get(`/categories?${query}`)
        const categoryArr = response.data.data?.map((category) => {
           return ({
            categoryId:category?.id,
            slug:category?.attributes?.slug,
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
  const createBlog = async (data,des) => {
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
     const blogData = {
        blog_date : data.blog_date,
        title : data.title,
        slug:slugify(data.title,{
          replacement: '-',
          remove: undefined,
          lower: true, 
          strict: false,
          trim: true 
        }),
        description : des,
        author:user?.id,
        categories : data.category,
        tags:data.tag
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
      const blogs_data = {
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
        googlePlusAccount :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.googlePlusAccount,
        instagramAccount :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.instagramAccount,
        linkedinAccount :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.linkedinAccount,
        twitterAccount :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.twitterAccount,
        website :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.website,
        profilePicture :response.data.data?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.attributes?.url,
     }
     setTrigger(!trigger)
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
      console.log(err.response)
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
    loadAllBlog,
    blogSubmit,
    percentage,
    blogs,
    tags,
    blogsWithoutPaginationData,
    loaded,
    loadedCategory,
    handleLike,
    handleUnLike,
    comment,
    commentSubmit,
    commentLoadedArr,
    pageCount,
    pageNumber,
    setPageNumber,
    loadAllComment,
    loadAllBlogWithoutPagination,
  }

  return (
    <BlogContext.Provider value={value}>
          {children}
    </BlogContext.Provider>
  )
}
