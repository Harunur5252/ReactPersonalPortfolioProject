import {useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useContext } from 'react';
import { BlogContext } from './context/Blog.Context';

// validation rules for all input fields
const schema = yup.object({
    description: yup.string().required('description is required').min(5,'userName must be 5 or more').max(5000,'userName must be equal or less than 5000'),
})

function ReplayComments({comment}) {
    const { register,reset, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
		resolver: yupResolver(schema)
	});
    const {createRepliedComment,repliedCommentSubmit} = useContext(BlogContext)
    const [resetComment,setResetComment] = useState({description:''})

	const onSubmit = (data) => {
        const modifiedData = { ...data, comment: comment?.cmtId };
        setResetComment(data)
        createRepliedComment(modifiedData);
    }
    const defaultValue = {
		description : resetComment?.description || ''
	}
	const {description}= defaultValue
	useEffect(() => {
        if(repliedCommentSubmit){
			reset({
                description : ''
			})
		}
	},[repliedCommentSubmit])

  return (
    <li className="mb_20 wow animated slideInUp custom_replied_block">
    <div className="comment_description replied bg_white p_20">
        <h4 className="text-uppercase color_primary mb_30">Replay Comment</h4>
        <form  className="reply_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-12">
                    <textarea className="form-control" defaultValue={description} {...register("description")} rows="3" placeholder="Type replay comment..."></textarea>
                    <span style={{color:'red'}}>{errors?.description?.message}</span>
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-default" disabled={repliedCommentSubmit}>
                        {repliedCommentSubmit ? 'Loading...' : 'Replay Comment'}
                    </button>
                </div>
            </div>
        </form>
        </div>
    </li>
  )
}

export default ReplayComments