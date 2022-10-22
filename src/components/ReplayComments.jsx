import React from 'react'

function ReplayComments() {
  return (
    <li className="mb_20 wow animated slideInUp">
    <div className="comment_description replied bg_white p_20">
        <h4 className="text-uppercase color_primary mb_30">Replay Comment</h4>
        <form  className="reply_form">
            <div className="row">
                <div className="col-md-12">
                    <textarea className="form-control"  rows="3" placeholder="Type replay..."></textarea>
                    {/* <span style={{color:'red'}}>{errors?.description?.message}</span> */}
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-default">
                        Replay Comment
                    </button>
                </div>
            </div>
        </form>
        </div>
    </li>
  )
}

export default ReplayComments