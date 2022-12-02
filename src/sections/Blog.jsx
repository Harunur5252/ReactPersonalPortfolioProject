import { useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion,useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer';
import { AuthContext } from '../components/context/Auth.Context'
import { PageContext } from '../components/context/Page.Context'
import {blogDesVariants,parentVariants} from '../components/BlogSectionComponents/animationData'
import ThreeBlog from '../components/BlogSectionComponents/ThreeBlog';


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
	    {user && 
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
								<ThreeBlog />
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
		}
    </>
  )
}

export default Blog