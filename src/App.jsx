import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from "react-router-dom"
import Home from './page/Home'
import AllBlog from './sections/AllBlog'
import BlogDetails from './sections/BlogDetails'
import Login from './sections/Login'
import Register from './sections/Register'
import CreateBlog from './sections/CreateBlog'
import CategoryWisePost from './sections/CategoryWisePost'
import NotFound from './sections/NotFound'
import DashBoard from './sections/DashBoard'
import Profile from './sections/Profile'
import ManagePassword from './sections/ManagePassword'
import UserBlogList from './sections/UserBlogList'
import TagWisePost from './sections/TagWisePost'
import Wrapper from './components/Wrapper'



function App() {
  return (
    <>
         <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
         <Wrapper>
          <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/blog-details/:id" element={ <BlogDetails/> } />
            <Route path="/all-blogs" element={ <AllBlog/> } />
            <Route path="/login" element={ <Login/> } />
            <Route path="/register" element={ <Register/> } />
            <Route path="/create-blog" element={ <CreateBlog/> } />
            <Route path="/category-wise-post/:id" element={ <CategoryWisePost/> } />
            <Route path="/tag-wise-post/:id" element={ <TagWisePost/> } />
            <Route path="*" element={ <NotFound/> } />
            <Route path="/user-dashboard" element={ <DashBoard/> }>
                <Route path="profile" element={<Profile />} />
                <Route path="manage-password" element={<ManagePassword />} />
                <Route path="blog-list" element={<UserBlogList />} />
            </Route>
          </Routes>
      </Wrapper>
    </>
  )
}

export default App
