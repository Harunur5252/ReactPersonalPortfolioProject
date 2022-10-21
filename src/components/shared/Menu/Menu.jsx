import { useEffect } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/Auth.Context'

function Menu() {
	 const {logout,user} = useContext(AuthContext)

	 const handleScroll = (evt) => {
		const scrollValue = window.scrollY
		if(scrollValue >= 100){
		   document.querySelector('.main_nav')?.classList?.add('nav-scroll')
		}else{
		   document.querySelector('.main_nav')?.classList?.remove('nav-scroll')
		}
	 }
	 useEffect(() => {
		document.addEventListener('scroll',handleScroll)
		return () => {
		   document.removeEventListener('scroll',handleScroll)
		}
	 },[])
	 
  return (
    <>
        <header className="main_nav">
					<div className="container">
						<nav
							id="navbar-example2"
							className="navbar navbar-expand-lg navbar-light w-100"
						>
							<div className="navbar-brand" 
								><img className="nav-logo" src="/images/logo/1.png" alt="logo"
							/></div>
							<button
								className="navbar-toggler"
								type="button"
								data-toggle="collapse"
								data-target="#navbarSupportedContent"
								aria-controls="navbarSupportedContent"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav ml-auto">
									{
										user && 
										<li className="nav-item">
											<Link className="nav-link"  to="/" data-scroll="top">
												Home
										    </Link>
										</li>
									}
									
									{
                                        !user && <>
										 <li className="nav-item">
										    <Link className="nav-link" to="/login">Login</Link>
								     	  </li>
										  <li className="nav-item">
											 <Link className="nav-link" to="/register">Register</Link>
										   </li>
										</>
									}
									
									{
										user && 
										<>
										    <li className="nav-item">
										       <Link className="nav-link" to="/create-blog">CreateBlog</Link>
								     	    </li>
											 <li className="nav-item">
										       <Link className="nav-link" to="/user-dashboard/profile">Dashboard</Link>
								     	    </li>
											<li className="nav-item">
											   <a className="nav-link" onClick={logout}>Logout</a>
											</li>
										</>
									
									}
								</ul>
							</div>
						</nav>
					</div>
		</header>
    </>
  )
}

export default Menu