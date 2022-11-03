import {useContext,useEffect} from 'react'
import CountUp from 'react-countup';
import VisibilitySensor from "react-visibility-sensor";
import { motion,useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'
import { PageContext } from '../components/context/Page.Context';

const experienceVariants = {
	hidden : {
		y:1000,
		opacity:0,
		scale:0,
	},
	visible:{
		y:0,
		opacity:1,
		scale:1,
		transition:{
			type:'spring',
			delay:0.3,
			ease: "easeInOut",
			duration:0.5
		}
	}
}

function Experience() {
    const {experience} = useContext(PageContext)
	
	// animation
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
        <div className="experience background2 overlay_two py_60 full_row">
					<div ref={ref} className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div className="fact-counter">
									<motion.div variants={experienceVariants} initial='hidden' animate={controls} className="row">
										<div className="col-md-4 col-lg-4"
										
										>
											<div
												className="counter count wow text-center"
												data-wow-duration="300ms"
											>
												<span
													className="flaticon-man-working-on-a-laptop-from-side-view"
												></span>
												{
													(experience?.data?.start || experience?.data?.ex_end) ?
													<>
													  <div className="counting_digit color_default mt_15">
													<CountUp start={experience?.data?.start} end={experience?.data?.ex_end} duration={5}>
														{({ countUpRef,start }) => (
															<VisibilitySensor onChange={start} delayedCall>
															    <span ref={countUpRef} style={{fontSize:'2rem',fontWeight:'600'}} /> 
															</VisibilitySensor>
														)}
													</CountUp>
													<span>+</span>
												</div>
													</>
													:
													<p style={{color:'red',fontSize:'1.5rem',marginTop:'0.6rem'}}>No Years of Experience is available to show</p>
												}
												
												<h3 className="color_white mt_15">Years of Experience</h3>
											</div>
										</div>
										<div className="col-md-4 col-lg-4"
										
										>
											<div
												className="counter count wow text-center"
												data-wow-duration="300ms"
											>
												<span className="flaticon-half-time-work"></span>
												{
													(experience?.data?.start || experience?.data?.pr_end) ?
													<>
													  <div className="counting_digit color_default mt_15">
														<CountUp start={experience?.data?.start} end={experience?.data?.pr_end} duration={5}>
															{({ countUpRef,start }) => (
																<VisibilitySensor onChange={start} delayedCall>
																	<span ref={countUpRef} style={{fontSize:'2rem',fontWeight:'600'}} /> 
																</VisibilitySensor>
															)}
														</CountUp>
														<span>+</span>
												      </div>
													</>
													:
                                                   <p style={{color:'red',fontSize:'1.5rem',marginTop:'0.6rem'}}>No Projects is available to show</p>
												}
												
												<h3 className="color_white mt_15">Projects Done</h3>
											</div>
										</div>
										<div className="col-md-4 col-lg-4"
										
										>
											<div
												className="counter count wow text-center"
												data-wow-duration="300ms"
											>
												<span className="flaticon-happy"></span>
												{
													(experience?.data?.start || experience?.data?.cl_end) ?
													<>
													  <div className="counting_digit color_default mt_15">
														<CountUp start={experience?.data?.start} end={experience?.data?.cl_end} duration={5}>
															{({ countUpRef,start }) => (
																<VisibilitySensor onChange={start} delayedCall>
																	<span ref={countUpRef} style={{fontSize:'2rem',fontWeight:'600'}} /> 
																</VisibilitySensor>
															)}
														</CountUp>
														<span>+</span>
												       </div>
													</>
													:
													<p style={{color:'red',fontSize:'1.5rem',marginTop:'0.6rem'}}>No Happy Clients count is available to show</p>
												}
												
												<h3 className="color_white mt_15">Happy Clients</h3>
											</div>
										</div>
									</motion.div>
								</div>
							</div>
						</div>
					</div>
		</div> 
    </>
  )
}

export default Experience