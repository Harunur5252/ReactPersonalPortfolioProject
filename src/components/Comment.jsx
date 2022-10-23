import {useContext} from 'react'
import format from 'date-fns/format'
import ReplayComments from './ReplayComments';
import { BlogContext } from './context/Blog.Context';
import { AuthContext } from './context/Auth.Context';


function Comment({comment,blogId}) {
    const {showForm,setShowForm,repliedArr} = useContext(BlogContext)
    const {user} = useContext(AuthContext)

    const repliedComments = repliedArr?.filter((replay) => {
        console.log(replay?.userId === user?.id)
        if(replay?.blogId === blogId && replay?.cmtId === comment?.cmtId && (replay?.userId !== user?.id || replay?.userId === user?.id)){
            return replay
        }
    })

  return (
    <div>
        <ul>
            <li className="mb_20 wow animated slideInUp" key={comment?.cmtId}>
                <div className="comment_description bg_white p_20">
                    <div className="author_img">
                        <img src={comment?.profilePicture} alt="images" />
                    </div>
                    <div className="author_text">
                        <div className="author_info">
                            <h5 className="author_name color_primary">{comment?.firstName} {comment?.lastName} </h5>
                            <span>{comment?.commentDate && format(new Date(comment?.commentDate), 'dd MMMM, yyyy p')}</span>
                        </div>
                        <p>{comment?.description}</p>
                        <button className="btn btn_info mt_15" onClick={() => setShowForm(true)}>Replay</button>
                    </div>
                </div>
            </li>
            {repliedComments?.map((repliedComment) => {
            return (
            <li key={repliedComment?.replayId} className="mb_20 replied">
                <div className="comment_description bg_white p_20">
                <div className="author_img">
                    <img
                    src={repliedComment?.profilePicture}
                    alt="images"
                    />
                </div>
                <div className="author_text">
                    <div className="author_info">
                    <h5 className="author_name color_primary">
                        {repliedComment?.firstName} {repliedComment?.lastName}
                    </h5>
                    <span>
                    {repliedComment?.replayDate && format(new Date(repliedComment?.replayDate), 'dd MMMM, yyyy p')}
                    </span>
                    </div>
                    <div>
                    <p>{repliedComment?.description}</p>
                    <span className="btn btn_info mt_15">Replay</span>
                    </div>
                </div>
                </div>
            </li>
            );
            })}
        </ul>
        {showForm && <ReplayComments comment={comment} />}
    </div>
  )
}

export default Comment