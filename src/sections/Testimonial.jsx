import React,{ useState,useEffect,useContext } from 'react';
import Slider from 'react-slick'
import { PageContext } from '../components/context/Page.Context';

function Testimonial() {
	const settings = {
		accessibility:true,
		infinite: true,
		speed: 800,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay:true,
		centerMode:true,
		adaptiveHeight:true,
		fade:true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	const {testimonialData} = useContext(PageContext)

	function SampleNextArrow(props) {
		const { className, style, onClick } = props;
		return (
		  <div
			className={className}
			style={{ ...style, display: "block", background: "red" }}
			onClick={onClick}
		  />
		);
	}
	  
	function SamplePrevArrow(props) {
		const { className, style, onClick } = props;
		return (
		  <div
			className={className}
			style={{ ...style, display: "block", background: "green" }}
			onClick={onClick}
		  />
		);
	}

  return (
    <>
        <section id="testimonial" name="testimonial" className="py_80 full_row bg_white">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div
									className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
								>
									<h2 className="title text-uppercase">
										<span className="line_double mx-auto color_default"
											>testimonial</span
										>What Client Say’s
									</h2>
									<span className="sub_title">
										{testimonialData?.tes_sub_title ? testimonialData?.tes_sub_title : <p style={{color:'red',fontSize:'1.5rem'}}>testimonial data is not available to show</p>}
									</span>
									
								</div>
							</div>
							<div className="col-md-12 col-lg-12">
								<div
									className="animated slideInUp"
								>
									<Slider {...settings}>
										{testimonialData?.testimonialFeature?.map((testimonial) => {
											return (
												<div key={testimonial?.id} className="member_feedback p_30 color_secondery">
												<div className="client_img">
													<img src={testimonial?.image} alt="image" />
												</div>
												<div className="star d-inline-block mt_30 color_default">
													<ul>
														{testimonial?.FeatureFeedback?.map((feedback) => {
															return (
																<li key={feedback?.id}><i className="fa fa-star" aria-hidden="true"></i></li>
															)
														})}
													</ul>
												</div>
												<h5 className="color_primary mb_15">{testimonial?.name}</h5>
												<p>
													{testimonial?.short_des}
												</p>
											</div>
											)
										})}
									
									{/* <div className="member_feedback p_30 color_secondery">
										<div className="client_img">
											<img src="images/testimonial/02.jpg" alt="image" />
										</div>
										<div className="star d-inline-block mt_30 color_default">
											<ul>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
											</ul>
										</div>
										<h5 className="color_primary mb_15">Kiara Paige</h5>
										<p>
											Sem duis platea erat feugiat vivamus nascetur sapien
											tortor. Sollic dictum ultric. Aliquam inceptos bibendum
											fringilla sodales. Molest lacin urna per aenean commodo
											sociosqu.
										</p>
									</div>
									<div className="member_feedback p_30 color_secondery">
										<div className="client_img">
											<img src="images/testimonial/03.jpg" alt="image" />
										</div>
										<div className="star d-inline-block mt_30 color_default">
											<ul>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
											</ul>
										</div>
										<h5 className="color_primary mb_15">Lucas Noah</h5>
										<p>
											Sem duis platea erat feugiat vivamus nascetur sapien
											tortor. Sollic dictum ultric. Aliquam inceptos bibendum
											fringilla sodales. Molest lacin urna per aenean commodo
											sociosqu.
										</p>
									</div>
									<div className="member_feedback p_30 color_secondery">
										<div className="client_img">
											<img src="images/testimonial/04.jpg" alt="image" />
										</div>
										<div className="star d-inline-block mt_30 color_default">
											<ul>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
												<li><i className="fa fa-star" aria-hidden="true"></i></li>
											</ul>
										</div>
										<h5 className="color_primary mb_15">Grace Ruby</h5>
										<p>
											Sem duis platea erat feugiat vivamus nascetur sapien
											tortor. Sollic dictum ultric. Aliquam inceptos bibendum
											fringilla sodales. Molest lacin urna per aenean commodo
											sociosqu.
										</p>
									</div> */}
									</Slider>
								</div>
							</div>
						</div>
					</div>
		</section> 
    </>
  )
}

export default Testimonial