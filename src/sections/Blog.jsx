import { useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import { BarLoader } from 'react-spinners'
import { motion,useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer';
import { AuthContext } from '../components/context/Auth.Context'
import { PageContext } from '../components/context/Page.Context'

const blogDesVariants = {
	hidden : {
		opacity:0,
		scale:0
	},
	visible:{
		opacity:1,
		scale:1,
		transition:{
			type:'spring',
			delay: 0.5,
			ease: "easeOut",
			duration:1,
		}
	}
}

const parentVariants = {
	hidden : {
		opacity:0, 
	},
	visible:{
		opacity:1,
		transition:{
			when:'beforeChildren',
			staggerChildren:0.4,
		}
	}
}

const childVariants = {
	hidden : {
		opacity:0,
	},
	visible:{
		opacity:1,
		transition:{
			duration:0.4
		}
	}
}

function Blog() {
	const {ThreeBlogsData} = useContext(PageContext)
	const {user} = useContext(AuthContext)

	// for animation
	const controls = useAnimation()
	const [ref,inView] = useInView()

	useEffect(() => {
		if(inView){
			controls.start('visible')
		}
		if(!inView){
			controls.start('hidden')
		}
	},[controls,inView])
	
  return (
    <>  
	 
         <section id="blog" name="blog" className="py_80 bg_secondery full_row">
			<div ref={ref} className="container">
				<div className="row">
					
					<div className="col-md-12 col-lg-12">
						<div
							className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
						>
							<h2 className="title text-uppercase">
								<span className="line_double mx-auto color_default">blog</span
								>What’s News
							</h2>
							<motion.span variants={blogDesVariants} initial='hidden' animate={controls} className="sub_title"
								>Interdum a etiam sagittis vehicula porta. Massa felis eros
								quam blandit nulla dolor habitant. Ullamcorper quis ornare
								et proin pellentesque.
							</motion.span>
							
						</div>
					</div>
					{
						!user && <p className='text-center' style={{color:'red',fontSize:'1.4rem',fontWeight:'600'}}>please login or register to see blogs</p>
					}
					{
						user && 
						<div className="col-md-12 col-lg-12">
						<div className="blog_grid_1 wow animated slideInUp">
							<motion.div variants={parentVariants} initial='hidden' animate={controls} className="row">
								{ThreeBlogsData ? ThreeBlogsData?.map((blog) => {
									return (
										<div key={blog?.blogId} className="col-md-12 col-lg-4">
										<motion.div variants={childVariants} className="blog_item">
											<div className="comments">
												<i className="fa fa-comment" aria-hidden="true"></i>
												<span className="color_white">{blog?.likes?.length}</span>
											</div>
											<div className="blog_img overlay_one">
												<img src={blog?.blog_image} alt="image" />
											</div>
											<div className="blog_content bg_white color_secondery">
												<div className="blog_title">
													<Link className="color_primary" to={`/blog-details/${blog?.slug}`}>
														<h5>
															{blog?.title}
														</h5>
													</Link>
												</div>
												<p className="mt_15 mb_30">
													{
														blog?.description
													}
												</p>

												<div className="admin">
													<img src={blog?.profilePicture} alt="image" />
													<span className="color_white">{`by - `} {blog?.firstName} {blog?.lastName}</span>
												</div>
												<div className="date float-right color_primary">
													{blog?.blog_date && format(new Date(blog?.blog_date), 'dd MMM yyyy')}
												</div>
											</div>
										</motion.div>
										</div>
									)
								})
								:
									<span style={{margin:'0 auto'}}><BarLoader color="#36d7b7" height={8} width={500}/></span>
								}
							</motion.div>
							<div className="mx-auto text-center mt_60">
								<Link className="btn btn-default" to="/all-blogs">View Blog</Link>
							</div>
						</div>
						</div>
					}
					
				</div>
			</div>
		 </section>
		
         
    </>
  )
}

export default Blog