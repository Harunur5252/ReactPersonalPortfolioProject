import React from 'react'

function Service() {
	const servicesData = [
		{
			id:1,
			serviceNumber : '01',
			serviceName : 'Web Design',
			serviceDescription: 'Proin a ullamcorper et primis lobortis laoreet senectus. Vitae dignissim sollicitudin eleifend cursus tempus curabitur posuere nam arcu platea sodales.',
            serviceIcon : 'flaticon-website-design-symbol'
		},
		{
			id:2,
			serviceNumber : '02',
			serviceName : 'Web Development',
			serviceDescription: 'Proin a ullamcorper et primis lobortis laoreet senectus. Vitae dignissim sollicitudin eleifend cursus tempus curabitur posuere nam arcu platea sodales.',
            serviceIcon : 'flaticon-programming'
		},
		{
			id:3,
			serviceNumber : '03',
			serviceName : 'WordPress',
			serviceDescription: 'Proin a ullamcorper et primis lobortis laoreet senectus. Vitae dignissim sollicitudin eleifend cursus tempus curabitur posuere nam arcu platea sodales.',
            serviceIcon : 'flaticon-wordpress-logo'
		},
		{
			id:4,
			serviceNumber : '04',
			serviceName : 'Graphic Design',
			serviceDescription: 'Proin a ullamcorper et primis lobortis laoreet senectus. Vitae dignissim sollicitudin eleifend cursus tempus curabitur posuere nam arcu platea sodales.',
            serviceIcon : 'flaticon-editor'
		},
		{
			id:5,
			serviceNumber : '05',
			serviceName : 'Branding',
			serviceDescription: 'Proin a ullamcorper et primis lobortis laoreet senectus. Vitae dignissim sollicitudin eleifend cursus tempus curabitur posuere nam arcu platea sodales.',
            serviceIcon : 'flaticon-internet'
		},
		{
			id:6,
			serviceNumber : '06',
			serviceName : 'Opencart',
			serviceDescription: 'Proin a ullamcorper et primis lobortis laoreet senectus. Vitae dignissim sollicitudin eleifend cursus tempus curabitur posuere nam arcu platea sodales.',
            serviceIcon : 'flaticon-shopping-cart'
		},
	]

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
									<span className="sub_title"
										>Interdum a etiam sagittis vehicula porta. Massa felis eros
										quam blandit nulla dolor habitant. Ullamcorper quis ornare
										et proin pellentesque.</span
									>
								</div>
							</div>
							<div className="services_item1">
								<div className="col-md-12 col-lg-12">
									<div className="row">
									{servicesData.map((service) => {
										return (
										<div key={service.id} className="col-md-6 col-lg-4">
													<div key={service.id}
												className="service_two text-center pt_15 mb_30 wow animated slideInUp"
											>
												<div className="srv_item_number color_lightgray">
													<strong>{service.serviceNumber}.</strong>
												</div>
												<h3 className="p_20 text-uppercase color_primary">
												{service.serviceName}
												</h3>
												<div className="srv_icon color_white">
													<span className={service.serviceIcon}></span>
												</div>
												<p>{service.serviceDescription}</p>
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