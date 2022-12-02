import React, { useContext,useEffect } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { motion } from "framer-motion"
import { PageContext } from '../context/Page.Context';


// validation rules for all input fields
const schema = yup.object({
    fullName: yup.string().required('fullName is required').min(5,'fullName must be 5 or more').max(20,'fullName must be equal or less than 20'),
	email: yup.string().lowercase().required('Email is required').email('Must be valid email'),
	subject: yup.string().required('subject is required').min(5,'subject must be 5 or more').max(20,'subject must be equal or less than 20'),
	description: yup.string().required('description is required').min(5,'description must be 5 or more').max(5000,'description must be equal or less than 5000'),
})

function ContactForm() {
    const { register,reset,formState: { errors,isSubmitting }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });
    const {contactAdd,contactSubmit,contactData} = useContext(PageContext)
    const defaultValue = {
		fullName : contactData?.fullName || '',
		email : contactData?.email || '',
		subject : contactData?.subject || '',
		description : contactData?.description || ''
	}
	const {fullName,email,subject,description} = defaultValue

    useEffect(() => {
        if(contactData){
           reset({
             fullName : '',
             email : '',
             subject : '',
             description : '',
           })
        }
     },[contactData])
    
    const onSubmit = async (data) => {
		contactAdd(data)
    }
  return (
    <>
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
                            placeholder="Your Name"
                            {...register("fullName")}
                            defaultValue={fullName}
                        />
                        <span style={{color:'red'}}>{errors?.fullName?.message}</span>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="email"
                            {...register("email")}
                            placeholder="Email Address"
                            defaultValue={email}
                        />
                        <span style={{color:'red'}}>{errors?.email?.message}</span>
                    </div>
                </div>
                <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            {...register("subject")}
                            placeholder="Subject"
                            defaultValue={subject}
                        />
                        <span style={{color:'red'}}>{errors?.subject?.message}</span>
                    </div>
                </div>
                <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            {...register("description")}
                            rows="7"
                            placeholder="Message"
                            defaultValue={description}
                        ></textarea>
                            
                        <span style={{color:'red'}}>{errors?.description?.message}</span>
                    </div>
                </div>
                <div className="col-md-12 col-lg-12">
                    <div className="form-group">
                        <motion.button
                            className="btn btn-default"
                            id="send"
                            type="submit"
                            disabled={contactSubmit}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {contactSubmit ? 'Loading...' : 'Send Massage'} 
                        </motion.button>
                    </div>
                </div>
            </div>
        </form>
    </>
  )
}

export default ContactForm