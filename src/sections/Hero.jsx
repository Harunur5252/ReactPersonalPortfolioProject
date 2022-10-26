import React,{ useContext } from 'react';
import Typed from 'react-typed';
import WaterWave from 'react-water-wave';
import { PageContext } from '../components/context/Page.Context';

function Hero() {
    const {professionData,heroSectionData,myProfileData} = useContext(PageContext)

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
	    <WaterWave dropRadius={20} interactive= {true} perturbance={0.03} resolution={500} imageUrl={myProfileData?.profilePicture?.data?.attributes?.url} className='banner_water_effect overlay_one'>
			{() => (
		        <section
				id="main_banner" name="top"
				className="banner_water_effect overlay_one"
			   >
				<div className="container h-100">
					<div className="row h-100 align-items-center">
						<div className="col-md-12 col-lg-12 home-content text-left">
							<div className="mainbanner_content">
								<span className="pb_5 banner_title color_white">
									I Am {myProfileData?.fullName ? myProfileData?.fullName : <p style={{color:'rgba(208, 213, 17, 0.8)'}}>No name is available to show</p>}!
								</span>
								
								<h1 className="cd-headline clip is-full-width text-uppercase">
									<span className="color_white">
										I am a &nbsp;
									</span>
									<span className="color_default">
									<Typed 
											strings={strings ? strings : <p style={{color:'rgba(208, 213, 17, 0.8)'}}>No profession is available to show</p>}
											{...options}
										/>
									</span>
								</h1>
								<p className="color_white mb_30">
									{heroSectionData?.short_des ? heroSectionData?.short_des : <p style={{color:'rgba(208, 213, 17, 0.8)'}}>No short description is available to show</p>}
								</p>
								<a className="btn btn-default" target='_blank' disabled={myProfileData?.cvLink ? '' : 'disabled'} href={myProfileData?.cvLink}>Download CV</a>
							</div>
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