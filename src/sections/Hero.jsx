import React,{ useContext,useEffect,useState } from 'react';
import Typed from 'react-typed';
import WaterWave from 'react-water-wave';
import qs from 'qs'
import { AuthContext } from '../components/context/Auth.Context';
import { axiosPrivateInstance } from '../Utils/axios';
import { Link } from 'react-router-dom';

function Hero() {
    const {user,token,multipleProfileData} = useContext(AuthContext)
	const [professionData,setProfessionData] = useState([])

	useEffect(() => {
		if(user && token){
			(async () => {
				loadHeroSection()
			})()
		}
	},[user,token])

	const singleProfile = multipleProfileData?.find((profile) => {
        if(profile?.userId === user?.id){
            return profile
        }
    })

	const loadHeroSection = async () => {
		try {
			const response = await axiosPrivateInstance(token).get('/home?populate=*')
			const heroArr = response.data?.data?.attributes?.homeFeatured?.map((hero) => {
				return ({
					homeFeatureId : hero?.id,
					profession : hero?.profession,
				})
			})
			setProfessionData(heroArr)
		} catch (err) {
			console.log(err.response)
		}
	}

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
									I Am {singleProfile?.firstName} {singleProfile?.lastName}!
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
									{singleProfile?.title}
								</p>
								<a className="btn btn-default" target='_blank' href={singleProfile?.cvLink}>Download CV</a>
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