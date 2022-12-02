import { useContext } from 'react';
import format from 'date-fns/format'
import parse from 'html-react-parser';
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { BarLoader } from 'react-spinners'
import {childVariants} from '../BlogSectionComponents/animationData'
import { PageContext } from '../context/Page.Context';
import notFoundImage from '../../assets/R.jpg'

function ThreeBlog() {
    const {ThreeBlogsData} = useContext(PageContext)
  return (
    <>
       {ThreeBlogsData ? ThreeBlogsData?.map((blog) => {
            return (
                <div key={blog?.blogId} className="col-md-12 col-lg-4">
                <motion.div variants={childVariants} className="blog_item">
                    {
                        blog?.blog_image && blog?.title && parse(blog?.description) && blog?.blog_date ? 
                        <div className="comments">
                            <i className="fa fa-comment" aria-hidden="true"></i>
                            <span className="color_white">{blog?.likes?.length}</span>
                        </div>
                        :
                        null
                    }
                    
                    <div className="blog_img overlay_one">
                        <img src={blog?.blog_image ? blog?.blog_image : notFoundImage} alt="image" />
                    </div>
                    <div className="blog_content bg_white color_secondery">
                        <div className="blog_title">
                            <Link className="color_primary" to={`/blog-details/${blog?.slug}`}>
                                <h5>
                                    {blog?.title ? blog?.title : <p style={{color:"red"}}>no title</p>}
                                </h5>
                            </Link>
                        </div>
                        <p className="mt_15 mb_30">
                            {
                                blog?.description ? parse(blog?.description) : <p style={{color:"red"}}>no description</p>
                            }
                        </p>

                        <div className="admin">
                            <img src={blog?.profilePicture ? blog?.profilePicture : notFoundImage} alt="image" />
                            <span className="color_white">{`by - `} {blog?.firstName ? blog?.firstName : <span style={{color:'rgba(208, 213, 17, 0.8)'}}>no author name</span>} {blog?.lastName} </span>
                        </div>
                        <div className="date float-right color_primary">
                            {blog?.blog_date ? format(new Date(blog?.blog_date), 'dd MMM yyyy') : <p style={{color:"red"}}>no published date</p>}
                        </div>
                    </div>
                </motion.div>
                </div>
            )
        })
        :
            <span style={{margin:'0 auto'}}><BarLoader color="#36d7b7" height={8} width={500}/></span>
        }   
    </>
  )
}

export default ThreeBlog