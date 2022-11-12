import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useContext } from 'react';
import { AuthContext } from '../components/context/Auth.Context';
import Layout from '../components/layouts/Layout';
import {motion} from 'framer-motion'
import ScrollToTop from '../components/shared/ScrollToTop';

// validation rules for all input fields
const schema = yup.object({
    username: yup.string().required('userName is required').min(5,'userName must be 5 or more').max(20,'userName must be equal or less than 20'),
    password: yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,'Must Contain 6 character,One Uppercase,One Lowercase,One Number and One special case character'),
    email: yup.string().lowercase().required('Email is required').email('Must be valid email'),
    confirmPassword : yup.string().required('confirm password is required').oneOf([yup.ref('password')],'confirm password does"t match')
  })

function Register() {
    const { register, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
        resolver: yupResolver(schema)
    });
      
      const {registerUser,registerSubmit} = useContext(AuthContext)
      const onSubmit = (data) => {
        registerUser(data)
      }

  return (
    <>
        <Layout>
		<ScrollToTop />
        <section className="banner background9 py_80 overlay_three full_row">
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-lg-12">
							<div className="banner_text text-center">
								<h1 className="page_banner_title color_white text-uppercase">Register</h1>
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
											Register
                                        </span>
										
									</h2>
									<span className="sub_title">
                                        Register for an authentication 
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
                                                            {...register("username")}
															placeholder="Username"
														/>
                                                        <span style={{color:'red'}}>{errors?.username?.message}</span>
													</div>
												</div>
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
                                                <div className="col-md-6 col-lg-6">
													<div className="form-group">
														<input
															className="form-control"
															type="password"
                                                            {...register("confirmPassword")}
															placeholder="confirmPassword"
														/>
                                                        <span style={{color:'red'}}>{errors?.confirmPassword?.message}</span>
													</div>
												</div>
												
												<div className="col-md-12 col-lg-12">
													<div className="form-group">
														<motion.button
															className="btn btn-default"
															id="send"
															type="submit"
                                                            disabled={registerSubmit}
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
														>
                                                           {registerSubmit ? 'Loading....' : 'Register'}
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

export default Register