import { useContext, useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import BarLoader from "react-spinners/BarLoader";
import { motion } from "framer-motion";
import JoditEditor from "jodit-react";
import { BlogContext } from "../context/Blog.Context";

function BlogCreateForm() {
  const {
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm();
  // tracking date
  const [blogDate, setBlogDate] = useState(new Date());
  const { createBlog, blogSubmit, percentage, loadedCategory, tags } =
    useContext(BlogContext);
  // editor for blog
  const editor = useRef(null);
  const [valueContent, setValueContent] = useState("");

  const [createBlogData, setCreateBlogData] = useState({
    title: "",
    description: "",
    blog_image: null,
    category: "",
    tag: "",
  });

  const now = percentage;

  const defaultValue = {
    title: createBlogData?.title || "",
    description: createBlogData?.description || "",
    blog_image: createBlogData?.blog_image || null,
    category: createBlogData?.category || "",
    tag: createBlogData?.tag || "",
  };
  const { title, description, blog_image, category, tag } = defaultValue;

  useEffect(() => {
    if (blogSubmit) {
      reset({
        title: "",
        description: "",
        blog_image: null,
        category: "",
        tag: "",
      });
    }
  }, [blogSubmit]);

  useEffect(() => {
    setValue("blog_date", blogDate);
  }, [blogDate]);

  // creating a new blog
  const onSubmit = (data) => {
    setCreateBlogData(data);
    createBlog(data, valueContent);
  };
  return (
    <>
      <div className="col-md-12 col-lg-12">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <form
              className="form contact_message wow animated fadeInRight"
              id="contact-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      {...register("title", {
                        required: "title is required",
                        minLength: {
                          value: 10,
                          message: "title at least 10 or more character",
                        },
                        maxLength: {
                          value: 200,
                          message:
                            "title must be equal or less than 200 character",
                        },
                      })}
                      placeholder="Title"
                      defaultValue={title}
                    />
                    <span style={{ color: "red" }}>
                      {errors?.title?.message}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "black", fontWeight: "600" }}>
                      Blog Description :{" "}
                    </label>
                    <JoditEditor
                      ref={editor}
                      onChange={(content) => setValueContent(content)}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      showYearDropdown
                      selected={blogDate}
                      maxDate={blogDate}
                      onChange={(date) => setBlogDate(date)}
                    />
                    <span style={{ color: "red" }}>
                      {errors?.blog_date?.message}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="file"
                      accept="image/*"
                      defaultValue={blog_image}
                      {...register("blog_image", {
                        required: "image is required",
                      })}
                    />
                    <span style={{ color: "red" }}>
                      {errors?.blog_image?.message}
                    </span>
                  </div>
                  {blogSubmit && (
                    <BarLoader color="#36d7b7" height={8} width={500} />
                  )}
                  {blogSubmit && (
                    <p
                      style={{
                        textAlign: "center",
                        color: "green",
                        fontSize: "1.3rem",
                      }}
                    >{`${now}%`}</p>
                  )}
                </div>

                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <select
                      className="form-control"
                      type="select"
                      defaultValue={category}
                      {...register("category", {
                        required: "category is required",
                      })}
                    >
                      <option value="" selected>
                        choose a category
                      </option>
                      {loadedCategory.map((category) => {
                        return (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                    <span style={{ color: "red" }}>
                      {errors?.category?.message}
                    </span>
                  </div>
                </div>

                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <select
                      className="form-control"
                      type="select"
                      defaultValue={tag}
                      {...register("tag", { required: "tag is required" })}
                    >
                      <option value="" selected>
                        choose a tag
                      </option>
                      {tags.map((tag) => {
                        return (
                          <option key={tag.tagId} value={tag.tagId}>
                            {tag.name}
                          </option>
                        );
                      })}
                    </select>
                    <span style={{ color: "red" }}>{errors?.tag?.message}</span>
                  </div>
                </div>

                <div className="col-md-12 col-lg-12">
                  <div className="form-group">
                    <motion.button
                      className="btn btn-default"
                      id="send"
                      type="submit"
                      disabled={blogSubmit}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {blogSubmit ? "Loading...." : "Submit"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogCreateForm;
