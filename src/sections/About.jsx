import { useEffect,useContext } from 'react'
import format from 'date-fns/format'
import { motion,useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'
import Venobox from 'venobox'
import { PageContext } from '../components/context/Page.Context'
import notFoundImage from '../assets/R.jpg'

const aboutDesVariants = {
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

const aboutPersonaInfoVariants = {
	hidden: {
		x:-1000,
		opacity:0,
		scale:0
	},
	visible:{
		x:0,
		opacity:1,
		scale:1,
		transition:{
			delay: 0.3,
			duration:0.9,
		}
	}
}

const aboutPersonaVideoInfoVariants = {
	hidden: {
		x:1000,
		opacity:0,
		scale:0
	},
	visible:{
		x:0,
		opacity:1,
		scale:1,
		transition:{
			delay: 0.3,
			duration:0.9,
		}
	}
}

function About() {
	const {about,myProfileData} = useContext(PageContext)

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
							<div className="myself color_secondery wow animated fadeInLeft">
								<p>
									{about?.broad_details ? about?.broad_details : <span style={{color:'red',fontSize:'1.1rem'}}>No broad description is available to show</span>}
								</p>
							</div>
							<div className="personal_info">
								<div className="row">
									<div className="col-md-12 col-lg-6">
										<ul>
											<li>
												<span className="color_secondery">Name :</span> {myProfileData?.fullName ? myProfileData?.fullName :<span style={{color:'red',fontSize:'1rem'}}>No name is available to show</span>}
											</li>
											<li>
												<span className="color_secondery">Email :</span>
												{myProfileData?.email ? myProfileData?.email :<span style={{color:'red',fontSize:'1rem'}}> No email is available to show</span>}
											</li>
											<li>
												<span className="color_secondery">Phone :</span> {myProfileData?.phone ? myProfileData?.phone :<span style={{color:'red',fontSize:'1rem'}}> No phone number is available to show</span>}
											</li>
										</ul>
									</div>
									<div className="col-md-12 col-lg-6">
										<ul>
											<li>
												<span className="color_secondery">Date of Birth :</span>
												{myProfileData?.dateOfBirth && format(new Date(myProfileData?.dateOfBirth), 'dd MMMM yyyy') ? myProfileData?.dateOfBirth && format(new Date(myProfileData?.dateOfBirth), 'dd MMMM yyyy') : <span style={{color:'red',fontSize:'1rem'}}> No birth date is available to show</span>}
											</li>
											<li>
												<span className="color_secondery">Blood Group :</span>
												{myProfileData?.bloodGroup ? myProfileData?.bloodGroup : <span style={{color:'red',fontSize:'1rem'}}> No blood group is available to show</span>}
											</li>
											<li>
												<span className="color_secondery">Address :</span>
												{myProfileData?.address ? myProfileData?.address :<span style={{color:'red',fontSize:'1rem'}}> No address is available to show</span>}
											</li>
										</ul>
									</div>
								</div>
							</div>
						</motion.div>
						<motion.div  className="col-md-5 col-lg-5"
						 variants={aboutPersonaVideoInfoVariants} animate={controls} initial='hidden'
						>
							<div
								className="profile_img personal_video wow animated fadeInRight"
							>
								<img src={myProfileData?.profilePicture?.data?.attributes?.url ? myProfileData?.profilePicture?.data?.attributes?.url : notFoundImage} className='aboutImage' alt="image" />
								<div className="iconround">
									<a
										className="video-popup round_shape"
										data-vbtype="video"
										href={about?.video_link ? about?.video_link :''}
										title={about?.video_title ? about?.video_title : <span style={{color:'red',fontSize:'1rem'}}> No video title is available to show</span>}
									>
										<i className="fa fa-play" aria-hidden="true"></i>
									</a>
								</div>
								<div className="loader">
									<div className="loader-inner ball-scale-multiple">
										<div></div>
										<div></div>
										<div></div>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		 </section> 
    </>
  )
}

export default About