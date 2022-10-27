import {useContext,useState,useEffect} from 'react'
import format from 'date-fns/format'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AuthContext } from './context/Auth.Context';
import { BlogContext } from './context/Blog.Context';
import { toast } from 'react-toastify';
import { axiosPrivateInstance } from '../Utils/axios';
import notFoundImage from '../assets/R.jpg'

// validation rules for all input fields
const schema = yup.object({
    description: yup.string().required('description is required').min(5,'userName must be 5 or more').max(5000,'userName must be equal or less than 5000'),
})

function Comment({comment,blogId}) {
    const { register,reset, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
		resolver: yupResolver(schema)
	});
    
    const {loadAllComment} = useContext(BlogContext)
    const {user,token} = useContext(AuthContext)
    const [showForm, setShowForm] = useState(false);
    const [repliedCommentSubmit,setRepliedCommentSubmit] = useState(false)
    const [resetComment,setResetComment] = useState({description:''})
    // console.log(comment)

    const repliedComments = comment?.replay_comments?.data?.filter((replay) => {
        if(replay?.attributes?.comment?.data?.attributes?.blog_post?.data?.id === comment?.blogId && replay?.attributes?.comment?.data?.id === comment?.cmtId && (replay?.attributes?.user?.data?.id === user?.id || replay?.attributes?.user?.data?.id !== user?.id)){
            return replay
        }
    })
    
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

    useEffect(() => {
        if(user && token){
            (async () => {
              loadAllComment()
            })()
        }
      },[user,token,repliedCommentSubmit])

    const createRepliedComment = async (repliedCmt) => {
        const data = {
           description : repliedCmt?.description,
           comment : repliedCmt?.comment,
           replayDate : new Date(),
           user : user?.id
        }

         try {
            setRepliedCommentSubmit(true)
            const response = await axiosPrivateInstance(token).post('/replay-comments?populate=*',
             {
              data : data
             }
            )
            setRepliedCommentSubmit(false)
            setShowForm(false)
            toast.success('comment replied successfully!')
         } catch (err) {
            setRepliedCommentSubmit(false)
            toast.error(err?.response?.data?.error?.message)
         }
    }



  return (
    <>
        <li className="mb_20 wow animated slideInUp">
            <div className="comment_description bg_white p_20">
                <div className="author_img">
                    <img src={comment?.profilePicture ? comment?.profilePicture : notFoundImage} alt="images" />
                </div>
                <div className="author_text">
                    <div className="author_info">
                        <h5 className="author_name color_primary">{comment?.firstName ? comment?.firstName : <span style={{color:'red'}}>no firstName</span>} {comment?.lastName ? comment?.lastName : <span style={{color:'red'}}>no lastName</span>} </h5>
                        <span>{comment?.commentDate && format(new Date(comment?.commentDate), 'dd MMMM, yyyy p') ? comment?.commentDate && format(new Date(comment?.commentDate), 'dd MMMM, yyyy p') : <span style={{color:'red'}}>no published date</span>}</span>
                    </div>
                    <p>{comment?.description ? comment?.description :<span style={{color:'red'}}>no description</span>}</p>
                    <button className="btn btn_info mt_15" onClick={() => setShowForm(true)}>Replay</button>
                </div>
            </div>
        </li>
        {repliedComments?.map((repliedComment) => {
        return (
        <li key={repliedComment?.id} className="mb_20 replied">
            <div className="comment_description bg_white p_20">
            <div className="author_img">
                <img
                src={repliedComment?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.attributes?.url ? repliedComment?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.profilePicture?.data?.attributes?.url : notFoundImage}
                alt="images"
                />
            </div>
            <div className="author_text">
                <div className="author_info">
                <h5 className="author_name color_primary">
                    {repliedComment?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.firstName ? repliedComment?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.firstName : <span style={{color:'red'}}>no firstName</span>} {repliedComment?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.lastName ? repliedComment?.attributes?.user?.data?.attributes?.profile?.data?.attributes?.lastName : <span style={{color:'red'}}>no lastName</span>}
                </h5>
                <span>
                {repliedComment?.attributes?.replayDate && format(new Date(repliedComment?.attributes?.replayDate), 'dd MMMM, yyyy p') ? repliedComment?.attributes?.replayDate && format(new Date(repliedComment?.attributes?.replayDate), 'dd MMMM, yyyy p') :<span style={{color:'red'}}>no published date</span> }
                </span>
                </div>
                <div>
                <p>{repliedComment?.attributes?.description ? repliedComment?.attributes?.description : <span style={{color:'red'}}>no description</span>}</p>
                {/* <span className="btn btn_info mt_15">Replay</span> */}
                </div>
            </div>
            </div>
        </li>
        );
        })}
        {showForm && 
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
        }
    </>
  )
}

export default Comment