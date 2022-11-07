import React from 'react'
import Layout from '../components/layouts/Layout'

function EditBlog() {
  return (
    <>
        <Layout>
        <section className="banner background9 py_80 overlay_three full_row">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div className="banner_text text-center">
									<h1 className="page_banner_title color_white text-uppercase">Edit Blog</h1>
									<div className="breadcrumbs m-auto d-inline-block">
										<ul>
											<li className="hover_gray"><Link to="/all-blogs">Blog</Link></li>
											<li><i className="fa fa-angle-right" aria-hidden="true"></i></li>
											<li className="color-default">Edit Blog</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
			</section>
        </Layout>
    </>
  )
}

export default EditBlog