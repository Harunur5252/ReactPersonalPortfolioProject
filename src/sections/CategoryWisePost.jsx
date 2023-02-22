import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import qs from "qs";
import { animateScroll as scroll } from "react-scroll";
import BeatLoader from "react-spinners/BeatLoader ";
import { AuthContext } from "../components/context/Auth.Context";
import { axiosPrivateInstance } from "../Utils/axios";
import Layout from "../components/layouts/Layout";
import ScrollToTop from "../components/shared/ScrollToTop";
import ShowSingleCategoryWisePosts from "../components/categoryWisePostComponents/ShowSingleCategoryWisePosts";
import UserSocialLinks from "../components/shared/UserSocialLinks";
import AllCategory from "../components/shared/AllCategory";
import RecentPosts from "../components/shared/RecentPosts";
import AllTags from "../components/shared/AllTags";
import ColorSetting from "../components/shared/ColorSetting";

const generateArr = (totalPost, postPerPage) => {
  const arr = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    arr.push(i);
  }
  return arr;
};

function CategoryWisePost() {
  const { id: categoryId } = useParams();
  const { user, token } = useContext(AuthContext);
  const [postArr, setPostArr] = useState([]);
  const [loadedCategoryPost, setLoadedCategoryPost] = useState(false);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = import.meta.env.VITE_CATEGORY_PAGE_SIZE;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    scroll.scrollToTop();
  }, [currentPage]);

  useEffect(() => {
    if (user && token) {
      (async () => {
        loadedCategoryWisePost();
      })();
    }
  }, [user, token]);

  const loadedCategoryWisePost = async () => {
    const query = qs.stringify({
      populate: [
        "blog_posts",
        "blog_posts.likes",
        "blog_posts.comments",
        "blog_posts.blog_image",
        "blog_posts.author",
        "blog_posts.author.profile",
        "blog_posts.author.profile.profilePicture",
      ],
    });
    try {
      setLoadedCategoryPost(true);
      const response = await axiosPrivateInstance(token).get(
        `/categories?${query}`
      );
      const categoryPostArr = response.data.data?.map((categoryPost) => {
        return {
          categoryId: categoryPost?.id,
          slug: categoryPost?.attributes?.slug,
          categoryWisePostData: categoryPost?.attributes?.blog_posts,
        };
      });
      setLoadedCategoryPost(false);
      setPostArr(categoryPostArr);
    } catch (err) {
      setLoadedCategoryPost(false);
      console.log(err.response);
    }
  };

  const singleCategory = postArr?.find((category) => {
    if (category?.slug === categoryId) {
      return category;
    }
  });

  const categoryWisePostArr = singleCategory?.categoryWisePostData?.data?.map(
    (post) => {
      return {
        blogId: post?.id,
        imgId: post?.attributes?.blog_image?.data?.id,
        authorId: post?.attributes?.author?.data?.id,
        profileId:
          post?.attributes?.author?.data?.attributes?.profile?.data?.id,
        profilePictureId:
          post?.attributes?.author?.data?.attributes?.profile?.data?.attributes
            ?.profilePicture?.data?.id,
        title: post?.attributes?.title,
        slug: post?.attributes?.slug,
        likes: post?.attributes?.likes?.data,
        description: post?.attributes?.description,
        blog_image: post?.attributes?.blog_image?.data?.attributes?.url,
        blog_date: post?.attributes?.blog_date,
        firstName:
          post?.attributes?.author?.data?.attributes?.profile?.data?.attributes
            ?.firstName,
        lastName:
          post?.attributes?.author?.data?.attributes?.profile?.data?.attributes
            ?.lastName,
        address:
          post?.attributes?.author?.data?.attributes?.profile?.data?.attributes
            ?.address,
        facebookAccount:
          post?.attributes?.author?.data?.attributes?.profile?.data?.attributes
            ?.facebookAccount,
        googlePlusAccount:
          post?.attributes?.author?.data?.attributes?.profile?.data?.attributes
            ?.googlePlusAccount,
        instagramAccount:
          post?.attributes?.author?.data?.attributes?.profile?.data?.attributes
            ?.instagramAccount,
        linkedinAccount:
          post?.attributes?.author?.data?.attributes?.profile?.data?.attributes
            ?.linkedinAccount,
        twitterAccount:
          post?.attributes?.author?.data?.attributes?.profile?.data?.attributes
            ?.twitterAccount,
        website:
          post?.attributes?.author?.data?.attributes?.profile?.data?.attributes
            ?.website,
        profilePicture:
          post?.attributes?.author?.data?.attributes?.profile?.data?.attributes
            ?.profilePicture?.data?.attributes?.url,
      };
    }
  );

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = categoryWisePostArr?.slice(
    firstPostIndex,
    lastPostIndex
  );
  const pageCountArray = generateArr(categoryWisePostArr?.length, postPerPage);

  useEffect(() => {
    if (currentPage !== categoryWisePostArr?.length) {
      setCurrentPage(currentPage);
    }
    if (currentPage > categoryWisePostArr?.length) {
      setCurrentPage(1);
    }
  }, [currentPage, categoryWisePostArr?.length]);

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
                    Category-Wise-Post
                  </h1>
                  <div className="breadcrumbs m-auto d-inline-block">
                    <ul>
                      <li className="hover_gray">
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                      </li>
                      <li className="color-default">CategoryWisePost</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {loadedCategoryPost && (
          <BeatLoader color="#36d7b7" size={25} margin={5} />
        )}
        <section className="blog_area py_80 bg_secondery full_row">
          <div className="container">
            <div className="row">
              <ShowSingleCategoryWisePosts
                currentPosts={currentPosts}
                pageCountArray={pageCountArray}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
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

export default CategoryWisePost;
