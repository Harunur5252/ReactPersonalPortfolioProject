import React from 'react'
import { useContext } from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import { AuthContext } from '../components/context/Auth.Context'

function PublicRoute({children}) {
  const {user} = useContext(AuthContext)
  const location = useLocation()
  const loadedComponent = user ? <Navigate to={location?.state?.from ? location?.state?.from : '/all-blogs'} /> : children
  return (
    <div>{loadedComponent}</div>
  )
}

export default PublicRoute
