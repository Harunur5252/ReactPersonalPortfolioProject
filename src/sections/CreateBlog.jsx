import React,{ useContext,useState,useEffect } from 'react';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import BarLoader from "react-spinners/BarLoader";
import { BlogContext } from '../components/context/Blog.Context';
import Layout from '../components/layouts/Layout';
import ScrollToTop from '../components/shared/ScrollToTop';


function CreateBlog() {
      const { register,setValue, reset,formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit } = useForm();
      // tracking date 
      const [blogDate,setBlogDate] = useState(new Date())
      const {createBlog,blogSubmit,percentage,loadedCategory,tags} = useContext(BlogContext)
	  const [createBlogData,setCreateBlogData] = useState({
		title:'',
		description:'',
		blog_image:null,
        category:'',
		tag:''
	  })

	  // creating a new blog
      const onSubmit = (data) => {
		setCreateBlogData(data)
        createBlog(data)
      }
	  const now = percentage

	  const defaultValue = {
		title:createBlogData?.title ||'',
		description:createBlogData?.description ||'',
		blog_image:createBlogData?.blog_image || null,
		category:createBlogData?.category ||'',
		tag:createBlogData?.tag || '',
	  }
	  const {title,description,blog_image,category,tag} = defaultValue

    useEffect(() =>{
       if(blogSubmit){
		 reset({
			title:'',
			description:'',
			blog_image:null,
			category:'',
			tag:''
		 })
	   }
    },[blogSubmit])

    useEffect(() =>{
       setValue('blog_date',blogDate)
    },[blogDate])

	useEffect(() => {
       window.scroll(0,0)
	},[])

  return (
    <>
        <Layout>
		    <ScrollToTop />
			<section className="banner background9 py_80 overlay_three full_row">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div className="banner_text text-center">
									<h1 className="page_banner_title color_white text-uppercase">CreateBlog</h1>
									<div className="breadcrumbs m-auto d-inline-block">
										
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
									<div
										className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
									>
										<h2 className="title text-uppercase">
											<span className="mx-auto color_default">
												CreateBlog
											</span>
											
										</h2>
										<span className="sub_title">
										Create a new blog
										</span>
										
									</div>
								</div>
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
																{...register("title", { required: 'title is required',minLength:{value:10,message:'title at least 10 or more character'},maxLength:{value:200,message:'title must be equal or less than 200 character'} })}
																placeholder="Title"
																defaultValue={title}
															/>
															<span style={{color:'red'}}>{errors?.title?.message}</span>
														</div>
													</div>
													<div className="col-md-6 col-lg-6">
														<div className="form-group">
															<textarea
																className="form-control"
																type="text"
																{...register("description", { required: 'description is required',minLength:{value:100,message:'description at least 100 or more character'},maxLength:{value:50000,message:'description must be equal or less than 50,000 character'} })}
																placeholder="Description"
																defaultValue={description}
															/>
															<span style={{color:'red'}}>{errors?.description?.message}</span>
														</div>
													</div>
													<div className="col-md-6 col-lg-6">
														<div className="form-group">
															<DatePicker
																showYearDropdown
																selected={blogDate} 
																maxDate={blogDate}
																onChange={(date) => setBlogDate(date)} 
															/>
															<span style={{color:'red'}}>{errors?.blog_date?.message}</span>
														</div>
													</div>
													<div className="col-md-6 col-lg-6">
														<div className="form-group">
															<input
																className="form-control"
																type="file"
																accept='image/*'
																defaultValue={blog_image}
																{...register("blog_image", { required: 'image is required' })}
															/>
															<span style={{color:'red'}}>{errors?.blog_image?.message}</span>
														</div>
														{blogSubmit && <BarLoader color="#36d7b7" height={8} width={500}/>}
														{blogSubmit && <p style={{textAlign:'center',color:'green',fontSize:'1.3rem'}}>{`${now}%`}</p>}
													</div>

													<div className="col-md-6 col-lg-6">
														<div className="form-group">
															<select
																className="form-control"
																type="select"
																defaultValue={category}
																{...register("category", { required: 'category is required' })}														
															>
															<option value=""  selected>choose a category</option>
															{loadedCategory.map((category)=>{
																return <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
															})}
															</select>
															<span style={{color:'red'}}>{errors?.category?.message}</span>
														</div>
													</div>	

													<div className="col-md-6 col-lg-6">
														<div className="form-group">
															<select
																className="form-control"
																type="select"
																defaultValue={tag}
																{...register("tag", { required: 'tag is required' })}														
															>
															<option value=""  selected>choose a tag</option>
															{tags.map((tag)=>{
																return <option key={tag.tagId} value={tag.tagId}>{tag.name}</option>
															})}
															</select>
															<span style={{color:'red'}}>{errors?.tag?.message}</span>
														</div>
													</div>	

													<div className="col-md-12 col-lg-12">
														<div className="form-group">
															<button
																className="btn btn-default"
																id="send"
																type="submit"
																disabled={blogSubmit}
															>
															{blogSubmit ? 'Loading....' : 'Submit'} 
															</button>
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

export default CreateBlog