import React, { useEffect,useContext } from 'react'
import {Link as RouterLink, useLocation} from 'react-router-dom';
import { Link } from 'react-scroll'
import { AuthContext } from '../context/Auth.Context'
import { PageContext } from '../context/Page.Context';
import notFoundImage from '../../assets/R.jpg'

function Header() {
	const {logout,user} = useContext(AuthContext)
	const {myProfileData} = useContext(PageContext)
	const {pathname} = useLocation();

	const isNavigate = pathname === '/' 

	const handleScroll = (evt) => {
		const scrollValue = window.scrollY
		if(scrollValue >= 100){
			document.querySelector('#scroll')?.classList?.add('scrollVisible')
		}else{
			document.querySelector('#scroll')?.classList?.remove('scrollVisible')
		}
		
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
					<div className="container-fluid">
						<nav
							id="navbar-example2"
							className="navbar navbar-expand-lg navbar-light w-100"
						>
							<div className="navbar-brand"
								><img className="nav-logo" style={{height:'27px',width:'130px'}} src={myProfileData?.logo?.data?.attributes?.url ? myProfileData?.logo?.data?.attributes?.url : notFoundImage} alt="logo"
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
										(user || !user) &&
										<>
											<li className="nav-item">
												{
													isNavigate ? 
													<Link className="nav-link" activeClass="active"  to="top" spy={true} smooth={true}>
														Home
													</Link>
													:
                                                    <RouterLink className="nav-link" to="/" state={`top`}>
													    Home
													</RouterLink>
												}
											</li>
											<li className="nav-item">
											   {
													isNavigate ? 
													<Link className="nav-link" activeClass="active"  to="about" spy={true} smooth={true}>
														About
													</Link>
													:
                                                    <RouterLink className="nav-link" to="/" state={`about`}>
													    About
													</RouterLink>
												}
											</li>
											<li className="nav-item">
											   {
													isNavigate ? 
													<Link className="nav-link" activeClass="active"  to="skill" spy={true} smooth={true}>
														Skill
													</Link>
													:
                                                    <RouterLink className="nav-link" to="/" state={`skill`}>
													    Skill
													</RouterLink>
												}
											</li>
											<li className="nav-item">
											    {
													isNavigate ? 
													<Link className="nav-link" activeClass="active"  to="services" spy={true} smooth={true}>
														Services
													</Link>
													:
                                                    <RouterLink className="nav-link" to="/" state={`services`}>
													    Services
													</RouterLink>
												}
											</li>
											<li className="nav-item">
											   {
													isNavigate ? 
													<Link className="nav-link" activeClass="active"  to="portfolio" spy={true} smooth={true}>
														Portfolio
													</Link>
													:
                                                    <RouterLink className="nav-link" to="/" state={`portfolio`}>
													    Portfolio
													</RouterLink>
												}
											</li>
											<li className="nav-item">
											   {
													isNavigate ? 
													<Link className="nav-link" activeClass="active"  to="testimonial" spy={true} smooth={true}>
														Testimonial
													</Link>
													:
                                                    <RouterLink className="nav-link" to="/" state={`testimonial`}>
													    Testimonial
													</RouterLink>
												}
											</li>
											<li className="nav-item">
											   {
													isNavigate ? 
													<Link className="nav-link" activeClass="active"  to="blog" spy={true} smooth={true}>
														Blog
													</Link>
													:
                                                    <RouterLink className="nav-link" to="/" state={`blog`}>
													    Blog
													</RouterLink>
												}
											</li>
											<li className="nav-item">
											   {
													isNavigate ? 
													<Link className="nav-link" activeClass="active"  to="contact" spy={true} smooth={true}>
														Contact
													</Link>
													:
                                                    <RouterLink className="nav-link" to="/" state={`contact`}>
													    Contact
													</RouterLink>
												}
											</li>
										</>
									}

									{
										user && 
										<>
										   <li className="nav-item">
											   {
													isNavigate ? 
													<RouterLink className="nav-link" activeClass="active"  to="/create-blog" spy={true} smooth={true}>
														CreateBlog
													</RouterLink>
													:
                                                    <RouterLink className="nav-link" to="/create-blog" state={`/create-blog`}>
													    CreateBlog
													</RouterLink>
												}
								     	    </li>
											 <li className="nav-item">
											    {
													isNavigate ? 
													<RouterLink className="nav-link" activeClass="active"  to="/user-dashboard/profile" spy={true} smooth={true}>
														Dashboard
													</RouterLink>
													:
                                                    <RouterLink className="nav-link" to="/user-dashboard/profile" state={`/user-dashboard/profile`}>
													    Dashboard
													</RouterLink>
												}
								     	    </li>
											 <li className="nav-item">
											     <a className="nav-link" onClick={logout}>Logout</a>
										     </li>
										</>
									}
									
									{
                                        !user && 
										<>
										 <li className="nav-item">
										       {
													isNavigate ? 
													<RouterLink className="nav-link" activeClass="active"  to="/login" spy={true} smooth={true}>
														Login
													</RouterLink>
													:
                                                    <RouterLink className="nav-link" to="/login" state={`/login`}>
													    Login
													</RouterLink>
												}
								     	  </li>
										  <li className="nav-item">
										       {
													isNavigate ? 
													<RouterLink className="nav-link" activeClass="active"  to="/register" spy={true} smooth={true}>
														Register
													</RouterLink>
													:
                                                    <RouterLink className="nav-link" to="/register" state={`/register`}>
													    Register
													</RouterLink>
												}
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