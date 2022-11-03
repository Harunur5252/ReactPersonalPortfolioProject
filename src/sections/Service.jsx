import React,{useContext } from 'react'
import * as FaIcons from "react-icons/fa";
import { motion,useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer';
import { PageContext } from '../components/context/Page.Context';
import { useEffect } from 'react';

const serviceDesVariants = {
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
										{
											servicesData?.ServiceFeature?.length >=1 ?
											<>
											   {servicesData?.ServiceFeature?.map  ((service) => {
											let icon = service?.serviceIcon;
											const DynamicIcon = FaIcons[icon];
											return (
													<motion.div variants={childVariants} key={service?.id} className="col-md-6 col-lg-4">
														<div className="service_two text-center pt_15 mb_30 wow animated slideInUp">
															<div className="srv_item_number color_lightgray">
																<strong>{service?.serviceNumber}.</strong>
															</div>
															<h3 className="p_20 text-uppercase color_primary">
															{service?.serviceName}
															</h3>
															<div className="srv_icon color_white d-flex align-items-center justify-content-center">
															<DynamicIcon size={40} />
															</div>
															<p>{service?.serviceDescription}</p>
														</div>
													</motion.div>
											)
										       })}
											</>
                                             :
											 <>
											    <div className='row'>
                                                  <div className='className="col-md-12 col-lg-12' style={{color:'red',fontSize:'1.5rem'}}> service data is not available to show</div>
											    </div>
											 </>
										}
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