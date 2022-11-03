import { useContext,useEffect } from 'react';
import Typed from 'react-typed';
import WaterWave from 'react-water-wave';
import { motion,useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'
import { PageContext } from '../components/context/Page.Context';

const heroSectionVariants = {
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

function Hero() {
    const {professionData,heroSectionData,myProfileData} = useContext(PageContext)

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

	const strings = professionData?.map((profession) => {
		return profession?.profession
	})
	
	const options = {                    
	  typeSpeed: 40,
	  backSpeed: 40,
	  startDelay:500,
	  loop:true,
	  stringElement : null,
	  loopCount : 100,
	  contentType : 'html'
	};


  return (
    <>
	    <WaterWave dropRadius={20} interactive= {true} perturbance={0.03} resolution={500} imageUrl={myProfileData?.profilePicture?.data?.attributes?.url} className='banner_water_effect overlay_one'
		>
			{() => (
		        <section
				id="main_banner" name="top"
				className="banner_water_effect overlay_one"
			   >
				<div ref={ref} className="container h-100">
					<div className="row h-100 align-items-center">
						<div className="col-md-12 col-lg-12 home-content text-left">
							<motion.div className="mainbanner_content"
							variants={heroSectionVariants} animate={controls}
							initial='hidden'
							>
								<span className="pb_5 banner_title color_white">
									{myProfileData?.fullName ? 'I Am' :''} {myProfileData?.fullName ? myProfileData?.fullName : <span style={{color:'red',fontSize:'1.5rem'}}>No name is available to show</span>}!
								</span>
								
								<h1 className="cd-headline clip is-full-width text-uppercase">
									{
									   strings?.length >=1 ? 
									   <>
									<span className="color_white">
										 I am a &nbsp;
									</span>
									<span className="color_default">
										<Typed 
											strings={strings}
											{...options}
										/>
									</span>
									</>
									:
									<span style={{color:'red',fontSize:'1.5rem'}}>No profession is available to show</span>
									}
								</h1>
								<p className="color_white mb_30">
									{heroSectionData?.short_des ? heroSectionData?.short_des : <span style={{color:'red',fontSize:'1.5rem'}}>No short description is available to show</span>}
								</p>
								<motion.a  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }} className="btn btn-default" target='_blank' disabled={myProfileData?.cvLink ? '' : 'disabled'} href={myProfileData?.cvLink}>Download CV</motion.a>
							</motion.div>
						</div>
					</div>
				</div>
	            </section>
			)}
		</WaterWave>
       
    </>
  )
}

export default Hero