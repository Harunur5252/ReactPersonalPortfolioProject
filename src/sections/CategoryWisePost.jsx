import React, { useContext,useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import format from 'date-fns/format'
import qs from 'qs'
import { animateScroll as scroll } from 'react-scroll'
import BeatLoader  from "react-spinners/BeatLoader ";
import { BlogContext } from '../components/context/Blog.Context'
import { AuthContext } from '../components/context/Auth.Context'
import { axiosPrivateInstance } from '../Utils/axios'
import Layout from '../components/layouts/Layout'
import ScrollToTop from '../components/shared/ScrollToTop'


const generateArr = (totalPost,postPerPage) => {
	const arr = []
	for (let i = 1; i <= Math.ceil(totalPost/postPerPage); i++) {
		arr.push(i)
	}
	return arr
}

function CategoryWisePost() {
	const {id:categoryId} = useParams()
	const {loadedCategory,blogs} = useContext(BlogContext)
	const {user,token} = useContext(AuthContext)
	const [postArr,setPostArr] = useState([])
	const [loadedCategoryPost,setLoadedCategoryPost] = useState(false)
	// pagination
	const [currentPage,setCurrentPage] = useState(1)
	const [postPerPage,setPostPerPage] = useState(2)

	const blog = blogs && blogs?.find(blog=>blog?.authorId === user?.id)

	useEffect(()=>{
		window.scroll(0,0);
	},[])

	useEffect(()=>{
		scroll.scrollToTop()
	},[currentPage])

	useEffect(() => {
		if(user && token){
			(async () => {
				loadedCategoryWisePost()
			})()
		}
	},[user,token])
	

	const loadedCategoryWisePost = async () => {
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
			setLoadedCategoryPost(true)
			const response = await axiosPrivateInstance(token).get(`/categories?${query}`)
			const categoryPostArr = response.data.data?.map((categoryPost) => {
				return ({
				 categoryId:categoryPost?.id,
				 categoryWisePostData : categoryPost?.attributes?.blog_posts
				})
			})
			 setLoadedCategoryPost(false)
			 setPostArr(categoryPostArr)
		} catch (err) {
			setLoadedCategoryPost(false)
			console.log(err.response)
		}
	}

	const singleCategory = postArr?.find((category) => {
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
			  likes:post?.attributes?.likes?.data,
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
      
	const lastPostIndex = currentPage * postPerPage 
	const firstPostIndex = lastPostIndex - postPerPage
	const currentPosts = categoryWisePostArr?.slice(firstPostIndex,lastPostIndex)
	const pageCountArray = generateArr(categoryWisePostArr?.length,postPerPage)

	if(currentPage === categoryWisePostArr?.length){
		
	}
	if(currentPage > categoryWisePostArr?.length){
		setCurrentPage(1)
	}

  return ( 
    <>
        <Layout>
		<ScrollToTop />
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
													<Link to="/">Home</Link>
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
			{loadedCategoryPost && <BeatLoader  color="#36d7b7" size={25} margin={5} />}
			<section className="blog_area py_80 bg_secondery full_row">
						<div className="container">
							<div className="row">
								<div className="col-md-7 col-lg-8">
								{
									currentPosts?.length >=1 ?
									<>
									<div className="blog_list mb_60">
									{currentPosts?.map((blog)=>{
								return (
								<div key={blog?.blogId} className="blog_item mb_30 wow    animated slideInUp">
								<div className="comments">
									<i className="fa fa-comment" aria-hidden="true"></i>
									<span className="color_white">{blog?.likes?.length}</span>
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
											{pageCountArray?.map((count,index)=>{
												return (
													<li key={index} className={`page-item ${count === currentPage ? 'active' : ''}`}>
														<a className="page-link" onClick={() => setCurrentPage(count)}>{count}</a>
													</li> 
												)
											})}
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
										
									</div>
								</div>
							</div>
						</div>
			</section>
		</Layout>
    </>
  )
}

export default CategoryWisePost