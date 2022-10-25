import React,{useContext,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { PageContext } from '../components/context/Page.Context';

// validation rules for all input fields
const schema = yup.object({
    fullName: yup.string().required('fullName is required').min(5,'fullName must be 5 or more').max(20,'fullName must be equal or less than 20'),
	email: yup.string().lowercase().required('Email is required').email('Must be valid email'),
	subject: yup.string().required('subject is required').min(5,'subject must be 5 or more').max(20,'subject must be equal or less than 20'),
	description: yup.string().required('description is required').min(5,'description must be 5 or more').max(5000,'description must be equal or less than 5000'),
})

function Contact() {
	const { register, reset,formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
        resolver: yupResolver(schema)
    });

	const {contactAdd,contactData,contactSubmit,myProfileData} = useContext(PageContext)

	const defaultValue = {
		fullName : contactData?.fullName || '',
		email : contactData?.email || '',
		subject : contactData?.subject || '',
		description : contactData?.description || ''
	}
	const {fullName,email,subject,description} = defaultValue
	useEffect(() => {
       if(contactData){
          reset({
			fullName : '',
			email : '',
			subject : '',
			description : '',
		  })
	   }
	},[contactData])
 
	const onSubmit = async (data) => {
		contactAdd(data)
    }
    
  return (
    <>
        <section id="contact" name="contact" className="py_80 full_row bg_white">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div
									className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
								>
									<h2 className="title text-uppercase">
										<span className="line_double mx-auto color_default"
											>contact</span
										>Get In Touch
									</h2>
									<span className="sub_title"
										>Interdum a etiam sagittis vehicula porta. Massa felis eros
										quam blandit nulla dolor habitant. Ullamcorper quis ornare
										et proin pellentesque.</span
									>
								</div>
							</div>
							<div className="col-md-12 col-lg-12">
								<div className="row">
									<div className="col-md-4 col-lg-4">
										<div className="contact_info wow animated fadeInLeft">
											<ul>
												<li>
													<div className="contact_text">
														<h6 className="font-weight-bold color_primary">
															Email
														</h6>
														<span className="color_secondery">
															{myProfileData?.email}
														</span>
														
													</div>
												</li>
												<li>
													<div className="contact_text">
														<h6 className="font-weight-bold color_primary">
															Phone
														</h6>
														<span className="color_secondery">{myProfileData?.phone}</span>
													</div>
												</li>
												<li>
													<div className="contact_text">
														<h6 className="font-weight-bold color_primary">
															Address
														</h6>
														<span className="color_secondery">
															{myProfileData?.address}
														</span>
														
													</div>
												</li>
												<li>
													<div className="contact_text">
														<h6 className="font-weight-bold color_primary">
															Website
														</h6>
														<span className="color_secondery">
															{myProfileData?.website}
														</span>
														
													</div>
												</li>
											</ul>
										</div>
										<div className="socal_media_2 mt_15 d-inline-block">
											<ul>
												<li>
													<a target='_blank' href={myProfileData?.facebookAccount}
														><i className="fa fa-facebook" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a target='_blank' href={myProfileData?.twitterAccount}
														><i className="fa fa-twitter" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a target='_blank' href={myProfileData?.googlePlusAccount}
														><i className="fa fa-google-plus" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a target='_blank' href={myProfileData?.LinkedInAccount}
														><i className="fa fa-linkedin" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a target='_blank' href={myProfileData?.instagramAccount}
														><i className="fa fa-instagram" aria-hidden="true"></i
													></a>
												</li>
											</ul>
										</div>
									</div>
									<div className="col-md-8 col-lg-8">
										<form
											className="form contact_message wow animated fadeInRight"
											id="contact-form"
											onSubmit={handleSubmit(onSubmit)}
										>
											<div className="row">
												<div className="col-md-6 col-lg-6">
													<div className="form-group">
														<input
															className="form-control"
															type="text"
															placeholder="Your Name"
															{...register("fullName")}
															defaultValue={fullName}
														/>
														<span style={{color:'red'}}>{errors?.fullName?.message}</span>
													</div>
												</div>
												<div className="col-md-6 col-lg-6">
													<div className="form-group">
														<input
															className="form-control"
															type="email"
															{...register("email")}
															placeholder="Email Address"
															defaultValue={email}
														/>
														<span style={{color:'red'}}>{errors?.email?.message}</span>
													</div>
												</div>
												<div className="col-md-12 col-lg-12">
													<div className="form-group">
														<input
															className="form-control"
															type="text"
															{...register("subject")}
															placeholder="Subject"
															defaultValue={subject}
														/>
														<span style={{color:'red'}}>{errors?.subject?.message}</span>
													</div>
												</div>
												<div className="col-md-12 col-lg-12">
													<div className="form-group">
														<textarea
															className="form-control"
															{...register("description")}
															rows="7"
															placeholder="Message"
															defaultValue={description}
														></textarea>
														 
														<span style={{color:'red'}}>{errors?.description?.message}</span>
													</div>
												</div>
												<div className="col-md-12 col-lg-12">
													<div className="form-group">
														<button
															className="btn btn-default"
															id="send"
															type="submit"
															disabled={contactSubmit}
														>
                                                            {contactSubmit ? 'Loading...' : 'Send Massage'} 
														</button>
													</div>
												</div>
												{/* <div className="col-md-12 col-lg-12">
													<div className="error-handel">
														<div id="success">
															Your email sent Successfully, Thank you.
														</div>
														<div id="error">
															Error occurred while sending email. Please try
															again later.
														</div>
													</div>
												</div> */}
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
		</section> 
    </>
  )
}

export default Contact