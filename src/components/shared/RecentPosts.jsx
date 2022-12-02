import { useContext } from 'react'
import format from 'date-fns/format'
import { BlogContext } from '../context/Blog.Context'
import notFoundImage from '../../assets/R.jpg'
import { Link } from 'react-router-dom'

function RecentPosts() {
    const {blogsWithoutPaginationData} = useContext(BlogContext)
    // latest posts
	const BlogsData = blogsWithoutPaginationData?.map((post) => post)
    const reverseBlogsData = BlogsData?.reverse()
	const sliceRecentBlogArr = reverseBlogsData?.slice(0,4)

  return (
    <>
        <div
			className="widget mb_60 d-inline-block p_30 primary_link bg_white full_row wow animated slideInUp"
		>
            <h3 className="widget_title mb_30 text-capitalize">
                Recent Post
            </h3>
            {
                sliceRecentBlogArr?.length >=1 ? 
                <div className="recent_post">
                <ul>
                    {sliceRecentBlogArr?.map((recentPost) => {
                        return (
                        <li className="mb_30" key={recentPost?.blogId}>
                        <Link to={`/blog-details/${recentPost?.slug}`}>
                            <div className='d-flex align-item-center'>
                                <div className="post_img">
                                    <img
                                        src={recentPost?.blog_image ? recentPost?.blog_image : notFoundImage}
                                        alt="image"
                                    />
                                </div>
                                <div className="recent_post_content">
                                    <h6>
                                        {recentPost?.title}
                                    </h6>
                                    <span className="color_gray">{recentPost?.blog_date && format(new Date(recentPost?.blog_date), 'dd MMM yyyy')}</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                        )
                    })}
                </ul>
            </div>
            :
            <p style={{color:'red',fontSize:'1.3rem'}}>No recent post</p>
            }
            
        </div>   
    </>
  )
}

export default RecentPosts