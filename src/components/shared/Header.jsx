import React, { useEffect,useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-scroll'
import { AuthContext } from '../context/Auth.Context'

function Header() {
	const {logout,user} = useContext(AuthContext)
	const handleScroll = (evt) => {
		const scrollValue = window.scrollY
		if(scrollValue >=400){
			document.querySelector('.scrollToTopIcon').classList.add('visible')
		}else{
			document.querySelector('.scrollToTopIcon').classList.remove('visible')
		}
		
		if(scrollValue >= 100){
		   document.querySelector('.main_nav').classList.add('nav-scroll')
		}else{
		   document.querySelector('.main_nav').classList.remove('nav-scroll')
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
							<Link className="navbar-brand" to="top" spy={true} smooth={true}
								><img className="nav-logo" src="/images/logo/1.png" alt="logo"
							/></Link>
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
									<li className="nav-item">
										<Link className="nav-link"  to="top" spy={true} smooth={true}>
											Home
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" activeClass="active" to="about" spy={true} smooth={true}>About</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" activeClass="active" to="skill" spy={true} smooth={true}>Skill</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" activeClass="active" to="services" spy={true} smooth={true}>Services</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" activeClass="active" to="portfolio" spy={true} smooth={true}>Portfolio</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" activeClass="active" to="testimonial" spy={true} smooth={true}>Testimonial</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" activeClass="active" to="blog" spy={true} smooth={true}>Blog</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" activeClass="active" to="contact" spy={true} smooth={true}>Contact</Link>
									</li>
									{
										user && 
										<li className="nav-item">
											<a className="nav-link" onClick={logout}>Logout</a>
										</li>
									}
									{
                                        !user && <>
										 <li className="nav-item">
										    <NavLink className="nav-link" to="/login">Login</NavLink>
								     	  </li>
										  <li className="nav-item">
											 <NavLink className="nav-link" to="/register">Register</NavLink>
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

export default Header