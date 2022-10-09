import React, { useEffect,useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import Venobox from 'venobox'
import { AuthContext } from '../components/context/Auth.Context'
import { axiosPrivateInstance } from '../Utils/axios'

function About() {
	const {user,token,multipleProfileData} = useContext(AuthContext)
	const [about,setAbout] = useState({})
	
	const singleProfile = multipleProfileData?.find((profile) => {
        if(profile?.userId === user?.id){
            return profile
        }
    })

	useEffect(() => {
		new Venobox({
		  autoplay: false,
		  spinner:'wave',
		  selector: ".video-popup",
		  maxWidth:'600px'
		})
	  },[])

	  useEffect(() => {
		if(user && token){
			(async () => {
				loadAboutSection()
			})()
		}
	  },[user,token])
      
	  const userEmail  = JSON.parse(localStorage?.getItem('user'))

	  const loadAboutSection = async () => {
		 try {
			const response = await axiosPrivateInstance(token).get('/about')
			// console.log(response.data)
			setAbout({
				broad_details :  response.data?.data?.attributes?.broad_details,
				short_details :  response.data?.data?.attributes?.short_details,
				video_link :  response.data?.data?.attributes?.video_link,
				video_title :  response.data?.data?.attributes?.video_title,
			})
		 } catch (err) {
			console.log(err.response)
		 }
	  }

  return (
    <>
         <section id="about" name="about" className="py_80 full_row bg_white">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div
									className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
								>
									<h2 className="title text-uppercase">
										<span className="line_double mx-auto color_default">about</span
										>about myself
									</h2>
									<span className="sub_title">
										{about.short_details}
									</span>
									
								</div>
							</div>
						</div>
						<div className="about_one">
							<div className="row">
								<div className="col-md-7 col-lg-7">
									<div className="myself color_secondery wow animated fadeInLeft">
										<p>
										   {about?.short_details}
										</p>

										<p>
											{about?.broad_details}
										</p>
									</div>
									<div className="personal_info">
										<div className="row">
											<div className="col-md-12 col-lg-6">
												<ul>
													<li>
														<span className="color_secondery">Name :</span> {singleProfile?.firstName} {singleProfile?.lastName}
													</li>
													<li>
														<span className="color_secondery">Email :</span>
														{userEmail?.email}
													</li>
													<li>
														<span className="color_secondery">Phone :</span> {singleProfile?.phone}
													</li>
												</ul>
											</div>
											<div className="col-md-12 col-lg-6">
												<ul>
													<li>
														<span className="color_secondery">Date of Birth :</span>
														{singleProfile?.dateOfBirth && format(new Date(singleProfile?.dateOfBirth), 'dd MMMM yyyy')}
													</li>
													<li>
														<span className="color_secondery">Blood Group :</span>
														{singleProfile?.bloodGroup}
													</li>
													<li>
														<span className="color_secondery">Address :</span>
														{singleProfile?.address}
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-5 col-lg-5">
									<div
										className="profile_img personal_video wow animated fadeInRight"
									>
										<img src="images/about/03.png" alt="image" />
										<div className="iconround">
											<Link
												className="video-popup"
												data-vbtype="video"
												to={about?.video_link}
												title={about?.video_title}
											>
												<i className="fa fa-play" aria-hidden="true"></i
											></Link>
										</div>
										<div className="loader">
											<div className="loader-inner ball-scale-multiple">
												<div></div>
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
		 </section> 
    </>
  )
}

export default About