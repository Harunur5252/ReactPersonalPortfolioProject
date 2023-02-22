import React, { useContext } from "react";
import parse from "html-react-parser";
import format from "date-fns/format";
import notFoundImage from "../../assets/R.jpg";
import { Link } from "react-router-dom";
import { PageContext } from "../context/Page.Context";
function ShowSingleCategoryWisePosts({
  currentPosts,
  pageCountArray,
  currentPage,
  setCurrentPage,
}) {
    const {colorData} = useContext(PageContext)
  return (
    <>
      <div className="col-md-7 col-lg-8">
        {currentPosts?.length >= 1 ? (
          <>
            <div className="blog_list mb_60">
              {currentPosts?.map((blog) => {
                return (
                  <div
                    key={blog?.blogId}
                    className="blog_item mb_30 wow    animated slideInUp"
                  >
                    {blog?.blog_image &&
                    blog?.title &&
                    parse(blog?.description) &&
                    blog?.blog_date ? (
                      <div className="comments">
                        <i style={{color:colorData?.colorName}} className="fa fa-comment" aria-hidden="true"></i>
                        <span className="color_white">
                          {blog?.likes?.length}
                        </span>
                      </div>
                    ) : null}
                    <div className="blog_img overlay_one">
                      <img
                        src={
                          blog?.blog_image ? blog?.blog_image : notFoundImage
                        }
                        alt="image"
                      />
                    </div>
                    <div className="blog_content bg_white">
                      <div className="blog_title">
                        <Link
                          className="color_primary"
                          to={`/blog-details/${blog?.slug}`}
                        >
                          <h5>
                            {blog?.title ? (
                              blog?.title
                            ) : (
                              <p style={{ color: "red" }}>no title</p>
                            )}
                          </h5>
                        </Link>
                      </div>
                      <p className="mt_15 mb_30">
                        {blog?.description ? (
                          parse(blog?.description)
                        ) : (
                          <p style={{ color: "red" }}>no description</p>
                        )}
                      </p>

                      <div className="admin">
                        <img
                          src={
                            blog?.profilePicture
                              ? blog?.profilePicture
                              : notFoundImage
                          }
                          alt="image"
                        />
                        <span className="color_white">
                          {`by - `}{" "}
                          {blog?.firstName ? (
                            blog?.firstName
                          ) : (
                            <span style={{ color: "rgba(208, 213, 17, 0.8)" }}>
                              no author name
                            </span>
                          )}{" "}
                          {blog?.lastName}{" "}
                        </span>
                      </div>
                      <div className="date float-right color_primary">
                        {blog?.blog_date ? (
                          format(new Date(blog?.blog_date), "dd MMM yyyy")
                        ) : (
                          <p style={{ color: "red" }}>no published date</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <nav>
              <ul className="pagination wow animated slideInUp full_row">
                {pageCountArray?.map((count, index) => {
                  return (
                    <li
                      key={index}
                      style={{color:colorData?.colorName}}
                      className={`page-item ${
                        count === currentPage ? "active" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        onClick={() => setCurrentPage(count)}
                      >
                        {count}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </>
        ) : (
          <p style={{ color: "red", fontSize: "1.5rem" }}>
            No category wise post show
          </p>
        )}
      </div>
    </>
  );
}

export default ShowSingleCategoryWisePosts;
