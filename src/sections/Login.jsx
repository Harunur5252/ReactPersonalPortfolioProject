import React,{ useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {motion} from 'framer-motion'
import { AuthContext } from '../components/context/Auth.Context';
import Layout from '../components/layouts/Layout';
import ScrollToTop from '../components/shared/ScrollToTop';
import { Link } from 'react-router-dom';
import ColorSetting from '../components/shared/ColorSetting';

// validation rules for all input fields
const schema = yup.object({
    password: yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,'Must Contain 6 character,One Uppercase,One Lowercase,One Number and One special case character'),
    email: yup.string().lowercase().required('Email is required').email('Must be valid email')
  })

function Login() {
    const { register, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
        resolver: yupResolver(schema)
    });
	const {login,loginSubmit} = useContext(AuthContext)

    const onSubmit = (data) => {
		login({
			identifier : data.email,
			password: data.password
		  })
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
								<h1 className="page_banner_title color_white text-uppercase">Login</h1>
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
											Login
                                        </span>
										
									</h2>
									<span className="sub_title">
                                        Login to create a new blog post
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
															type="email"
                                                            {...register("email")}
															placeholder="Email Address"
														/>
                                                        <span style={{color:'red'}}>{errors?.email?.message}</span>
													</div>
												</div>
												<div className="col-md-6 col-lg-6">
													<div className="form-group">
														<input
															className="form-control"
															type="password"
															{...register("password")}
															placeholder="Password"
														/>
                                                        <span style={{color:'red'}}>{errors?.password?.message}</span>
													</div>
												</div>
												
												<div className="col-md-12 col-lg-12">
													<div className="form-group">
														<motion.button
															className="btn btn-default"
															id="send"
															type="submit"
															disabled={loginSubmit}
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
														>
															{loginSubmit ? 'Loading....' : 'Login'}
														</motion.button>
													</div>
													<div className="form-group">
														<p style={{color:'red'}}>Forgot Password ? <Link to='/forgot-password'><span style={{color:'green'}}>Click here</span></Link></p>
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

export default Login