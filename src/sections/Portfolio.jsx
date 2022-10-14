import React, { useEffect,useState } from 'react'
import Venobox from 'venobox'

  const projectsData = [
	{
	image: "01.jpg",
	tag_one: "Web Development",
	tag_two: "Wordpress",
	tags: ["development", "wordpress"],
	},
	{
	image: "02.jpg",
	tag_one: "Branding",
	tag_two: "Wordpress",
	tags: ["branding", "wordpress"],
	},
	{
	image: "03.jpg",
	tag_one: "Web Design",
	tag_two: "Web Development",
	tags: ["design", "development"],
	},
	{
	image: "04.jpg",
	tag_one: "Branding",
	tag_two: "Wordpress",
	tags: ["branding", "wordpress"],
	},
	{
	image: "05.jpg",
	tag_one: "Web Design",
	tag_two: "Wordpress",
	tags: ["design", "wordpress"],
	},
	{
	image: "06.jpg",
	tag_one: "Web Design",
	tag_two: "Web Development",
	tags: ["design", "development"],
	},
  ];
  
  const menusData = [
	{
	  id: 1,
	  name: "all",
	  isActive: true,
	  tag: "all",
	},
	{
	  id: 2,
	  name: "web design",
	  isActive: false,
	  tag: "design",
	},
	{
	  id: 3,
	  name: "wordpress",
	  isActive: false,
	  tag: "wordpress",
	},
	{
	  id: 4,
	  name: "web development",
	  isActive: false,
	  tag: "development",
	},
	{
	  id: 5,
	  name: "branding",
	  isActive: false,
	  tag: "branding",
	},
  ]  

