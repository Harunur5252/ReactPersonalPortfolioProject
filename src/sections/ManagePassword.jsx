import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AuthContext } from '../components/context/Auth.Context';

// validation rules for all input fields
const schema = yup.object({
  currentPassword : yup.string().required('current password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,'Must Contain 6 character,One Uppercase,One Lowercase,One Number and One special case character'),
  password: yup.string().required('new password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,'Must Contain 6 character,One Uppercase,One Lowercase,One Number and One special case character'),
  passwordConfirmation : yup.string().required('confirm password is required').oneOf([yup.ref('password')],'confirm password does"t match')
})

function ManagePassword() {
  const { register, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema)
  });
  const {passwordChange,passwordSubmit} = useContext(AuthContext)

  const onSubmit = (data) => {
    passwordChange(data)
  }

  return (
    <>
      <form className="form contact_message wow animated fadeInRight" id="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group col-lg-6">
          <label htmlFor="currentPassword">Current Password</label>
          <input type="password" {...register("currentPassword")} className="form-control" id="currentPassword" aria-describedby="emailHelp" placeholder="Enter Current Password" />
          <span style={{color:'red'}}>{errors?.currentPassword?.message}</span>
        </div>
        <div className="form-group col-lg-6">
          <label htmlFor="password">New Password</label>
          <input type="password" {...register("password")} className="form-control" id="password" aria-describedby="emailHelp" placeholder="Enter New Password" />
          <span style={{color:'red'}}>{errors?.password?.message}</span>
        </div>
        <div className="form-group col-lg-6">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input type="password" {...register("passwordConfirmation")} className="form-control" id="passwordConfirmation" placeholder="Enter Confirm Password" />
          <span style={{color:'red'}}>{errors?.passwordConfirmation?.message}</span>
        </div>
        <button type="submit" className="btn btn-success" disabled={passwordSubmit}>
          {passwordSubmit ? 'Loading...' : 'Current Password'} 
        </button>
      </form>
    </>
  )
}

export default ManagePassword