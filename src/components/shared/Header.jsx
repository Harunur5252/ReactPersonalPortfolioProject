import React from 'react'

function Header() {
  return (
    <>
        <header className="main_nav">
					<div className="container">
						<nav
							id="navbar-example2"
							className="navbar navbar-expand-lg navbar-light w-100"
						>
							<a className="navbar-brand" href="#top"
								><img className="nav-logo" src="images/logo/1.png" alt="logo"
							/></a>
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
										<a className="nav-link active" href="#top" data-scroll="top"
											>Home<span className="sr-only">(current)</span></a
										>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#about">About</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#skill">Skill</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#services">Services</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#portfolio">Portfolio</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#testimonial">Testimonial</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#blog">Blog</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#contact">Contact</a>
									</li>
								</ul>
							</div>
						</nav>
					</div>
		</header>
    </>
  )
}

export default Header