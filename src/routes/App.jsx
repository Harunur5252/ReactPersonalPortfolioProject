import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from "react-router-dom"
import Home from '../page/Home'
import AllBlog from '../sections/AllBlog'
import BlogDetails from '../sections/BlogDetails'
import Login from '../sections/Login'
import Register from '../sections/Register'
import CreateBlog from '../sections/CreateBlog'
import CategoryWisePost from '../sections/CategoryWisePost'
import NotFound from '../sections/NotFound'
import DashBoard from '../sections/DashBoard'
import Profile from '../sections/Profile'
import ManagePassword from '../sections/ManagePassword'
import UserBlogList from '../sections/UserBlogList'
import TagWisePost from '../sections/TagWisePost'
import Wrapper from '../components/Wrapper'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import ForgotPassword from '../components/ForgotPassword'
import ResetPassword from '../components/ResetPassword'
import EditBlog from '../sections/EditBlog'


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
            <Route 
              path="/blog-details/:id" 
              element={ 
                <PrivateRoute>
                  <BlogDetails/> 
                </PrivateRoute>
              } 
            />
            <Route 
              path="/all-blogs" 
              element={ 
                <PrivateRoute>
                  <AllBlog/> 
                </PrivateRoute>
              } 
            />
            <Route 
              path="/login" 
              element={ 
                <PublicRoute>
                  <Login/> 
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={ 
                <PublicRoute>
                  <Register/> 
                </PublicRoute>
              } 
            />
            <Route 
              path="/create-blog" 
              element={ 
                <PrivateRoute>
                  <CreateBlog/> 
                </PrivateRoute>
              } 
            />
            <Route 
              path="/edit-blog/:id" 
              element={ 
                <PrivateRoute>
                  <EditBlog/> 
                </PrivateRoute>
              } 
            />
            <Route 
              path="/category-wise-post/:id" 
              element={
                <PrivateRoute>
                  <CategoryWisePost/> 
                </PrivateRoute> 
              } 
            />
            <Route 
              path="/tag-wise-post/:id" 
              element={ 
                <PrivateRoute>
                  <TagWisePost/> 
                </PrivateRoute>
              } 
            />
            <Route path="*" element={ <NotFound/> } />
            <Route path="/forgot-password" element={ <PublicRoute><ForgotPassword/></PublicRoute> } />
            <Route path="/reset-password" element={ <PublicRoute><ResetPassword/></PublicRoute> } />
            <Route path="/user-dashboard" element={<PrivateRoute><DashBoard/></PrivateRoute>  }>
                <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="manage-password" element={<PrivateRoute><ManagePassword /></PrivateRoute>} />
                <Route path="blog-list" element={<PrivateRoute><UserBlogList /></PrivateRoute>} />
            </Route>
          </Routes>
      </Wrapper>
    </>
  )
}

export default App
