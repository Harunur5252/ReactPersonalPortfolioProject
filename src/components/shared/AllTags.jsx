import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BlogContext } from '../context/Blog.Context'

function AllTags() {
    const {tags} = useContext(BlogContext)
  return (
    <>
        <div
			className="widget mb_60 d-inline-block p_30 bg_white full_row wow animated slideInUp"
		>
            <h3 className="widget_title mb_30 text-capitalize">Archives</h3>
            {
                tags?.length >=1 ?
                <div className="tags">
                    <ul>
                        {tags?.map((tag) => {
                            return (
                                <li key={tag?.tagId}><Link to={`/tag-wise-post/${tag?.slug}`}>{tag?.name}</Link></li>
                            )
                        })}
                    </ul>
                </div>
            :
                <p style={{color:'red',fontSize:'1.3rem'}}>No Tags Found</p>
            }
        </div>
    </>
  )
}

export default AllTags