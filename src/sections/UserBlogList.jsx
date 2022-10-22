import React,{ useContext } from 'react'
import format from 'date-fns/format'
import { AuthContext } from '../components/context/Auth.Context'
import notFoundImage from '../assets/R.jpg'

function UserBlogList() {
  const {userBlogs} = useContext(AuthContext)
  const userBlogsArr = userBlogs?.map((userBlog) => userBlog)
  const reverseUserBlogArr = userBlogsArr?.reverse()
  // console.log(reverseUserBlogArr)
  return (
    <>
      <table class="table table-striped table-dark table-hover table-borderless">
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
        </tr>
      </thead>
      <tbody>
        {
          reverseUserBlogArr && reverseUserBlogArr?.map((blog) => {
            return (
              <tr>
                <th scope="row" key={blog?.id}>{blog?.id}</th>
                <td>{blog?.firstName}</td>
                <td>{blog?.lastName}</td>
                <td><img src={blog?.profilePicture ? blog?.profilePicture : notFoundImage} /></td>
                <td><img src={blog?.blog_image ? blog?.blog_image : notFoundImage} /></td>
                <td>{blog?.title}</td>
                <td>{blog?.description}</td>
                <td>{blog?.blog_date && format(new Date(blog?.blog_date), 'dd-MMM-yyyy')}</td>
              </tr>
            )
          })
        }
       
      </tbody>
</table>
    </>
  )
}

export default UserBlogList