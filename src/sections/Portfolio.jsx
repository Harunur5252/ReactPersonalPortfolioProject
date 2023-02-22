import { useEffect, useContext } from "react";
import Venobox from "venobox";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PageContext } from "../components/context/Page.Context";
import { portfolioDesVariants } from "../components/portfolioSectionComponents/animationData";
import AllPortfolio from "../components/portfolioSectionComponents/AllPortfolio";

function Portfolio() {
  const { portfolioData,colorData } = useContext(PageContext);

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

  useEffect(() => {
    new Venobox({
      selector: ".my-image-links",
      spinner: "flow",
      maxWidth: "600px",
    });
  }, []);

  return (
    <>
      <section
        id="portfolio"
        name="portfolio"
        className="py_80 bg_secondery full_row"
      >
        <div ref={ref} className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
                <h2 className="title text-uppercase">
                  <span className="line_double mx-auto color_default" style={{color:colorData?.colorName}}>
                    portfolio
                  </span>
                  Recent Projects
                </h2>
                <motion.span
                  variants={portfolioDesVariants}
                  animate={controls}
                  initial="hidden"
                  className="sub_title"
                >
                  {portfolioData?.sub_title ? (
                    portfolioData?.sub_title
                  ) : (
                    <p style={{ color: "red", fontSize: "1.5rem" }}>
                      No portfolio title or projects is available to show
                    </p>
                  )}
                </motion.span>
              </div>
            </div>
            <AllPortfolio controls={controls} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Portfolio;
