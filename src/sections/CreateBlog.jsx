import React, { useEffect } from "react";
import Layout from "../components/layouts/Layout";
import ScrollToTop from "../components/shared/ScrollToTop";
import BlogCreateForm from "../components/blogCreatePageComponents/BlogCreateForm";
import ColorSetting from "../components/shared/ColorSetting";

function CreateBlog() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Layout>
        <ScrollToTop />
        <ColorSetting />
        <section className="banner background9 py_80 overlay_three full_row">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="banner_text text-center">
                  <h1 className="page_banner_title color_white text-uppercase">
                    CreateBlog
                  </h1>
                  <div className="breadcrumbs m-auto d-inline-block"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          name="contact"
          className="py_80 full_row bg_white"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
                  <h2 className="title text-uppercase">
                    <span className="mx-auto color_default">CreateBlog</span>
                  </h2>
                  <span className="sub_title">Create a new blog</span>
                </div>
              </div>
              <BlogCreateForm />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default CreateBlog;
