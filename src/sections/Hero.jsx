import { useContext, useEffect } from "react";

import WaterWave from "react-water-wave";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PageContext } from "../components/context/Page.Context";
import { heroSectionVariants } from "../components/HeroSectionComponents/AnimationData";
import Bio from "../components/HeroSectionComponents/Bio";

function Hero() {
  const { myProfileData, colorData } = useContext(PageContext);
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
      <WaterWave
        dropRadius={20}
        interactive={true}
        perturbance={0.03}
        resolution={500}
        imageUrl={myProfileData?.profilePicture?.data?.attributes?.url}
        className="banner_water_effect overlay_one"
      >
        {() => (
          <section
            id="main_banner"
            name="top"
            className="banner_water_effect overlay_one"
          >
            <div ref={ref} className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-md-12 col-lg-12 home-content text-left">
                  <motion.div
                    className="mainbanner_content"
                    variants={heroSectionVariants}
                    animate={controls}
                    initial="hidden"
                  >
                    <Bio />
                      <motion.a
                        download="cv of Harun"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="btn btn-default"
                        target="_blank"
                        disabled={myProfileData?.cvLink ? null : "disabled"}
                        href={myProfileData?.cvLink}
                        style={{ backgroundColor: colorData?.colorName }}
                      >
                          Download CV
                      </motion.a>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        )}
      </WaterWave>
    </>
  );
}

export default Hero;
