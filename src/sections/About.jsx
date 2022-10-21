import React, { useEffect,useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import Venobox from 'venobox'
import { AuthContext } from '../components/context/Auth.Context'
import { axiosPrivateInstance } from '../Utils/axios'
import { PageContext } from '../components/context/Page.Context'


function About() {
	const {user,multipleProfileData} = useContext(AuthContext)
	const userEmail  = JSON.parse(localStorage?.getItem('user'))
	const {about} = useContext(PageContext)
	
	const singleProfile = multipleProfileData?.find((profile) => {
        if(profile?.userId === user?.id){
            return profile
        }
    })

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
										<img src={singleProfile?.profilePicture} className='aboutImage' alt="image" />
										<div className="iconround">
											<Link
												className="video-popup round_shape"
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