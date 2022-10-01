import React,{ useContext,useState,useEffect } from 'react';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import BarLoader from "react-spinners/BarLoader";
import Menu from '../components/shared/Menu/Menu'
import MenuFooter from '../components/shared/Menu/MenuFooter'
import { BlogContext } from '../components/context/Blog.Context';


function CreateBlog() {
    const { register,setValue, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm();
      
      const {createBlog,blogSubmit,percentage,loadedCategory} = useContext(BlogContext)

	  // creating a new blog
      const onSubmit = (data) => {
        createBlog(data)
      }
	  const now = percentage

    // tracking date 
    const [blogDate,setBlogDate] = useState(new Date())
    useEffect(() =>{
       setValue('blog_date',blogDate)
    },[blogDate])

  return (
    <>
        <Menu />
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

												{/* <div className="col-md-6 col-lg-6">
													<div className="form-group">
														<input
															className="form-control"
															type="text"
															{...register("tags", { required: 'tags is required',minLength:{value:5,message:'tags at least 5 or more character'},maxLength:{value:20,message:'tags must be equal or less than 20 character'} })}
															placeholder="Tags"
														/>
														{/* <Select options={options} isSearchable  isMulti 
														  {...register("tags", { required: 'tags is required' })}
														/> */}
                                                        {/* <span style={{color:'red'}}>{errors?.tags?.message}</span>
													</div>
												</div> */}
												 
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
           
        <MenuFooter />
    </>
  )
}

export default CreateBlog