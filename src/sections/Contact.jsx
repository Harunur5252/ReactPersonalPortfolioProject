import React from 'react'

function Contact() {
  return (
    <>
        <section id="contact" className="py_80 full_row bg_white">
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
														<span className="color_secondery"
															>yourdomainname@gmail.com</span
														>
													</div>
												</li>
												<li>
													<div className="contact_text">
														<h6 className="font-weight-bold color_primary">
															Phone
														</h6>
														<span className="color_secondery">+00 61 700 800</span>
													</div>
												</li>
												<li>
													<div className="contact_text">
														<h6 className="font-weight-bold color_primary">
															Address
														</h6>
														<span className="color_secondery"
															>Mouroubra WA 6472, Australia.</span
														>
													</div>
												</li>
												<li>
													<div className="contact_text">
														<h6 className="font-weight-bold color_primary">
															Website
														</h6>
														<span className="color_secondery"
															>www.yourdomain.com</span
														>
													</div>
												</li>
											</ul>
										</div>
										<div className="socal_media_2 mt_15 d-inline-block">
											<ul>
												<li>
													<a href="#"
														><i className="fa fa-facebook" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a href="#"
														><i className="fa fa-twitter" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a href="#"
														><i className="fa fa-google-plus" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a href="#"
														><i className="fa fa-linkedin" aria-hidden="true"></i
													></a>
												</li>
												<li>
													<a href="#"
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
											action="#"
											method="post"
										>
											<div className="row">
												<div className="col-md-6 col-lg-6">
													<div className="form-group">
														<input
															className="form-control"
															type="text"
															name="name"
															placeholder="Your Name"
														/>
													</div>
												</div>
												<div className="col-md-6 col-lg-6">
													<div className="form-group">
														<input
															className="form-control"
															type="email"
															name="email"
															placeholder="Email Address"
														/>
													</div>
												</div>
												<div className="col-md-12 col-lg-12">
													<div className="form-group">
														<input
															className="form-control"
															type="text"
															name="subject"
															placeholder="Subject"
														/>
													</div>
												</div>
												<div className="col-md-12 col-lg-12">
													<div className="form-group">
														<textarea
															className="form-control"
															name="message"
															rows="7"
															placeholder="Message"
														></textarea>
													</div>
												</div>
												<div className="col-md-12 col-lg-12">
													<div className="form-group">
														<input
															className="btn btn-default"
															id="send"
															value="Send Massage"
															type="submit"
														/>
													</div>
												</div>
												<div className="col-md-12 col-lg-12">
													<div className="error-handel">
														<div id="success">
															Your email sent Successfully, Thank you.
														</div>
														<div id="error">
															Error occurred while sending email. Please try
															again later.
														</div>
													</div>
												</div>
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