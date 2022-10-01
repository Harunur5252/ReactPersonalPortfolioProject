import React,{ useContext,useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import format from 'date-fns/format'
import { FaThumbsUp,FaThumbsDown } from "react-icons/fa";
import { BlogContext } from '../components/context/Blog.Context'
import Menu from '../components/shared/Menu/Menu'
import MenuFooter from '../components/shared/Menu/MenuFooter'
import { AuthContext } from '../components/context/Auth.Context';

function BlogDetails() {
	const {blogs,handleLike,handleUnLike,loadedCategory} = useContext(BlogContext)
	const {user,token,} = useContext(AuthContext)
	const [blog,setBlog] = useState({})
	const [likes,setLikes] = useState([])
	const [findLike,setFindLike] = useState({})
	const [isLike,setIsLike] = useState(false)
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
										Comments (04)&nbsp;&nbsp;
										<span style={{fontSize:'2rem',cursor:'pointer'}}>
											{
												isLike ? <button className='btn btn-default'   onClick={() =>handleLike(blog?.blogId)}>{<FaThumbsUp  />}</button> 
												:
												<button className='btn btn-default'  onClick={() =>handleUnLike(blog?.blogId,findLike?.id)}>{<FaThumbsDown  />}</button> 
											}
											
										</span>
									</h4>
									<ul className="user_comments">
										<li className="mb_20 wow animated slideInUp">
											<div className="comment_description bg_white p_20">
												<div className="author_img">
													<img src="images/comments/01.png" alt="images" />
												</div>
												<div className="author_text">
													<div className="author_info">
														<h5 className="author_name color_primary">Rebecca D. Nagy </h5>
														<span>12 January, 2019 at 3.27 pm</span>
													</div>
													<p>Morbi potenti arcu litora. Laoreet euismod blandit euismod sit. Nisi eu Placerat ultricies faucibus interdum tellus risus. Iaculis velit.</p>
													<a href="#" className="btn btn_info mt_15">Replay</a>
												</div>
											</div>
										</li>
										<li className="mb_20 wow animated slideInUp">
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
										</li>
										<li className="mb_20 wow animated slideInUp">
											<div className="comment_description bg_white p_20">
												<div className="author_img">
													<img src="images/comments/03.png" alt="images" />
												</div>
												<div className="author_text">
													<div className="author_info">
														<h5 className="author_name color_primary">Ahmad Hassan</h5>
														<span>16 January, 2019 at 12.03 pm</span>
													</div>
													<p>Hymenaeos maecenas, imperdiet morbi mauris sagittis libero fringilla congue purus viverra nisi aptent nascetur ultricies pede sem scelerisque ipsum className.</p>
													<a href="#" className="btn btn_info mt_15">Replay</a>
												</div>
											</div>
										</li>
										<li className="mb_20 wow animated slideInUp">
											<div className="comment_description bg_white p_20">
												<div className="author_img">
													<img src="images/comments/04.png" alt="images" />
												</div>
												<div className="author_text">
													<div className="author_info">
														<h5 className="author_name color_primary">Patty Hurd</h5>
														<span>24 January, 2019 at 04.27 am</span>
													</div>
													<p>Euismod gravida laoreet vestibulum nostra sed. Ac quis auctor. Dui. Dictumst mus phasellus elit nec ornare hac faucibus interdum ligula.</p>
													<a href="#" className="btn btn_info mt_15">Replay</a>
												</div>
											</div>
										</li>
									</ul>
								</div>
								<div className="replay mt_60 wow animated slideInUp">
									<h4 className="text-uppercase color_primary mb_30">Leave A Replay</h4>
									<form action="#" method="post" className="reply_form">
										<div className="row">
											<div className="col-md-6 col-lg-6">
												<input className="form-control" name="author_name" type="text" placeholder="Your Name*" />
											</div>
											<div className="col-md-6 col-lg-6">
												<input className="form-control" name="author_email" type="email" placeholder="Email Address*" />
											</div>
											<div className="col-md-12">
												<textarea className="form-control" name="author_comments" rows="7" placeholder="Type Comments..."></textarea>
											</div>
											<div className="col-md-12">
												<button type="submit" name="submit" className="btn btn-default">Post Comment</button>
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
								<div className="widget mb_60 d-inline-block p_30 primary_link bg_white full_row wow animated slideInUp">
									<h3 className="widget_title mb_30 text-capitalize">Recent Post</h3>
									<div className="recent_post">
										<ul>
											<li className="mb_30">
												<a href="#">
													<div className="post_img"><img src="images/recent-post/01.jpg" alt="images" /></div>
													<div className="recent_post_content">
														<h6>Convallis pulvinar morbi. Aenean nisi vitae metus.</h6>
														<span className="color_gray">30 Jan 2019</span>
													</div>
												</a>
											</li>
											<li className="mb_30">
												<a href="#">
													<div className="post_img"><img src="images/recent-post/02.jpg" alt="images" /></div>
													<div className="recent_post_content">
														<h6>Eleifend ante hac quam. Rhoncus dapibus morbi.</h6>
														<span className="color_gray">28 Jan 2019</span>
													</div>
												</a>
											</li>
											<li className="mb_30">
												<a href="#">
													<div className="post_img"><img src="images/recent-post/03.jpg" alt="images" /></div>
													<div className="recent_post_content">
														<h6>Felis cum, elementum. Rhoncus aliquam cras.</h6>
														<span className="color_gray">25 Jan 2019</span>
													</div>
												</a>
											</li>
											<li className="mb_30">
												<a href="#">
													<div className="post_img"><img src="images/recent-post/04.jpg" alt="images" /></div>
													<div className="recent_post_content">
														<h6>Turpis eleifend dis platea lectus nam eleifen etiam.</h6>
														<span className="color_gray">24 Jan 2019</span>
													</div>
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="widget mb_60 d-inline-block p_30 bg_white primary_link full_row wow animated slideInUp">
									<h3 className="widget_title mb_30 text-capitalize">Archives</h3>
									<div className="archives">
										<ul>
											<li><a href="#">December 2018</a></li>
											<li><a href="#">November 2018</a></li>
											<li><a href="#">October 2018</a></li>
											<li><a href="#">September 2018</a></li>
											<li><a href="#">August 2018</a></li>
											<li><a href="#">July 2018</a></li>
										</ul>
									</div>
								</div>
								<div className="widget mb_60 d-inline-block p_30 bg_white full_row wow animated slideInUp">
									<h3 className="widget_title mb_30 text-capitalize">Archives</h3>
									<div className="tags">
										<ul>
											<li><a href="#">Design</a></li>
											<li><a href="#">Photographer</a></li>
											<li><a href="#">Developer</a></li>
											<li><a href="#">Fashion</a></li>
											<li><a href="#">Coder</a></li>
											<li><a href="#">Articles</a></li>
											<li><a href="#">Mordan</a></li>
											<li><a href="#">Web</a></li>	
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