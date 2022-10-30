import { useContext } from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import { AuthContext } from '../components/context/Auth.Context'

function PrivateRoute({children}) {
  const {user} = useContext(AuthContext)
  const location = useLocation()

  const loadedComponent = user ? children : <Navigate to='/login' state={{from : location.pathname}} />
  return (
    <div>{loadedComponent}</div>
  )
}

export default PrivateRoute