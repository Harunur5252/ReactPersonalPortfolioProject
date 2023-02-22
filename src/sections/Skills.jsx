import { useEffect, useContext, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PageContext } from "../components/context/Page.Context";
import {
  skillSmallDesVariants,
  skillBroadDesVariants,
  skillInfoVariants,
} from "../components/SkillSectionComponents/animationData";
import { skillsData } from "../components/SkillSectionComponents/skillSampleData";
import SkillDetails from "../components/SkillSectionComponents/SkillDetails";
import SkillPercentage from "../components/SkillSectionComponents/SkillPercentage";

function Skills() {
  const { allSkill, colorData } = useContext(PageContext);
  const [skills, setSkills] = useState(skillsData);

  const featureSkill = allSkill?.SkillFeature?.map((skill) => {
    return {
      id: skill?.id,
      name: skill?.name,
      percent: skill?.percent,
    };
  });

  // animation
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setSkills(featureSkill);
    }
    if (!inView) {
      controls.start("hidden");
      setSkills(skillsData);
    }
  }, [controls, inView]);

  return (
    <>
      <section id="skill" name="skill" className="py_80 bg_secondery full_row">
        <div ref={ref} className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
                <h2 className="title text-uppercase">
                  <span
                    style={{ color: colorData?.colorName }}
                    className="line_double mx-auto color_default"
                  >
                    skill
                  </span>
                  Design skill
                </h2>
                <motion.span
                  className="sub_title"
                  variants={skillSmallDesVariants}
                  initial="hidden"
                  animate={controls}
                >
                  {allSkill?.short_skill ? (
                    allSkill?.short_skill
                  ) : (
                    <span style={{ color: "red", fontSize: "1.5rem" }}>
                      No short skill description is available to show
                    </span>
                  )}
                </motion.span>
              </div>
            </div>
          </div>
          <div className="my_skill">
            <div className="row">
              <motion.div
                className="col-md-12 col-lg-6"
                variants={skillBroadDesVariants}
                initial="hidden"
                animate={controls}
              >
                <SkillDetails />
              </motion.div>
              <motion.div
                className="col-md-12 col-lg-6"
                variants={skillInfoVariants}
                initial="hidden"
                animate={controls}
                style={{ color: colorData?.colorName }}
              >
                <SkillPercentage skills={skills} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Skills;
