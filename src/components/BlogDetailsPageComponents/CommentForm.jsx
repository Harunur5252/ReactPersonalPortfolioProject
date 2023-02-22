import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BlogContext } from "../context/Blog.Context";
import { PageContext } from "../context/Page.Context";

// validation rules for all input fields
const schema = yup.object({
  description: yup
    .string()
    .required("description is required")
    .min(5, "userName must be 5 or more")
    .max(5000, "userName must be equal or less than 5000"),
});

function CommentForm({ blogId }) {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { comment, commentSubmit } = useContext(BlogContext);
  const { colorData } = useContext(PageContext);
  const [resetComment, setResetComment] = useState({ description: "" });

  const onSubmit = (data) => {
    setResetComment(data);
    comment(data, blogId);
  };

  const defaultValue = {
    description: resetComment?.description || "",
  };
  const { description } = defaultValue;
  useEffect(() => {
    if (commentSubmit) {
      reset({
        description: "",
      });
    }
  }, [commentSubmit]);

  return (
    <>
      <div className="replay mt_60 wow animated slideInUp">
        <h4 className="text-uppercase color_primary mb_30">Leave A Comment</h4>
        <form className="reply_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-12">
              <textarea
                className="form-control"
                defaultValue={description}
                {...register("description")}
                rows="7"
                placeholder="Type Comments..."
              ></textarea>
              <span style={{ color: "red" }}>
                {errors?.description?.message}
              </span>
            </div>

            <div className="col-md-12">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="btn btn-default"
                disabled={commentSubmit}
                style={{backgroundColor:colorData?.colorName}}
              >
                {commentSubmit ? "Loading..." : "Post Comment"}
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CommentForm;
