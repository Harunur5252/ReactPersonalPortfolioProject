import { useContext ,useEffect,useState,useRef} from 'react';
import { Link, useParams } from 'react-router-dom'
import format from 'date-fns/format'
import {motion} from 'framer-motion'
import { useForm } from "react-hook-form";
import JoditEditor from 'jodit-react';
import DatePicker from "react-datepicker";
import Layout from '../components/layouts/Layout'
import ScrollToTop from '../components/shared/ScrollToTop'
import { BlogContext } from '../components/context/Blog.Context';
import { AuthContext } from '../components/context/Auth.Context';
import notFoundImage from '../assets/R.jpg'
import ColorSetting from '../components/shared/ColorSetting';

function EditBlog() {
	const { register,setValue, reset,formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit } = useForm();
    const {blogsWithoutPaginationData} = useContext(BlogContext)
	const editor = useRef(null);
	let [valueContent, setValueContent] = useState('');
	const {userBlogUpdate,deleteUserBlogImg,blogImgDelete,imageError,blogUpdate} = useContext(AuthContext)
	const {id} = useParams()
	const foundBlog = blogsWithoutPaginationData?.find(blog => blog?.slug === id)

	const defaultValue = {
		title : foundBlog?.title || '',
		description : foundBlog?.description || '',
		blog_date : foundBlog?.blog_date && new Date(foundBlog?.blog_date) || new Date(),
	}
	
	const {title,description,blog_date} = defaultValue
	const [blogDate,setBlogDate] = useState(blog_date ? blog_date : new Date())
	useEffect(() =>{
		setValue('blog_date',blogDate)
	},[blogDate])

	// update blog
	const onSubmit = async (data) => {
		userBlogUpdate(data,foundBlog,valueContent)
	}
	

  return (
    <>
        <Layout>
		<ScrollToTop />
		<ColorSetting />
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
			<section id="contact" name="contact" className="py_80 full_row bg_white">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div className="row">
									
									<div className="col-md-12 col-lg-12">
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
															defaultValue={title}
															{...register("title")}
															placeholder="Enter Blog Title"
														/>
													</div>
												</div>

												<div className="col-md-6 col-lg-6">
													<div className="form-group">
														 <label style={{color:'black',fontWeight:'600'}}>Blog Description : </label>
														<JoditEditor 
														    value={description}
															ref={editor}
															onChange={(content) => setValueContent(content)}
														/>
													</div>
												</div>

												<div className="col-md-6 col-lg-6">
													<div className="form-group">
														<input
															className="form-control"
															type="file"
															{...register("blog_image")}
															accept='image/*'
														/>
														<span style={{color:'red'}}>{imageError?.error}</span>
														 <div className='row'>
															<div className='col-lg-5'>
																<img src={foundBlog?.blog_image ? foundBlog?.blog_image  : notFoundImage } style={{height:'107px',width:'156px'}} alt='notFoundImage' />
																{foundBlog?.blog_image  ? <p>Before Image</p> : <p>No Image</p>}
															</div>
															<div className='col-lg-5'>
																<motion.button className='btn btn-danger' type='submit'
																whileHover={{ scale: 1.1 }}
																whileTap={{ scale: 0.9 }}
																onClick={() => deleteUserBlogImg(foundBlog?.imgId)} disabled={blogImgDelete || !foundBlog?.imgId ? 'disabled' : ''}>
																  {blogImgDelete ? 'Loading...' : 'Delete Image'}
																</motion.button>
															</div>
														</div>
													</div>
												</div>

												<div className="col-md-6 col-lg-6">
													<div className="form-group">
													       <DatePicker
																showYearDropdown
																selected={blogDate} 
																maxDate={new Date()}
																onChange={(date) => setBlogDate(date)} 
															/>
													</div>
												</div>
												
												<div className="col-md-12 col-lg-12">
													<div className="form-group">
														<motion.button
															className="btn btn-default"
															id="send"
															type="submit"
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															disabled={blogUpdate ? 'disabled' : ''}
														>
															{blogUpdate ? 'Loading...' : 'Update Blog'}
														</motion.button>
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
        </Layout>
    </>
  )
}

export default EditBlog