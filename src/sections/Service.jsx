import React,{ useEffect,useState,useContext } from 'react'
import { AuthContext } from '../components/context/Auth.Context'
import { axiosPrivateInstance } from '../Utils/axios'
 
function Service() {
	const {user,token} = useContext(AuthContext)
	const [servicesData,setServicesData] = useState({})

	useEffect(() => {
        if(user && token){
			(async () => {
				loadServiceSection()
			})()
		}
	},[user,token])

	const loadServiceSection = async () => {
		try {
			const response = await axiosPrivateInstance(token).get('/service?populate=*')
			setServicesData({
				service_short_des : response.data?.data?.attributes?.service_short_des,
				ServiceFeature : response.data?.data?.attributes?.ServiceFeature,
			})
		} catch (err) {
			console.log(err.response)
		}
	}

  return (
    <>
         <section id="services" name="services" className="py_80 full_row bg_white">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div
									className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
								>
									<h2 className="title text-uppercase">
										<span className="line_double mx-auto color_default"
											>services</span
										>What i do
									</h2>
									<span className="sub_title">
										{servicesData?.service_short_des}
									</span>
									
								</div>
							</div>
							<div className="services_item1">
								<div className="col-md-12 col-lg-12">
									<div className="row">
									{servicesData?.ServiceFeature?.map((service) => {
										return (
										        <div key={service?.id} className="col-md-6 col-lg-4">
													<div className="service_two text-center pt_15 mb_30 wow animated slideInUp">
														<div className="srv_item_number color_lightgray">
															<strong>{service?.serviceNumber}.</strong>
														</div>
														<h3 className="p_20 text-uppercase color_primary">
														{service?.serviceName}
														</h3>
														<div className="srv_icon color_white">
															<img src='' />
														</div>
														<p>{service?.serviceDescription}</p>
											        </div>
										        </div>
										   )
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
		 </section>
    </>
  )
}

export default Service