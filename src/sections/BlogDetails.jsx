import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { BlogContext } from "../components/context/Blog.Context";
import { AuthContext } from "../components/context/Auth.Context";
import Layout from "../components/layouts/Layout";
import Comment from "../components/Comment";
import UserSocialLinks from "../components/shared/UserSocialLinks";
import AllCategory from "../components/shared/AllCategory";
import RecentPosts from "../components/shared/RecentPosts";
import AllTags from "../components/shared/AllTags";
import CommentForm from "../components/BlogDetailsPageComponents/CommentForm";
import ShowSingleBlogDetails from "../components/BlogDetailsPageComponents/ShowSingleBlogDetails";
import ColorSetting from "../components/shared/ColorSetting";
import ScrollToTop from "../components/shared/ScrollToTop";
import { PageContext } from "../components/context/Page.Context";

function BlogDetails() {
  const {
    blogsWithoutPaginationData,
    handleLike,
    handleUnLike,
    comment,
    commentSubmit,
    commentLoadedArr,
  } = useContext(BlogContext);
  const {colorData} = useContext(PageContext);
  const { user, token } = useContext(AuthContext);
  const [blog, setBlog] = useState({});
  const [likes, setLikes] = useState([]);
  const [findLike, setFindLike] = useState({});
  const [isLike, setIsLike] = useState(false);
  const { id } = useParams();

  const findSingleBlog = blogsWithoutPaginationData?.find(
    (blog) => blog?.slug === id
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (findSingleBlog && id) {
      setBlog(findSingleBlog);
      setLikes(findSingleBlog?.likes);
    }
  }, [findSingleBlog, id]);

  useEffect(() => {
    if (user && token) {
      (async () => {
        handleLikeCheck();
      })();
    }
  }, [user, token, likes]);

  const handleLikeCheck = () => {
    const findBlogLike = likes?.find((like) => {
      if (like?.attributes?.user?.data?.id === user?.id) {
        return like;
      }
    });
    setFindLike(findBlogLike);
    if (findBlogLike) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  };

  const blogId = blog?.blogId;

  const comments = commentLoadedArr?.filter((comment) => {
    if (comment?.blogId === blog?.blogId) {
      return comment;
    }
  });

  return (
    <>
      <Layout>
        <ColorSetting />
        <ScrollToTop />
        <section className="banner background9 py_80 overlay_three full_row">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="banner_text text-center">
                  <h1 className="page_banner_title color_white text-uppercase">
                    Blog Details
                  </h1>
                  <div className="breadcrumbs m-auto d-inline-block">
                    <ul>
                      <li className="hover_gray">
                        <Link to="/all-blogs">Blog</Link>
                      </li>
                      <li>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                      </li>
                      <li className="color-default">Blog Details</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="blog_area py_80 bg_secondery full_row">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-lg-8">
                <div className="blog_details">
                  <ShowSingleBlogDetails blog={blog} />
                  {blog?.blog_image &&
                  blog?.title &&
                  blog?.description &&
                  blog?.blog_date ? (
                    <>
                      <div className="comment_area mt_60">
                        <h4 className="text-uppercase color_primary mb_30">
                          Comments (
                          {blog?.blog_image &&
                          blog?.title &&
                          blog?.description &&
                          blog?.blog_date
                            ? comments?.length
                            : 0}
                          )&nbsp;&nbsp;
                          <span style={{ fontSize: "2rem", cursor: "pointer" }}>
                            {isLike ? (
                              <button
                                className="btn btn-default"
                                onClick={() => handleLike(blog?.blogId)}
								style={{backgroundColor:colorData?.colorName}}
                              >
                                {<FaThumbsUp />}
                              </button>
                            ) : (
                              <button
                                className="btn btn-default"
                                onClick={() =>
                                  handleUnLike(blog?.blogId, findLike?.id)
                                }
								style={{backgroundColor:colorData?.colorName}}
                              >
                                {<FaThumbsDown />}
                              </button>
                            )}
                          </span>
                        </h4>
                        <ul className="user_comments">
                          {comments?.map((comment) => {
                            return (
                              <Comment
                                key={comment?.cmtId}
                                comment={comment}
                                blogId={blogId}
                              />
                            );
                          })}
                        </ul>
                      </div>

                      <CommentForm blogId={blogId} />
                    </>
                  ) : null}
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
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

export default BlogDetails;
