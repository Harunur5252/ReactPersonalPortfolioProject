import React, { useContext, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PageContext } from "../components/context/Page.Context";
import ContactInfoAndSocial from "../components/contactSectionComponents/ContactInfoAndSocial";
import ContactForm from "../components/contactSectionComponents/ContactForm";
import {
  contactDesVariants,
  contactPersonaInfoVariants,
  contactFormVariants,
} from "../components/contactSectionComponents/animationData";

function Contact() {
  const { contactData,colorData } = useContext(PageContext);

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
      <section id="contact" name="contact" className="py_80 full_row bg_white">
        <div ref={ref} className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
                <h2 className="title text-uppercase">
                  <span style={{color:colorData?.colorName}} className="line_double mx-auto color_default">
                    contact
                  </span>
                  Get In Touch
                </h2>
                <motion.span
                  variants={contactDesVariants}
                  animate={controls}
                  initial="hidden"
                  className="sub_title"
                >
                  Interdum a etiam sagittis vehicula porta. Massa felis eros
                  quam blandit nulla dolor habitant. Ullamcorper quis ornare et
                  proin pellentesque.
                </motion.span>
              </div>
            </div>
            <div className="col-md-12 col-lg-12">
              <div className="row">
                <motion.div
                  variants={contactPersonaInfoVariants}
                  animate={controls}
                  initial="hidden"
                  className="col-md-4 col-lg-4"
                >
                  <ContactInfoAndSocial />
                </motion.div>
                <motion.div
                  variants={contactFormVariants}
                  animate={controls}
                  initial="hidden"
                  className="col-md-8 col-lg-8"
                >
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
