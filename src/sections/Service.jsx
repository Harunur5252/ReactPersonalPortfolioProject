import React,{useContext,useEffect } from 'react'
import { motion,useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer';
import { PageContext } from '../components/context/Page.Context';
import { serviceDesVariants,parentVariants,childVariants } from '../components/serviceSectionComponents/animationData';
import AllServices from '../components/serviceSectionComponents/AllServices';

 
function Service() {
	const {servicesData} = useContext(PageContext)

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
         <section id="services" name="services" className="py_80 full_row bg_white">
					<div ref={ref} className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div
									className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
								>
									<h2 className="title text-uppercase">
										<span className="line_double mx-auto color_default"
											>services</span
										>What i do
									</h2>
									<motion.span className="sub_title"
									variants={serviceDesVariants} initial='hidden' animate={controls}
									>
										{servicesData?.service_short_des ? servicesData?.service_short_des : <span style={{color:'red',fontSize:'1.5rem'}}>short service description is not available to show</span>}
									</motion.span>
								</div>
							</div>
							<div className="services_item1">
								<div className="col-md-12 col-lg-12">
									<motion.div variants={parentVariants} initial='hidden' animate={controls} className="row">
										<AllServices />
									</motion.div>
								</div>
							</div>
						</div>
					</div>
		 </section>
    </>
  )
}

export default Service