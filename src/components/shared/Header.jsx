import React, { useEffect, useContext } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { AuthContext } from "../context/Auth.Context";
import { PageContext } from "../context/Page.Context";
import notFoundImage from "../../assets/R.jpg";
import Tippy from "@tippyjs/react";

function Header() {
  const { logout, user } = useContext(AuthContext);
  const { myProfileData, colorData } = useContext(PageContext);
  const { pathname } = useLocation();

  const isNavigate = pathname === "/";

  const handleScroll = (evt) => {
    const scrollValue = window.scrollY;
    if (scrollValue >= 100) {
      document.querySelector("#scroll")?.classList?.add("scrollVisible");
    } else {
      document.querySelector("#scroll")?.classList?.remove("scrollVisible");
    }

    if (scrollValue >= 100) {
      document.querySelector(".main_nav")?.classList?.add("nav-scroll");
    } else {
      document.querySelector(".main_nav")?.classList?.remove("nav-scroll");
    }
  };
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const title = (
    <Tippy
      content={
        <span>
          {myProfileData?.logo?.data?.attributes?.url
            ? "website logo"
            : "website logo not found"}
        </span>
      }
    ></Tippy>
  );

  return (
    <>
      <header className="main_nav">
        <div className="container-fluid">
          <nav
            id="navbar-example2"
            className="navbar navbar-expand-lg navbar-light w-100"
          >
            {user ? (
              <div className="navbar-brand">
                <img
                  className="nav-logo"
                  style={{ height: "27px", width: "86px" }}
                  src={
                    myProfileData?.logo?.data?.attributes?.url
                      ? myProfileData?.logo?.data?.attributes?.url
                      : notFoundImage
                  }
                  alt="logo"
                  title={title?.props?.content?.props?.children}
                />
              </div>
            ) : (
              <div className="navbar-brand">
                <img
                  className="nav-logo"
                  style={{ height: "27px", width: "130px" }}
                  src={
                    myProfileData?.logo?.data?.attributes?.url
                      ? myProfileData?.logo?.data?.attributes?.url
                      : notFoundImage
                  }
                  alt="logo"
                  title={title?.props?.content?.props?.children}
                />
              </div>
            )}

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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                {(user || !user) && (
                  <>
                    <li className="nav-item">
                      {isNavigate ? (
                        <Link
                          className="nav-link"
                          activeClass="active"
                          to="top"
                          spy={true}
                          smooth={true}
                          style={{ color: colorData?.colorName }}
                        >
                          Home
                        </Link>
                      ) : (
                        <RouterLink
                          style={{ color: colorData?.colorName }}
                          className="nav-link"
                          to="/"
                          state={`top`}
                        >
                          Home
                        </RouterLink>
                      )}
                    </li>
                    <li className="nav-item">
                      {isNavigate ? (
                        <Link
                          className="nav-link"
                          activeClass="active"
                          to="about"
                          spy={true}
                          smooth={true}
                          style={{ color: colorData?.colorName }}
                        >
                          About
                        </Link>
                      ) : (
                        <RouterLink
                          style={{ color: colorData?.colorName }}
                          className="nav-link"
                          to="/"
                          state={`about`}
                        >
                          About
                        </RouterLink>
                      )}
                    </li>
                    <li className="nav-item">
                      {isNavigate ? (
                        <Link
                          className="nav-link"
                          activeClass="active"
                          to="skill"
                          spy={true}
                          smooth={true}
                          style={{ color: colorData?.colorName }}
                        >
                          Skill
                        </Link>
                      ) : (
                        <RouterLink
                          style={{ color: colorData?.colorName }}
                          className="nav-link"
                          to="/"
                          state={`skill`}
                        >
                          Skill
                        </RouterLink>
                      )}
                    </li>
                    <li className="nav-item">
                      {isNavigate ? (
                        <Link
                          className="nav-link"
                          activeClass="active"
                          to="services"
                          spy={true}
                          smooth={true}
                          style={{ color: colorData?.colorName }}
                        >
                          Services
                        </Link>
                      ) : (
                        <RouterLink
                          className="nav-link"
                          to="/"
                          state={`services`}
                          style={{ color: colorData?.colorName }}
                        >
                          Services
                        </RouterLink>
                      )}
                    </li>
                    <li className="nav-item">
                      {isNavigate ? (
                        <Link
                          className="nav-link"
                          activeClass="active"
                          to="portfolio"
                          spy={true}
                          smooth={true}
                          style={{ color: colorData?.colorName }}
                        >
                          Portfolio
                        </Link>
                      ) : (
                        <RouterLink
                          className="nav-link"
                          to="/"
                          state={`portfolio`}
                          style={{ color: colorData?.colorName }}
                        >
                          Portfolio
                        </RouterLink>
                      )}
                    </li>
                    <li className="nav-item">
                      {isNavigate ? (
                        <Link
                          className="nav-link"
                          activeClass="active"
                          to="testimonial"
                          spy={true}
                          smooth={true}
                          style={{ color: colorData?.colorName }}
                        >
                          Testimonial
                        </Link>
                      ) : (
                        <RouterLink
                          className="nav-link"
                          to="/"
                          state={`testimonial`}
                          style={{ color: colorData?.colorName }}
                        >
                          Testimonial
                        </RouterLink>
                      )}
                    </li>
                    {user && (
                      <li className="nav-item">
                        {isNavigate ? (
                          <Link
                            className="nav-link"
                            activeClass="active"
                            to="blog"
                            spy={true}
                            smooth={true}
                            style={{ color: colorData?.colorName }}
                          >
                            Blog
                          </Link>
                        ) : (
                          <RouterLink
                            className="nav-link"
                            to="/"
                            state={`blog`}
                            style={{ color: colorData?.colorName }}
                          >
                            Blog
                          </RouterLink>
                        )}
                      </li>
                    )}

                    <li className="nav-item">
                      {isNavigate ? (
                        <Link
                          className="nav-link"
                          activeClass="active"
                          to="contact"
                          spy={true}
                          smooth={true}
                          style={{ color: colorData?.colorName }}
                        >
                          Contact
                        </Link>
                      ) : (
                        <RouterLink
                          className="nav-link"
                          to="/"
                          state={`contact`}
                          style={{ color: colorData?.colorName }}
                        >
                          Contact
                        </RouterLink>
                      )}
                    </li>
                  </>
                )}

                {user && (
                  <>
                    {/* <li className="nav-item">
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
											</li> */}
                    <li className="nav-item">
                      {isNavigate ? (
                        <RouterLink
                          className="nav-link"
                          activeClass="active"
                          to="/create-blog"
                          spy={true}
                          smooth={true}
                          style={{ color: colorData?.colorName }}
                        >
                          CreateBlog
                        </RouterLink>
                      ) : (
                        <RouterLink
                          className="nav-link"
                          activeClass="active"
                          to="/create-blog"
                          state={`/create-blog`}
                          style={{ color: colorData?.colorName }}
                        >
                          CreateBlog
                        </RouterLink>
                      )}
                    </li>
                    <li className="nav-item">
                      {isNavigate ? (
                        <RouterLink
                          className="nav-link"
                          activeClass="active"
                          to="/user-dashboard/profile"
                          spy={true}
                          smooth={true}
                          style={{ color: colorData?.colorName }}
                        >
                          Dashboard
                        </RouterLink>
                      ) : (
                        <RouterLink
                          className="nav-link"
                          to="/user-dashboard/profile"
                          state={`/user-dashboard/profile`}
                          style={{ color: colorData?.colorName }}
                        >
                          Dashboard
                        </RouterLink>
                      )}
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ color: colorData?.colorName }}
                        onClick={logout}
                      >
                        Logout
                      </a>
                    </li>
                  </>
                )}

                {!user && (
                  <>
                    <li className="nav-item">
                      {isNavigate ? (
                        <RouterLink
                          className="nav-link"
                          activeClass="active"
                          to="/login"
                          spy={true}
                          smooth={true}
                          style={{ color: colorData?.colorName }}
                        >
                          Login
                        </RouterLink>
                      ) : (
                        <RouterLink
                          className="nav-link"
                          to="/login"
                          state={`/login`}
                          style={{ color: colorData?.colorName }}
                        >
                          Login
                        </RouterLink>
                      )}
                    </li>
                    <li className="nav-item">
                      {isNavigate ? (
                        <RouterLink
                          className="nav-link"
                          activeClass="active"
                          to="/register"
                          spy={true}
                          smooth={true}
                          style={{ color: colorData?.colorName }}
                        >
                          Register
                        </RouterLink>
                      ) : (
                        <RouterLink
                          className="nav-link"
                          to="/register"
                          state={`/register`}
                          style={{ color: colorData?.colorName }}
                        >
                          Register
                        </RouterLink>
                      )}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
