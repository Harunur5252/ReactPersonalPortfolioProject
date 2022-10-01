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
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/blog-details/:id" element={ <BlogDetails/> } />
        <Route path="/all-blogs" element={ <AllBlog/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/create-blog" element={ <CreateBlog/> } />
        <Route path="/category-wise-post/:id" element={ <CategoryWisePost/> } />
      </Routes>
    </>
  )
}

export default App
