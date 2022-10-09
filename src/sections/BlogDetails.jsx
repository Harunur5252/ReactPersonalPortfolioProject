import React,{ useContext,useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import format from 'date-fns/format'
import { FaThumbsUp,FaThumbsDown } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BlogContext } from '../components/context/Blog.Context'
import Menu from '../components/shared/Menu/Menu'
import MenuFooter from '../components/shared/Menu/MenuFooter'
import { AuthContext } from '../components/context/Auth.Context';


    // validation rules for all input fields
	const schema = yup.object({
		description: yup.string().required('description is required').min(5,'userName must be 5 or more').max(5000,'userName must be equal or less than 5000'),
	  })

function BlogDetails() {
	const { register,reset, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
		resolver: yupResolver(schema)
	  });

	const {blogs,handleLike,handleUnLike,loadedCategory,comment,commentSubmit,commentLoadedArr} = useContext(BlogContext)
	const {user,token,} = useContext(AuthContext)
	const [blog,setBlog] = useState({})
	const [likes,setLikes] = useState([])
	const [findLike,setFindLike] = useState({})
	const [isLike,setIsLike] = useState(false)
	const [resetComment,setResetComment] = useState({description:''})
	const {id} = useParams()
	const findSingleBlog = blogs.find((blog) => blog.blogId === +id)
 
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
	    <Menu />
        <section className="banner background9 py_80 overlay_three full_row">
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-lg-12">
							<div className="banner_text text-center">
								<h1 className="page_banner_title color_white text-uppercase">Blog Details</h1>
								<div className="breadcrumbs m-auto d-inline-block">
									<ul>
										<li className="hover_gray"><a href="blog.html">Blog</a></li>
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
								    {Object.keys(blog && blog).length === 0 ? <p style={{color:'red',fontSize:'1.5rem'}}>No blog show</p> : 
									 <>
							            <div className="blog_img overlay_one wow animated slideInUp"><img src={blog?.blog_image} alt="image" /></div>
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
												<li className="mb_20 wow animated slideInUp" key={comment?.cmtId}>
											<div className="comment_description bg_white p_20">
												<div className="author_img">
													<img src={comment?.profilePicture} alt="images" />
												</div>
												<div className="author_text">
													<div className="author_info">
														<h5 className="author_name color_primary">{comment?.firstName} {comment?.lastName} </h5>
														<span>{comment?.commentDate && format(new Date(comment?.commentDate), 'dd MMMM, yyyy p')}</span>
													</div>
													<p>{comment?.description}</p>
													<a href="#" className="btn btn_info mt_15">Replay</a>
												</div>
											</div>
										</li>
											)
										})}
										
										{/* <li className="mb_20 wow animated slideInUp">
											<div className="comment_description replied bg_white p_20">
												<div className="author_img">
													<img src="images/comments/02.png" alt="images" />
												</div>
												<div className="author_text">
													<div className="author_info">
														<h5 className="author_name color_primary">Malina James</h5>
														<span>15 January, 2019 at 5.33 pm</span>
													</div>
													<p>Nec platea penatibus nisi ridiculus feugiat justo torquent hymenaeos suscipit platea montes. Metus porttitor fusce lectus tincidunt ornare.</p>
													<a href="#" className="btn btn_info mt_15">Replay</a>
												</div>
											</div>
										</li> */}
										
									</ul>
								</div>
								<div className="replay mt_60 wow animated slideInUp">
									<h4 className="text-uppercase color_primary mb_30">Leave A Comment</h4>
									<form  className="reply_form" onSubmit={handleSubmit(onSubmit)}>
										<div className="row">
											{/* <div className="col-md-6 col-lg-6">
												<input className="form-control" {...register("email")} type="text" placeholder="Your Name*" />
												<span style={{color:'red'}}>{errors?.email?.message}</span>
											</div>
											<div className="col-md-6 col-lg-6">
												<input className="form-control" name="author_email" type="email" placeholder="Email Address*" />
												<span style={{color:'red'}}>{errors?.email?.message}</span>
											</div> */}
											<div className="col-md-12">
												<textarea className="form-control" defaultValue={description}  {...register("description")} rows="7" placeholder="Type Comments..."></textarea>
												<span style={{color:'red'}}>{errors?.description?.message}</span>
											</div>
											<div className="col-md-12">
												<button type="submit" className="btn btn-default" disabled={commentSubmit}>
													{commentSubmit ? 'Loading...':'Post Comment'} 
												</button>
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
											<li><a href={blog.facebookAccount}><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
											<li><a href={blog.twitterAccount}><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
											<li><a href={blog.googleAccount}><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
											<li><a href={blog.linkdinAccount}><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
											<li><a href={blog.instagramAccount}><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
										</ul>
									</div>
								</div>
								<div className="widget mb_60 d-inline-block p_30 primary_link bg_white full_row wow animated slideInUp">
									<h3 className="widget_title mb_30 text-capitalize">Category</h3>
									<div className="category_sidebar">
									        <ul>
												{loadedCategory.map((category)=> {
													return <li key={category?.categoryId}><Link to={`/category-wise-post/${category?.categoryId}`}>{category?.name}</Link><span>({category?.totalPostLength})</span></li>
												})}
											</ul>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</section>
		<MenuFooter />
    </>
  )
}

export default BlogDetails