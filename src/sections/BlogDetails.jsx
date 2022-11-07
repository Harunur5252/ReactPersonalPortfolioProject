import React,{ useContext,useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import format from 'date-fns/format'
import { FaThumbsUp,FaThumbsDown } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {motion} from 'framer-motion'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BlogContext } from '../components/context/Blog.Context'
import { AuthContext } from '../components/context/Auth.Context';
import Layout from '../components/layouts/Layout'
import Comment from '../components/Comment';


    // validation rules for all input fields
	const schema = yup.object({
		description: yup.string().required('description is required').min(5,'userName must be 5 or more').max(5000,'userName must be equal or less than 5000'),
	})


function BlogDetails() {
	const { register,reset, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
		resolver: yupResolver(schema)
	});

	const {blogs,tags,blogsWithoutPaginationData,handleLike,handleUnLike,loadedCategory,comment,commentSubmit,commentLoadedArr} = useContext(BlogContext)
	const {user,token,} = useContext(AuthContext)
	const [blog,setBlog] = useState({})
	const [likes,setLikes] = useState([])
	const [findLike,setFindLike] = useState({})
	const [isLike,setIsLike] = useState(false)
	const [resetComment,setResetComment] = useState({description:''})
	const {id} = useParams()

	const findSingleBlog = blogsWithoutPaginationData?.find((blog) => blog?.slug === id)
    const checkAuthorProfile = blogsWithoutPaginationData?.find(blog => blog?.authorId === user?.id)
 
	// latest posts
	const BlogsData = blogsWithoutPaginationData?.map((post) => post)
	const reverseBlogsData = BlogsData?.reverse()
	const sliceRecentBlogArr = reverseBlogsData?.slice(0,4)

	useEffect(()=>{
		window.scroll(0,0);
	},[])

	useEffect(() => {
       if(findSingleBlog && id){
		  setBlog(findSingleBlog)
		  setLikes(findSingleBlog?.likes)
	   }
	},[findSingleBlog,id])

	useEffect(() => {
		if(user && token){
			(async () => {
				handleLikeCheck()
			})()
		}
	},[user,token,likes])

	const handleLikeCheck = () => {
		const findBlogLike = likes?.find((like) => {
			if(like?.attributes?.user?.data?.id === user?.id){
				return like
			}
		})
		setFindLike(findBlogLike)
		if(findBlogLike){
		   setIsLike(false)
		}else{
		   setIsLike(true)
		}
	}

    const blogId = blog?.blogId

	const onSubmit = (data) => {
	   setResetComment(data)
       comment(data,blogId)
	}


    const defaultValue = {
		description : resetComment?.description || ''
	}
	const {description}= defaultValue
	useEffect(() => {
        if(commentSubmit){
			reset({
                description : ''
			})
		}
	},[commentSubmit])
    
	const comments = commentLoadedArr?.filter((comment) => {
		if(comment?.blogId === blog?.blogId){
			return comment
		}
	})

  
  return (
    <>
		<Layout>
			<section className="banner background9 py_80 overlay_three full_row">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div className="banner_text text-center">
									<h1 className="page_banner_title color_white text-uppercase">Blog Details</h1>
									<div className="breadcrumbs m-auto d-inline-block">
										<ul>
											<li className="hover_gray"><Link to="/all-blogs">Blog</Link></li>
											<li><i className="fa fa-angle-right" aria-hidden="true"></i></li>
											<li className="color-default">Blog Details</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
			</section>

			<section className="blog_area py_80 bg_secondery full_row">
					<div className="container">
						<div className="row">
							<div className="col-md-8 col-lg-8">
								<div className="blog_details">
										{Object.keys(blog && blog)?.length === 0 ? <p style={{color:'red',fontSize:'1.5rem'}}>No blog show</p> : 
										<>
											<div key={blog?.blogId} className="blog_img overlay_one wow animated slideInUp"><img src={blog?.blog_image} alt="image" /></div>
											<div className="blog_content bg_white">
												<div className="blog_title mb_20 color_primary">
													<h5>{blog?.title}</h5>
												</div>
												<div className="admin">
													<img src={blog?.profilePicture} alt="image" />
													<span className="color_primary">{`by - `} {blog?.firstName} {blog?.lastName}</span>
												</div>
												<div className="date color_primary float-left">{blog?.blog_date && format(new Date(blog?.blog_date), 'dd MMM yyyy')}</div>
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true"></i>
													<span className="color_primary">{blog?.likes?.length}</span>
												</div>
												<div className="single_blog_content d-inline-block mt_30 color_secondery wow animated slideInUp">
													<p>{blog?.description}</p>
												</div>
												<div className='mt-2'>
													<Link to={`/edit-blog/${id}`}><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='btn btn-success'>Edit</motion.button></Link>&nbsp;&nbsp;&nbsp;
													<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='btn btn-danger'>Delete</motion.button>
												</div>
												<div className="share_post mt_30 wow animated slideInUp">
													<h4 className="float-left mr_20">Share : </h4>
													<div className="socal_media_2 d-inline-block">
														<ul>
															<li><Link to={blog?.facebookAccount}><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
															<li><Link to={blog?.twitterAccount}><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
															<li><Link to={blog?.googleAccount}><i className="fa fa-google-plus" aria-hidden="true"></i></Link></li>
															<li><Link to={blog?.linkdinAccount}><i className="fa fa-linkedin" aria-hidden="true"></i></Link></li>
															<li><Link to={blog?.instagramAccount}><i className="fa fa-instagram" aria-hidden="true"></i></Link></li>
														</ul>
													</div>
												</div>
											</div>
										</>
										}
									
									<div className="comment_area mt_60">
										<h4 className="text-uppercase color_primary mb_30">
											Comments ({comments?.length})&nbsp;&nbsp;
											<span style={{fontSize:'2rem',cursor:'pointer'}}>
												{
													isLike ? <button className='btn btn-default'   onClick={() =>handleLike(blog?.blogId)}>{<FaThumbsUp  />}</button> 
													:
													<button className='btn btn-default'  onClick={() =>handleUnLike(blog?.blogId,findLike?.id)}>{<FaThumbsDown  />}</button> 
												}
												
											</span>
										</h4>
										<ul className="user_comments">
											{comments?.map((comment) => {
												return (
													<Comment key={comment?.cmtId} comment={comment} blogId={blogId} />
												)
											})}
										</ul>
									</div>
									<div className="replay mt_60 wow animated slideInUp">
										<h4 className="text-uppercase color_primary mb_30">Leave A Comment</h4>
										<form  className="reply_form" onSubmit={handleSubmit(onSubmit)}>
											<div className="row">
												<div className="col-md-12">
													<textarea className="form-control" defaultValue={description}  {...register("description")} rows="7" placeholder="Type Comments..."></textarea>
													<span style={{color:'red'}}>{errors?.description?.message}</span>
												</div>
												<div className="col-md-12">
													<motion.button whileHover={{ scale: 1.1 }} 
															whileTap={{ scale: 0.9 }} type="submit" className="btn btn-default" disabled={commentSubmit}>
														{commentSubmit ? 'Loading...':'Post Comment'} 
													</motion.button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
							<div className="col-md-4 col-lg-4">
								<div className="blog_sidebar">
									<div className="widget mb_60 d-inline-block p_30 bg_white full_row wow animated slideInUp">
										<h3 className="widget_title mb_30 text-capitalize">Follow Me</h3>
										<div className="socal_media">
											<ul>
												<li><a target='_blank' href={checkAuthorProfile?.facebookAccount}><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
												<li><a target='_blank' href={checkAuthorProfile?.twitterAccount}><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
												<li><a target='_blank' href={checkAuthorProfile?.googlePlusAccount}><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
												<li><a target='_blank' href={checkAuthorProfile?.linkedinAccount}><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
												<li><a target='_blank' href={checkAuthorProfile?.instagramAccount}><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
											</ul>
										</div>
									</div>
									<div className="widget mb_60 d-inline-block p_30 primary_link bg_white full_row wow animated slideInUp">
										<h3 className="widget_title mb_30 text-capitalize">Category</h3>
										<div className="category_sidebar">
												<ul>
													{loadedCategory.map((category)=> {
														return <li key={category?.categoryId}><Link to={`/category-wise-post/${category?.slug}`}>{category?.name}</Link><span>({category?.totalPostLength})</span></li>
													})}
												</ul>
										</div>
									</div>

									<div
										className="widget mb_60 d-inline-block p_30 primary_link bg_white full_row wow animated slideInUp"
									>
										<h3 className="widget_title mb_30 text-capitalize">
											Recent Post
										</h3>
										{
											sliceRecentBlogArr?.length >=1 ? 
											<div className="recent_post">
											<ul>
												{sliceRecentBlogArr?.map((recentPost) => {
                                                   return (
													<li className="mb_30" key={recentPost?.blogId}>
													<Link to={`/blog-details/${recentPost?.slug}`}>
														<div className="post_img">
															<img
																src={recentPost?.blog_image}
																alt="image"
															/>
														</div>
														<div className="recent_post_content">
															<h6>
																{recentPost?.title}
															</h6>
															<span className="color_gray">{recentPost?.blog_date && format(new Date(recentPost?.blog_date), 'dd MMM yyyy')}</span>
														</div>
													</Link>
												</li>
												   )
												})}
											</ul>
										</div>
										:
										<p style={{color:'red',fontSize:'1.3rem'}}>No recent post</p>
										}
										
									</div>
									<div
										className="widget mb_60 d-inline-block p_30 bg_white full_row wow animated slideInUp"
									>
										<h3 className="widget_title mb_30 text-capitalize">Archives</h3>
										{
											tags?.length >=1 ?
											<div className="tags">
												<ul>
													{tags?.map((tag) => {
														return (
															<li key={tag?.tagId}><Link to={`/tag-wise-post/${tag?.slug}`}>{tag?.name}</Link></li>
														)
													})}
												</ul>
										    </div>
										:
                                          <p style={{color:'red',fontSize:'1.3rem'}}>No tag</p>
										}
									</div>
								</div>
							</div>
						</div>
					</div>
			</section>
		</Layout>
    </>
  )
}

export default BlogDetails