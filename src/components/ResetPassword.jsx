import { useEffect,useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Layout from '../components/layouts/Layout';
import ScrollToTop from '../components/shared/ScrollToTop';
import { useSearchParams,useNavigate } from 'react-router-dom';
import { axiosPublicInstance } from '../Utils/axios';
import { toast } from 'react-toastify';

// validation rules for all input fields
const schema = yup.object({
    password: yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,'Must Contain 6 character,One Uppercase,One Lowercase,One Number and One special case character'),
    passwordConfirmation : yup.string().required('confirm password is required').oneOf([yup.ref('password')],'confirm password does"t match')
  })

function ResetPassword() {
    const { register,reset, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
        resolver: yupResolver(schema)
    });
    const [submit,setSubmit] = useState(false)
    const [resetData,setResetData] = useState({})
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    const defaultValue ={
        password : resetData?.password || '',
        passwordConfirmation : resetData?.passwordConfirmation || '',
    }
    const {password,passwordConfirmation} = defaultValue
    useEffect(() => {
        if(submit){
            reset({
                password : '',
                passwordConfirmation : ''
            })
        }
    },[submit])

    const onSubmit = async (data) => {
        setResetData(data)
        try {
            setSubmit(true)
            const response = await axiosPublicInstance.post('auth/reset-password',{
                code : code,
                password : data?.password,
                passwordConfirmation : data?.passwordConfirmation
            })
            setSubmit(false)
            toast.success('password resets successfully,please login with update password')
            navigate('/login')
        } catch (err) {
            setSubmit(false)
            toast.error(err?.response?.data?.error?.message)
        }
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
								<h1 className="page_banner_title color_white text-uppercase">Reset Password</h1>
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
											Reset Password
                                        </span>
										
									</h2>
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
															type="password"
															{...register("password")}
                                                            defaultValue={password}
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
                                                            {...register("passwordConfirmation")}
                                                            defaultValue={passwordConfirmation}
															placeholder="Confirm Password"
														/>
                                                        <span style={{color:'red'}}>{errors?.passwordConfirmation?.message}</span>
													</div>
												</div>
												
												<div className="col-md-12 col-lg-12">
													<div className="form-group">
														<button
															className="btn btn-default"
															id="send"
															type="submit"
                                                            disabled={submit}
														>
															{submit ? 'Loading...' : 'Reset Password'}
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

export default ResetPassword