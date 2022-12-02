import React from 'react'
import format from 'date-fns/format'
import parse from 'html-react-parser';
import notFoundImage from '../../assets/R.jpg'
import { Link } from 'react-router-dom';

function ShowSingleBlogDetails({blog}) {
  return (
    <>
       {Object.keys(blog && blog)?.length === 0 ? <p style={{color:'red',fontSize:'1.5rem'}}>No blog show</p> : 
            <>
                <div key={blog?.blogId} className="blog_img overlay_one wow animated slideInUp"><img src={blog?.blog_image ? blog?.blog_image : notFoundImage} alt="image" /></div>
                <div className="blog_content bg_white">
                    <div className="blog_title mb_20 color_primary">
                        <h5>{blog?.title ? blog?.title : <p style={{color:"red"}}>no title</p>}</h5>
                    </div>
                    <div className="admin">
                        <img src={blog?.profilePicture ? blog?.profilePicture : notFoundImage} alt="image" />
                        <span className="color_primary">{`by - `} {blog?.firstName ? blog?.firstName : <span style={{color:'red'}}>no author name</span>} {blog?.lastName} </span>
                    </div>
                    <div className="date color_primary float-left">{blog?.blog_date ? format(new Date(blog?.blog_date), 'dd MMM yyyy') : <p style={{color:"red"}}>no published date</p>}</div>
                    {
                    blog?.blog_image && blog?.title && parse(blog?.description) && blog?.blog_date ? 
                    <div className="comments">
                        <i className="fa fa-comment" aria-hidden="true"></i>
                        <span className="color_primary">{blog?.likes?.length}</span>
                    </div>
                    :
                    null
                    }
                    <div className="single_blog_content d-inline-block mt_30 color_secondery wow animated slideInUp">
                        <p>{blog?.description ? parse(blog?.description) : <p style={{color:"red"}}>no description</p>}</p>
                    </div>
                    <div className="share_post mt_30 wow animated slideInUp">
                        <h4 className="float-left mr_20">Share : </h4>
                        <div className="socal_media_2 d-inline-block">
                            <ul>
                                <li><Link to='#'><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                <li><Link to='#'><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                                <li><Link to='#'><i className="fa fa-google-plus" aria-hidden="true"></i></Link></li>
                                <li><Link to='#'><i className="fa fa-linkedin" aria-hidden="true"></i></Link></li>
                                <li><Link to='#'><i className="fa fa-instagram" aria-hidden="true"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
            }
    </>
  )
}

export default ShowSingleBlogDetails