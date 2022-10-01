import React from 'react'
import Typed from 'react-typed';
import WaterWave from 'react-water-wave';

function Hero() {
	const strings =
	[
	  'Search for products',
	  'Search for categories',
	  'Search for brands'
	]
	
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
	    <WaterWave dropRadius={20} interactive= {true} perturbance={0.03} resolution={500} imageUrl='images/slider/04.jpg' className='banner_water_effect overlay_one'>
			{() => (
		        <section
				id="main_banner" name="top"
				className="banner_water_effect  overlay_one"
			   >
				<div className="container h-100">
					<div className="row h-100 align-items-center">
						<div className="col-md-12 col-lg-12 home-content text-left">
							<div className="mainbanner_content">
								<span className="pb_5 banner_title color_white">
									I Am Austin Jackson!
								</span>
								
								<h1 className="cd-headline clip is-full-width text-uppercase">
									<span className="color_white">
										I am a &nbsp;
									</span>
									<span className="color_default">
									<Typed 
											strings={strings}
											{...options}
										/>
									</span>
								</h1>
								<p className="color_white mb_30">
									Libero habitasse sollicitudin aliquet venenatis iaculis
									placerat amet ligula, eleifend nonummy enim in volutpat
									diam.
								</p>
								<a className="btn btn-default" href="#">Download CV</a>
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