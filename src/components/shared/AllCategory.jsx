import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/Blog.Context'

function AllCategory() {
    const {loadedCategory} = useContext(BlogContext)
  return (
    <>
        <div
			className="widget mb_60 d-inline-block p_30 primary_link bg_white full_row wow animated slideInUp"
		>
        <h3 className="widget_title mb_30 text-capitalize">Category</h3>
        {loadedCategory?.length >=1 ? 
            <div className="category_sidebar">
            <ul>
                {loadedCategory?.map((category)=> {
                    return <li key={category?.categoryId}><Link to={`/category-wise-post/${category?.slug}`}>{category?.name}</Link><span>({category?.totalPostLength})</span></li>
                })}
            </ul>
            </div>
            :
            <p style={{color:'red',fontSize:'1.3rem'}}>No Category Found</p>
            }
        
      </div>
    </>
  )
}

export default AllCategory