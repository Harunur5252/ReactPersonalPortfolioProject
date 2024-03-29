import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Layout from "../components/layouts/Layout";
import ScrollToTop from "../components/shared/ScrollToTop";
import { Link } from "react-router-dom";
import { axiosPublicInstance } from "../Utils/axios";
import ColorSetting from "./shared/ColorSetting";
import { useContext } from "react";
import { PageContext } from "./context/Page.Context";

// validation rules for all input fields
const schema = yup.object({
  email: yup
    .string()
    .lowercase()
    .required("Email is required")
    .email("Must be valid email"),
});

function ForgotPassword() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [submit, setSubmit] = useState(false);
  const [resetData, setResetData] = useState({});
  const { colorData } = useContext(PageContext);
  const defaultValue = {
    email: resetData?.email || "",
  };
  const { email } = defaultValue;
  useEffect(() => {
    if (submit) {
      reset({
        email: "",
      });
    }
  }, [submit]);

  const onSubmit = async (data) => {
    setResetData(data);
    try {
      setSubmit(true);
      const response = await axiosPublicInstance.post("/auth/forgot-password", {
        email: data?.email,
      });
      setSubmit(false);
      toast.success("Email is sent successfully with password reset link");
    } catch (err) {
      setSubmit(false);
      toast.error(err?.response?.data?.error?.message);
    }
  };

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
                  <h1
                    style={{ color: colorData?.colorName }}
                    className="page_banner_title color_white text-uppercase"
                  >
                    Forgot Password
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
                    <span
                      style={{ color: colorData?.colorName }}
                      className="mx-auto color_default"
                    >
                      Forgot Password
                    </span>
                  </h2>
                </div>
              </div>
              <div className="col-md-12 col-lg-12">
                <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
                  <form
                    className="form contact_message wow animated fadeInRight"
                    id="contact-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="col-md-12 col-lg-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="email"
                          {...register("email")}
                          defaultValue={email}
                          placeholder="Email Address"
                        />
                        <span style={{ color: "red" }}>
                          {errors?.email?.message}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12">
                      <div className="form-group">
                        <button
                          className="btn btn-default"
                          id="send"
                          type="submit"
                          disabled={submit}
                          style={{ backgroundColor: colorData?.colorName }}
                        >
                          {submit ? "Loading..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default ForgotPassword;
