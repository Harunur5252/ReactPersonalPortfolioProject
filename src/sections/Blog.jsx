import React from 'react'
import { Link } from 'react-router-dom'

function Blog() {
  return (
    <>
         <section id="blog" className="py_80 bg_secondery full_row">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div
									className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
								>
									<h2 className="title text-uppercase">
										<span className="line_double mx-auto color_default">blog</span
										>What’s News
									</h2>
									<span className="sub_title"
										>Interdum a etiam sagittis vehicula porta. Massa felis eros
										quam blandit nulla dolor habitant. Ullamcorper quis ornare
										et proin pellentesque.</span
									>
								</div>
							</div>
							<div className="col-md-12 col-lg-12">
								<div className="blog_grid_1 wow animated slideInUp">
									<div className="row">
										<div className="col-md-12 col-lg-4">
											<div className="blog_item">
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true"></i>
													<span className="color_white">12</span>
												</div>
												<div className="blog_img overlay_one">
													<img src="images/blog/01.jpg" alt="image" />
												</div>
												<div className="blog_content bg_white color_secondery">
													<div className="blog_title">
														<a className="color_primary" href="blog-details">
															<h5>
																Convallis pulvinar morbi. Aenean nisi vitae
																metus nonummy a morbi.
															</h5>
														</a>
													</div>
													<p className="mt_15 mb_30">
														Dictumst integer sollicitudin venenatis ornare quam.
														Ligula integer luctus, blandit egestas molestie
														facilisi porttitor neque sodal luctus senectus
														lacinia euismod adipiscing element turpis dolor
														curae; posuere augue.
													</p>

													<div className="admin">
														<img src="images/about/02.jpg" alt="image" />
														<span className="color_white">By - Rockstar Jack</span>
													</div>
													<div className="date float-right color_primary">
														20 Jan 2019
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-12 col-lg-4">
											<div className="blog_item">
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true"></i>
													<span className="color_white">18</span>
												</div>
												<div className="blog_img overlay_one">
													<img src="images/blog/02.jpg" alt="image" />
												</div>
												<div className="blog_content bg_white color_secondery">
													<div className="blog_title">
														<a className="color_primary" href="blog-details.html"
															><h5>
																Ornare fames imperdiet sapien. Iaculis dictum
																aptent commodo at iaculis.
															</h5></a
														>
													</div>
													<p className="mt_15 mb_30">
														Dictumst integer sollicitudin venenatis ornare quam.
														Ligula integer luctus, blandit egestas molestie
														facilisi porttitor neque sodal luctus senectus
														lacinia euismod adipiscing element turpis dolor
														curae; posuere augue.
													</p>

													<div className="admin">
														<img src="images/about/02.jpg" alt="image" />
														<span className="color_white">By - Rockstar Jack</span>
													</div>
													<div className="date float-right color_primary">
														18 Jan 2019
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-12 col-lg-4">
											<div className="blog_item">
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true"></i>
													<span className="color_white">23</span>
												</div>
												<div className="blog_img overlay_one">
													<img src="images/blog/03.jpg" alt="image" />
												</div>
												<div className="blog_content bg_white color_secondery">
													<div className="blog_title">
														<a className="color_primary" href="blog-details.html"
															><h5>
																Vulputate donec sem purus litora varius auctor
																augue suscipit hac.
															</h5></a
														>
													</div>
													<p className="mt_15 mb_30">
														Dictumst integer sollicitudin venenatis ornare quam.
														Ligula integer luctus, blandit egestas molestie
														facilisi porttitor neque sodal luctus senectus
														lacinia euismod adipiscing element turpis dolor
														curae; posuere augue.
													</p>

													<div className="admin">
														<img src="images/about/02.jpg" alt="image" />
														<span className="color_white">By - Rockstar Jack</span>
													</div>
													<div className="date float-right color_primary">
														17 Jan 2019
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="mx-auto text-center mt_60">
										<a className="btn btn-default" href="blog.html">View Blog</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
    </>
  )
}

export default Blog