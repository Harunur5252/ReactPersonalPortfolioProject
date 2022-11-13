import { lazy, Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from "react-router-dom"
import ErrorFallback from '../components/ErrorFallback'
import { ErrorBoundary } from 'react-error-boundary'


// components using code spiting and lazy loading
const Home = lazy(() => import('../page/Home'))
const AllBlog = lazy(() => import('../sections/AllBlog'))
const BlogDetails = lazy(() => import('../sections/BlogDetails'))
const Login = lazy(() => import('../sections/Login'))
const Register = lazy(() => import('../sections/Register'))
const CreateBlog = lazy(() => import('../sections/CreateBlog'))
const CategoryWisePost = lazy(() => import('../sections/CategoryWisePost'))
const NotFound = lazy(() => import('../sections/NotFound'))
const DashBoard = lazy(() => import('../sections/DashBoard'))
const Profile = lazy(() => import('../sections/Profile'))
const ManagePassword = lazy(() => import('../sections/ManagePassword'))
const UserBlogList = lazy(() => import('../sections/UserBlogList'))
const TagWisePost = lazy(() => import('../sections/TagWisePost'))
const Wrapper = lazy(() => import('../components/Wrapper'))
const PrivateRoute = lazy(() => import('../routes/PrivateRoute'))
const PublicRoute = lazy(() => import('../routes/PublicRoute'))
const ForgotPassword = lazy(() => import('../components/ForgotPassword'))
const ResetPassword = lazy(() => import('../components/ResetPassword'))
const EditBlog = lazy(() => import('../sections/EditBlog'))
const Preloader = lazy(() => import('../components/shared/Preloader'))


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

    <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
           location.reload()
        }}
      >
        <Suspense fallback={<div><Preloader /></div>}>
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
        </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default App