function Portfolio() {
	useEffect(() => {
		new Venobox({
		  autoplay: false,
		  spinner:'wave',
		})
	  },[])

	  const [projects, setProjects] = useState(projectsData);
	  const [menus, setMenus] = useState(menusData);

	  const handleClick = (menu) => {
		const modifiedArr =  menusData.map((singleMenuData) => {
			if(singleMenuData.id === menu.id){
				singleMenuData.isActive = true
				return singleMenuData
			}else{
				singleMenuData.isActive = false
				return singleMenuData
			 }
		 })
		 setMenus(modifiedArr)

		// filtered data
		const filteredArr = projectsData.filter((project) =>
		   menu.tag === "all" ? project : project.tags.includes(menu.tag)
		);
		setProjects(filteredArr);
	  }

  return (
    <>
         <section id="portfolio" name="portfolio" className="py_80 bg_secondery full_row">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div
									className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
								>
									<h2 className="title text-uppercase">
										<span className="line_double mx-auto color_default"
											>portfolio</span
										>Recent Projects
									</h2>
									<span className="sub_title"
										>Interdum a etiam sagittis vehicula porta. Massa felis eros
										quam blandit nulla dolor habitant. Ullamcorper quis ornare
										et proin pellentesque.</span
									>
								</div>
							</div>
							<div className="col-md-12 col-lg-12">
								<div className="my_portfolio" id="tab-panel">
									<div className="row">
										<div className="col-md-12">
											<div className="filters mb_30 w-100 text-center">
												<ul className="filter-tabs mx-auto d-inline-block">
													{
														menus.map((menu) => {
                                                           return (
															<li
															    key={menu.id}
																className={`filter ${menu.isActive?'active' : ''}`}
																data-role="button"
																data-filter="all"
																onClick={() => handleClick(menu)}
															>
																{menu.name}
															</li>
														   )
														})
													}
													
													{/* <li
														className="filter"
														data-role="button"
														data-filter=".design"
													>
														Web Design
													</li>
													<li
														className="filter"
														data-role="button"
														data-filter=".wordpress"
													>
														Wordpress
													</li>
													<li
														className="filter"
														data-role="button"
														data-filter=".development"
													>
														Web Development
													</li>
													<li
														className="filter"
														data-role="button"
														data-filter=".branding"
													>
														Branding
													</li> */}
												</ul>
											</div>
										</div>
									</div>

									<div className="">
										<div className="portfolio-items">
											<div className="row">
												{
													projects.map((project) => {
														<div  key={project?.image}
														className="column mix mix_all graphic development wordpress mb_30 col-md-4 col-lg-4"
													>
														<div className="default-portfolio-item">
															<a
																href={`/images/portfolio/${project?.image}`}
																data-gall="myGallery"
																className='venobox'
															>
																<img src={`/images/portfolio/${project?.image}`} alt="image" />
																<div className="overlay-box">
																	<span
																		><i className="fa fa-eye" aria-hidden="true"></i
																	></span>
																	<div className="tag">
																		<ul>
																			<li>{project?.tag_one},</li>
																			<li>{project?.tag_two}</li>
																		</ul>
																	</div>
																</div>
															</a>
														</div>
													</div>
													})
												}

												

												{/* <div
													className="column mix mix_all graphic branding mb_30 col-md-4 col-lg-4"
												>
													<div className="default-portfolio-item">
														<a
															href="images/portfolio/02.jpg"
															data-gall="myGallery"
															className='venobox'
														>
															<img src="images/portfolio/02.jpg" alt="image" />
															<div className="overlay-box">
																<span
																	><i className="fa fa-eye" aria-hidden="true"></i
																></span>
																<div className="tag">
																	<ul>
																		<li>Branding,</li>
																		<li>Wordpress</li>
																	</ul>
																</div>
															</div>
														</a>
													</div>
												</div>
												<div
													className="column mix mix_all design wordpress development mb_30 col-md-4 col-lg-4"
												>
													<div className="default-portfolio-item">
														<a
															href="images/portfolio/03.jpg"
															data-gall="myGallery"
															className='venobox'
														>
															<img src="images/portfolio/03.jpg" alt="image" />
															<div className="overlay-box">
																<span
																	><i className="fa fa-eye" aria-hidden="true"></i
																></span>
																<div className="tag">
																	<ul>
																		<li>Web Design,</li>
																		<li>Web Development</li>
																	</ul>
																</div>
															</div>
														</a>
													</div>
												</div>
												<div
													className="column mix mix_all graphic wordpress branding mb_30 col-md-4 col-lg-4"
												>
													<div className="default-portfolio-item">
														<a
															href="images/portfolio/04.jpg"
															data-gall="myGallery"
															className='venobox'
														>
															<img src="images/portfolio/04.jpg" alt="image" />
															<div className="overlay-box">
																<span
																	><i className="fa fa-eye" aria-hidden="true"></i
																></span>
																<div className="tag">
																	<ul>
																		<li>Branding,</li>
																		<li>wordpress</li>
																	</ul>
																</div>
															</div>
														</a>
													</div>
												</div>
												<div
													className="column mix mix_all graphic design branding mb_30 col-md-4 col-lg-4"
												>
													<div className="default-portfolio-item">
														<a
															href="images/portfolio/05.jpg"
															data-gall="myGallery"
															className='venobox'
														>
															<img src="images/portfolio/05.jpg" alt="image" />
															<div className="overlay-box">
																<span
																	><i className="fa fa-eye" aria-hidden="true"></i
																></span>
																<div className="tag">
																	<ul>
																		<li>Web Design,</li>
																		<li>wordpress</li>
																	</ul>
																</div>
															</div>
														</a>
													</div>
												</div>
												<div
													className="column mix mix_all development wordpress design mb_30 col-md-4 col-lg-4"
												>
													<div className="default-portfolio-item">
														<a
															href="images/portfolio/06.jpg"
															data-gall="myGallery"
															className='venobox'
														>
															<img src="images/portfolio/06.jpg" alt="image" />
															<div className="overlay-box">
																<span
																	><i className="fa fa-eye" aria-hidden="true"></i
																></span>
																<div className="tag">
																	<ul>
																		<li>Web Design,</li>
																		<li>Web Development</li>
																	</ul>
																</div>
															</div>
														</a>
													</div>
												</div> */}
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

export default Portfolio