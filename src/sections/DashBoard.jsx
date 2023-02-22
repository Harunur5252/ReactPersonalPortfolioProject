import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import ColorSetting from "../components/shared/ColorSetting";
import ScrollToTop from "../components/shared/ScrollToTop";

function DashBoard() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Layout>
        <ScrollToTop />
        <ColorSetting />
        <section className="banner background9 overlay_three full_row">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="banner_text text-center">
                  <h1 className="page_banner_title color_white text-uppercase">
                    User Dashboard
                  </h1>
                  <div className="breadcrumbs m-auto d-inline-block">
                    <ul>
                      <li className="hover_gray">
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                      </li>
                      <li className="color-default">User Dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="row mt-5 ml-5 mb-5">
          <div className="col-3">
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <NavLink
                className="nav-link"
                style={({ isActive }) => {
                  isActive ? "active" : "";
                }}
                id="v-pills-home-tab"
                data-toggle="pill"
                to="profile"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                Profile
              </NavLink>

              <NavLink
                className="nav-link"
                id="v-pills-profile-tab"
                data-toggle="pill"
                style={({ isActive }) => {
                  isActive ? "active" : "";
                }}
                to="manage-password"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                Manage Password
              </NavLink>

              <NavLink
                className="nav-link"
                style={({ isActive }) => {
                  isActive ? "active" : "";
                }}
                id="v-pills-messages-tab"
                data-toggle="pill"
                to="blog-list"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                User Blog List
              </NavLink>
            </div>
          </div>
          <div className="col-9">
            <div className="tab-content" id="v-pills-tabContent">
              <Outlet />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default DashBoard;
