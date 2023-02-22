import { useEffect, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PageContext } from "../components/context/Page.Context";
import { testimonialDesVariants } from "../components/testimonialSectionComponents/animationData";
import TestimonialSlider from "../components/testimonialSectionComponents/TestimonialSlider";

function Testimonial() {
  const { testimonialData,colorData } = useContext(PageContext);

  // animation
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <>
      <section
        id="testimonial"
        name="testimonial"
        className="py_80 full_row bg_white"
      >
        <div ref={ref} className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
                <h2 className="title text-uppercase">
                  <span className="line_double mx-auto color_default" style={{color:colorData?.colorName}}>
                    testimonial
                  </span>
                  What Client Say’s
                </h2>
                <motion.span
                  variants={testimonialDesVariants}
                  animate={controls}
                  initial="hidden"
                  className="sub_title"
                >
                  {testimonialData?.tes_sub_title ? (
                    testimonialData?.tes_sub_title
                  ) : (
                    <p style={{ color: "red", fontSize: "1.5rem" }}>
                      testimonial data is not available to show
                    </p>
                  )}
                </motion.span>
              </div>
            </div>
            <motion.div
              variants={testimonialDesVariants}
              animate={controls}
              initial="hidden"
              className="col-md-12 col-lg-12"
            >
              <TestimonialSlider />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonial;
