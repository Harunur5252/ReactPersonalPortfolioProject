import React, { useEffect,useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import Venobox from 'venobox'
import { PageContext } from '../components/context/Page.Context'
import notFoundImage from '../assets/R.jpg'

function About() {
	const {about,myProfileData} = useContext(PageContext)

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
										{about.short_details ? about.short_details :<p style={{color:'red',fontSize:'1.1rem'}}>No short description is available to show</p>}
									</span>
									
								</div>
							</div>
						</div>
						<div className="about_one">
							<div className="row">
								<div className="col-md-7 col-lg-7">
									<div className="myself color_secondery wow animated fadeInLeft">
										<p>
											{about?.broad_details ? about?.broad_details : <p style={{color:'red',fontSize:'1.1rem'}}>No broad description is available to show</p>}
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
								</div>
								<div className="col-md-5 col-lg-5">
									<div
										className="profile_img personal_video wow animated fadeInRight"
									>
										<img src={myProfileData?.profilePicture?.data?.attributes?.url ? myProfileData?.profilePicture?.data?.attributes?.url : notFoundImage} className='aboutImage' alt="image" />
										<div className="iconround">
											<Link
												className="video-popup round_shape"
												data-vbtype="video"
												to={about?.video_link ? about?.video_link :''}
												title={about?.video_title ? about?.video_title : <span style={{color:'red',fontSize:'1rem'}}> No video title is available to show</span>}
											>
												<i className="fa fa-play" aria-hidden="true"></i>
											</Link>
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