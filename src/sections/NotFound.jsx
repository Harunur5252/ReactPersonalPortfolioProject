import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { PageContext } from '../components/context/Page.Context'

function NotFound() {
	const {about,myProfileData} = useContext(PageContext)
  return (
    <>
       <div id="notfound">
		<div className="notfound">
			<div className='mb-3'>
				<h1 style={{color:'red',fontSize:'3rem',fontWeight:'600'}}>Oops!</h1>
			</div>
			    <h2>404 - Page not found</h2>
				<p>The page you are looking for might have been removed had its name changed  or is temporarily unavailable.</p>
		</div>
	</div>
    </>
  )
}

export default NotFound