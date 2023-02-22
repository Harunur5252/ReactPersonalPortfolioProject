import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experienceVariants } from "../components/experienceSectionComponents/animationData";
import YearsOfExperience from "../components/experienceSectionComponents/YearsOfExperience";
import Projects from "../components/experienceSectionComponents/Projects";
import Clients from "../components/experienceSectionComponents/Clients";

function Experience() {
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
      <div className="experience background2 overlay_two py_60 full_row">
        <div ref={ref} className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="fact-counter">
                <motion.div
                  variants={experienceVariants}
                  initial="hidden"
                  animate={controls}
                  className="row"
                >
                  <YearsOfExperience />
                  <Projects />
                  <Clients />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Experience;
