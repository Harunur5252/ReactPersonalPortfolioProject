import { useEffect,useContext } from 'react'
import { motion,useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'
import Venobox from 'venobox'
import { PageContext } from '../components/context/Page.Context'
import BroadDetailsAndPersonalInfo from '../components/AboutSectionComponents/BroadDetailsAndPersonalInfo'
import PersonalVideo from '../components/AboutSectionComponents/PersonalVideo'
import {aboutDesVariants,aboutPersonaInfoVariants,aboutPersonaVideoInfoVariants} from '../components/AboutSectionComponents/AnimationData'


function About() {
	const {about} = useContext(PageContext)

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

	useEffect(() => {
		new Venobox({
		  autoplay: false,
		  spinner:'flow',
		  selector: ".video-popup",
		  maxWidth:'600px'
		})
	},[])
     
  return (
    <>
         <section id="about" name="about" className="py_80 full_row bg_white">
			<div ref={ref} className="container">
				<div className="row">
					<div className="col-md-12 col-lg-12">
						<div
							className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
						>
							<h2 className="title text-uppercase"> 
								<span className="line_double mx-auto color_default">about</span
								>
								about myself
							</h2>

							<motion.span  className="sub_title" 
							 variants={aboutDesVariants} animate={controls} initial='hidden'
							>
								{about?.short_details ? about?.short_details :<span style={{color:'red',fontSize:'1.1rem'}}>No short description is available to show</span>}
							</motion.span>
							
						</div>
					</div>
				</div>
				<div className="about_one">
					<div className="row">
						<motion.div className="col-md-7 col-lg-7"
						variants={aboutPersonaInfoVariants} animate={controls} initial='hidden'
						>
						<BroadDetailsAndPersonalInfo  />
						</motion.div>
						<motion.div  className="col-md-5 col-lg-5"
						 variants={aboutPersonaVideoInfoVariants} animate={controls} initial='hidden'
						>
							<PersonalVideo />
						</motion.div>
					</div>
				</div>
			</div>
		 </section> 
    </>
  )
}

export default About