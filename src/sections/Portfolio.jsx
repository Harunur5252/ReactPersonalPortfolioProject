import React from 'react'

function Portfolio() {
  return (
    <>
         <section id="portfolio" className="py_80 bg_secondery full_row">
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
													<li
														className="active filter"
														data-role="button"
														data-filter="all"
													>
														All
													</li>
													<li
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
													</li>
												</ul>
											</div>
										</div>
									</div>

									<div className="filter-list">
										<div className="portfolio-items">
											<div className="row">
												<div
													className="column mix mix_all graphic development wordpress mb_30 col-md-4 col-lg-4"
												>
													<div className="default-portfolio-item">
														<a
															href="images/portfolio/01.jpg"
															data-fancybox="gallery"
														>
															<img src="images/portfolio/01.jpg" alt="image" />
															<div className="overlay-box">
																<span
																	><i className="fa fa-eye" aria-hidden="true"></i
																></span>
																<div className="tag">
																	<ul>
																		<li>Web Development,</li>
																		<li>wordpress</li>
																	</ul>
																</div>
															</div>
														</a>
													</div>
												</div>
												<div
													className="column mix mix_all graphic branding mb_30 col-md-4 col-lg-4"
												>
													<div className="default-portfolio-item">
														<a
															href="images/portfolio/02.jpg"
															data-fancybox="gallery"
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
															data-fancybox="gallery"
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
															data-fancybox="gallery"
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
															data-fancybox="gallery"
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
															data-fancybox="gallery"
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
												</div>
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