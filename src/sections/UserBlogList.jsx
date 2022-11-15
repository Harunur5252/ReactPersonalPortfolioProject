import { useContext,useEffect,useState } from 'react'
import format from 'date-fns/format'
import {motion} from 'framer-motion'
import Tippy from '@tippyjs/react';
import parse from 'html-react-parser';
import 'tippy.js/dist/tippy.css';
import { animateScroll as scroll } from 'react-scroll'
import {FaEdit,FaTrashAlt} from 'react-icons/fa'
import { AuthContext } from '../components/context/Auth.Context'
import notFoundImage from '../assets/R.jpg'
import { Link } from 'react-router-dom'


const generateArr = (totalPost,postPerPage) => {
	const arr = []
	for (let i = 1; i <= Math.ceil(totalPost/postPerPage); i++) {
		arr.push(i)
	}
	return arr
}

function UserBlogList() {
  const {userBlogs,blogDelete,userBlogDelete} = useContext(AuthContext)

  	// pagination
    const [currentPage,setCurrentPage] = useState(1)
    const postPerPage = import.meta.env.VITE_USER_BLOGS_PAGE_SIZE

  // latest userBlogPosts 
  const userBlogsArr = userBlogs?.map((userBlog) => userBlog)
  const reverseUserBlogArr = userBlogsArr?.reverse()
 

  useEffect(()=>{
		scroll.scrollToTop()
	},[currentPage])
  
  const lastPostIndex = currentPage * postPerPage 
	const firstPostIndex = lastPostIndex - postPerPage
	const currentPosts = reverseUserBlogArr?.slice(firstPostIndex,lastPostIndex)
	const pageCountArray = generateArr(reverseUserBlogArr?.length,postPerPage)

	useEffect(() => {
		if(currentPage !== reverseUserBlogArr?.length){
			setCurrentPage(currentPage)
		}
		if(currentPage > reverseUserBlogArr?.length){
			setCurrentPage(1)
		}
	},[currentPage,reverseUserBlogArr?.length])

  return (
    <>
      <table className="table table-striped table-dark table-hover table-borderless">
      <thead>
        <tr>
          <th scope="col">SI.NO</th>
          <th scope="col">Author FirstName</th>
          <th scope="col">Author LastName</th>
          <th scope="col">Author Image</th>
          <th scope="col">Author Blog Image</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Blog Published</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {
          currentPosts && currentPosts?.map((blog) => {
            return (
              <tr key={blog?.id}>
                <th scope="row">{blog?.id}</th>
                <td>{blog?.firstName ? blog?.firstName : <span style={{color:'rgba(208, 213, 17, 0.8)',fontSize:'1rem'}}>no firstName</span>}</td>
                <td>{blog?.lastName ? blog?.lastName : <span style={{color:'rgba(208, 213, 17, 0.8)',fontSize:'1rem'}}>no firstName</span>}</td>
                <td><img src={blog?.profilePicture ? blog?.profilePicture : notFoundImage} /></td>
                <td><img src={blog?.blog_image ? blog?.blog_image : notFoundImage} /></td>
                <td>{blog?.title}</td>
                <td>{parse(blog?.description)}</td>
                <td>{blog?.blog_date && format(new Date(blog?.blog_date), 'dd-MMM-yyyy')}</td>
                <td>
                    <Tippy content={<span>Edit Blog</span>}>
                      <Link to={`/edit-blog/${blog?.slug}`}><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='btn btn-success btn-sm'><FaEdit /></motion.button></Link>
                    </Tippy>
                      &nbsp;&nbsp;
                      <Tippy content={<span>Delete Blog</span>}>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='btn btn-danger btn-sm' onClick={() => blogDelete(blog?.id)} disabled={userBlogDelete}>
                       {userBlogDelete ? 'Loading...' : <FaTrashAlt />} 
                      </motion.button>
                    </Tippy>
                </td>
              </tr>
            )
          })
        }
        <tr>
            <td colSpan={8}>
              <nav>
                  <ul className="pagination wow animated slideInUp full_row">
                    {pageCountArray?.map((count,index)=>{
                      return (
                        <li key={index} className={`page-item ${count === currentPage ? 'active' : ''}`}>
                          <a className="page-link" onClick={() => setCurrentPage(count)}>{count}</a>
                        </li> 
                      )
                    })}
                  </ul>
              </nav>
            </td>
        </tr>
       
      </tbody>
      
     </table>
    </>
  )
}

export default UserBlogList