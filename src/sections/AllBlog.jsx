import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader ";
import { BlogContext } from "../components/context/Blog.Context";
import Layout from "../components/layouts/Layout";
import ShowAllBlog from "../components/AllBlogPageComponents/ShowAllBlog";
import UserSocialLinks from "../components/shared/UserSocialLinks";
import AllCategory from "../components/shared/AllCategory";
import RecentPosts from "../components/shared/RecentPosts";
import AllTags from "../components/shared/AllTags";
import ScrollToTop from "../components/shared/ScrollToTop";
import ColorSetting from "../components/shared/ColorSetting";

function AllBlog() {
  const { loaded, pageNumber } = useContext(BlogContext);

  // initial scroll top
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  // pageNumber changed then scroll to top
  useEffect(() => {
    window.scroll(0, 0);
  }, [pageNumber]);

  return (
    <>
      <Layout>
        <ColorSetting />
        <ScrollToTop />

        <section className="banner background9 overlay_three full_row">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="banner_text text-center">
                  <h1 className="page_banner_title color_white text-uppercase">
                    All Blog
                  </h1>
                  <div className="breadcrumbs m-auto d-inline-block">
                    <ul>
                      <li className="hover_gray">
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                      </li>
                      <li className="color-default">All Blog</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {loaded && <BeatLoader color="#36d7b7" size={25} margin={5} />}
        <section className="blog_area py_80 bg_secondery full_row">
          <div className="container">
            <div className="row">
              <ShowAllBlog />
              <div className="col-md-5 col-lg-4">
                <div className="blog_sidebar">
                  <UserSocialLinks />
                  <AllCategory />
                  <RecentPosts />
                  <AllTags />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default AllBlog;
