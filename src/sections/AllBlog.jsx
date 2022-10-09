import React, { useEffect,useContext } from 'react'
import { Link } from 'react-router-dom';
import format from 'date-fns/format'
import BeatLoader  from "react-spinners/BeatLoader ";
import { BlogContext } from '../components/context/Blog.Context';
import Menu from '../components/shared/Menu/Menu';
import MenuFooter from '../components/shared/Menu/MenuFooter';
import { AuthContext } from '../components/context/Auth.Context';

function AllBlog() {
	const {blogs,loaded,loadedCategory} = useContext(BlogContext)
	const {user} = useContext(AuthContext)
	const blog = blogs && blogs?.find(blog=>blog?.authorId === user?.id)

	const recentBlogArrSort = blogs?.map((recentBlog) => {
		return recentBlog
	})
	recentBlogArrSort?.reverse()
	// console.log(recentBlogArrSort)

    useEffect(()=>{
		window.scroll(0,0);
	},[])

  return (
    <>
       <Menu />
        <section className="banner background9 overlay_three full_row">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div className="banner_text text-center">
									<h1 className="page_banner_title color_white text-uppercase">
										All Blog
									</h1>
									<div className="breadcrumbs m-auto d-inline-block">
										<ul>
											<li className="hover_gray">
											   <Link to="/">Home</Link>
											</li>
											<li>
												<i className="fa fa-angle-right" aria-hidden="true"></i>
											</li>
											<li className="color-default">All Blog</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
		</section>
		{loaded && <BeatLoader  color="#36d7b7" size={25} margin={5} />}
        <section className="blog_area py_80 bg_secondery full_row">
					<div className="container">
						<div className="row">
							<div className="col-md-7 col-lg-8">
								{
									blogs?.length >=1 ? 
									<>
									   <div className="blog_list mb_60">
										{blogs && blogs?.map((blog)=>{
											return (
												<div key={blog?.blogId} className="blog_item mb_30 wow animated slideInUp">
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true"></i>
													<span className="color_white">{blog?.likes?.length}</span>
												</div>
												<div className="blog_img overlay_one">
													<img src={blog?.blog_image} alt="image" />
												</div>
												<div className="blog_content bg_white">
													<div className="blog_title">
														<Link className="color_primary" to={`/blog-details/${blog?.blogId}`}>
															<h5>
																{blog?.title} 
															</h5>
														</Link>
													
													</div>
													<p className="mt_15 mb_30">
														{blog?.description}
													</p>

													<div className="admin">
														<img src={blog?.profilePicture} alt="image" />
														<span className="color_white">{`by - `} {blog?.firstName} {blog?.lastName}</span>
													</div>
													<div className="date float-right color_primary">
													   {blog?.blog_date && format(new Date(blog?.blog_date), 'dd MMM yyyy')}
													</div>
												</div>
												</div>
											)
										})}
								       </div>
										<nav>
											<ul className="pagination wow animated slideInUp full_row">
										<li className="page-item active">
											<a className="page-link" href="#">1</a>
										</li>
										<li className="page-item">
											<a className="page-link" href="#">2</a>
										</li>
										<li className="page-item">
											<a className="page-link" href="#">3</a>
										</li>
										<li className="page-item">
											<a className="page-link" href="#"
												><i className="fa fa-angle-right" aria-hidden="true"></i
											></a>
										</li>
											</ul>
										</nav>
									</>
									:
									<p style={{color:'red',fontSize:'1.5rem'}}>No blog post show</p>
								}
							</div>
							<div className="col-md-5 col-lg-4">
								<div className="blog_sidebar">
									<div
										className="widget mb_60 d-inline-block p_30 bg_white full_row wow animated slideInUp"
									>
										<h3 className="widget_title mb_30 text-capitalize">
											Follow Me
										</h3>
										<div className="socal_media">
											<ul>
												<li>
													<a href={blog?.facebookAccount}
														><i className="fa fa-facebook" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a href={blog?.twitterAccount}
														><i className="fa fa-twitter" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a href={blog?.googleAccount}
														><i className="fa fa-google-plus" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a href={blog?.linkdinAccount}
														><i className="fa fa-linkedin" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a href={blog?.instagramAccount}
														><i className="fa fa-instagram" aria-hidden="true"></i
													></a>
												</li>
											</ul>
										</div>
									</div>
									<div
										className="widget mb_60 d-inline-block p_30 primary_link bg_white full_row wow animated slideInUp"
									>
										<h3 className="widget_title mb_30 text-capitalize">Category</h3>
										<div className="category_sidebar">
											<ul>
												{loadedCategory.map((category)=> {
													return <li key={category?.categoryId}><Link to={`/category-wise-post/${category?.categoryId}`}>{category?.name}</Link><span>({category?.totalPostLength})</span></li>
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
											recentBlogArrSort?.length >=1 ? 
											<div className="recent_post">
											<ul>
												{recentBlogArrSort?.map((recentPost) => {
                                                   return (
													<li className="mb_30" key={recentPost?.blogId}>
													<Link to={`/blog-details/${recentPost?.blogId}`}>
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
										className="widget mb_60 d-inline-block p_30 bg_white primary_link full_row wow animated slideInUp"
									>
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
									<div
										className="widget mb_60 d-inline-block p_30 bg_white full_row wow animated slideInUp"
									>
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

export default AllBlog