import React from 'react'
import { useContext } from 'react';
import Slider from 'react-slick'
import SampleNextArrow from './SampleNextArrow'
import SamplePrevArrow from '../../components/testimonialSectionComponents/SamplePrevArrow'
import { PageContext } from '../context/Page.Context';

function TestimonialSlider() {
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
  return (
    <>
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
            </Slider>
        </div>
    </>
  )
}

export default TestimonialSlider