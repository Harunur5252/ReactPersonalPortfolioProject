import React, { useContext,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import format from 'date-fns/format'
import Menu from '../components/shared/Menu/Menu'
import MenuFooter from '../components/shared/Menu/MenuFooter'
import { BlogContext } from '../components/context/Blog.Context'
import { AuthContext } from '../components/context/Auth.Context'


function CategoryWisePost() {
	const {id:categoryId} = useParams()
	const {loadedCategory,blogs} = useContext(BlogContext)
	const {user} = useContext(AuthContext)
	const blog = blogs && blogs?.find(blog=>blog?.authorId === user?.id)

	useEffect(()=>{
		window.scroll(0,0);
	},[])

	const singleCategory = loadedCategory?.find((category) => {
		if(category?.categoryId === +categoryId){
			return category
		}
	})

	const categoryWisePostArr = singleCategory?.categoryWisePostData?.data?.map((post) => {
		    return ({
			  blogId:post?.id,
              imgId:post?.attributes?.blog_image?.data?.id,
              authorId :post?.attributes?.author?.data?.id,
              profileId :post?.attributes?.author?.data?.attributes?.profile?.data?.id,
              profilePictureId :post?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.id,
              title : post?.attributes?.title,
              description:post?.attributes?.description,
              blog_image:post?.attributes?.blog_image?.data?.attributes?.url,
              blog_date:post?.attributes?.blog_date,
              firstName :post?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.firstName,
              lastName :post?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.lastName,
              address :post?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.address,
              facebookAccount :post?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.facebookAccount,
              googleAccount :post?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.googleAccount,
              instagramAccount :post?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.instagramAccount,
              linkdinAccount :post?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.linkdinAccount,
              twitterAccount :post?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.twitterAccount,
              website :post?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.website,
              profilePicture :post?.attributes?.author?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.attributes?.url,
		})
	})

  return (
    <>
        <Menu />
        <section className="banner background9 overlay_three full_row">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div className="banner_text text-center">
									<h1 className="page_banner_title color_white text-uppercase">
										Category-Wise-Post
									</h1>
									<div className="breadcrumbs m-auto d-inline-block">
										<ul>
											<li className="hover_gray">
												<a href="index-5.html">Home</a>
											</li>
											<li>
												<i className="fa fa-angle-right" aria-hidden="true"></i>
											</li>
											<li className="color-default">CategoryWisePost</li>
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
							<div className="col-md-7 col-lg-8">
							{
								categoryWisePostArr?.length >=1 ?
								<>
								   <div className="blog_list mb_60">
								{categoryWisePostArr?.map((blog)=>{
							   return (
							   <div key={blog?.blogId} className="blog_item mb_30 wow    animated slideInUp">
							<div className="comments">
								<i className="fa fa-comment" aria-hidden="true"></i>
								<span className="color_white">12</span>
							</div>
							<div className="blog_img overlay_one">
								<img src={blog?.blog_image} alt="image" />
							</div>
							<div className="blog_content bg_white">
								<div className="blog_title">
									<Link className="color_primary" to={`/blog-details/${blog?.blogId}`}
										><h5>
											{blog?.title} 
										</h5></Link
									>
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
								<p style={{color:"red",fontSize:"1.5rem"}}>No category wise post show</p>
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
													<Link to={blog?.facebookAccount}
														><i className="fa fa-facebook" aria-hidden="true"></i
													></Link>
												</li>
												<li>
													<Link to={blog?.twitterAccount}
														><i className="fa fa-twitter" aria-hidden="true"></i
													></Link>
												</li>
												<li>
													<Link to={blog?.googleAccount}
														><i className="fa fa-google-plus" aria-hidden="true"></i
													></Link>
												</li>
												<li>
													<Link to={blog?.linkdinAccount}
														><i className="fa fa-linkedin" aria-hidden="true"></i
													></Link>
												</li>
												<li>
													<Link to={blog?.instagramAccount}
														><i className="fa fa-instagram" aria-hidden="true"></i
													></Link>
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
												{loadedCategory?.map((category)=> {
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
										<div className="recent_post">
											<ul>
												<li className="mb_30">
													<a href="#">
														<div className="post_img">
															<img
																src="images/recent-post/01.jpg"
																alt="image"
															/>
														</div>
														<div className="recent_post_content">
															<h6>
																Convallis pulvinar morbi. Aenean nisi vitae
																metus.
															</h6>
															<span className="color_gray">30 Jan 2019</span>
														</div>
													</a>
												</li>
												<li className="mb_30">
													<a href="#">
														<div className="post_img">
															<img
																src="images/recent-post/02.jpg"
																alt="image"
															/>
														</div>
														<div className="recent_post_content">
															<h6>
																Eleifend ante hac quam. Rhoncus dapibus morbi.
															</h6>
															<span className="color_gray">28 Jan 2019</span>
														</div>
													</a>
												</li>
												<li className="mb_30">
													<a href="#">
														<div className="post_img">
															<img
																src="images/recent-post/03.jpg"
																alt="image"
															/>
														</div>
														<div className="recent_post_content">
															<h6>
																Felis cum, elementum. Rhoncus aliquam cras.
															</h6>
															<span className="color_gray">25 Jan 2019</span>
														</div>
													</a>
												</li>
												<li className="mb_30">
													<a href="#">
														<div className="post_img">
															<img
																src="images/recent-post/04.jpg"
																alt="image"
															/>
														</div>
														<div className="recent_post_content">
															<h6>
																Turpis eleifend dis platea lectus nam eleifen
																etiam.
															</h6>
															<span className="color_gray">24 Jan 2019</span>
														</div>
													</a>
												</li>
											</ul>
										</div>
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

export default CategoryWisePost