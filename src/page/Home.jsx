import { useContext,useEffect } from 'react'
import { scroller } from "react-scroll";
import { useLocation } from "react-router-dom";
import Layout from '../components/layouts/Layout'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Experience from '../sections/Experience'
import Service from '../sections/Service'
import Portfolio from '../sections/Portfolio'
import Testimonial from '../sections/Testimonial'
import Blog from '../sections/Blog'
import Contact from '../sections/Contact'
import Hero from '../sections/Hero'
import ScrollToTop from '../components/shared/ScrollToTop'
import Preloader from '../components/shared/Preloader'
import ColorSetting from '../components/shared/ColorSetting'
import { BlogContext } from '../components/context/Blog.Context'
import { PageContext } from '../components/context/Page.Context'
import { AuthContext } from '../components/context/Auth.Context';

function Home() {
  const {loaded} = useContext(BlogContext)
  const {user} = useContext(AuthContext)
  const {loadedMyProfileSection,loadedHeroSection,loadedAboutSection,loadedSkillSection,loadedExperienceSection,loadedServiceSection,loadedTestimonialSection,loadedPortfolioSection} = useContext(PageContext)
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      scroller.scrollTo(`${location.state}`, {
        smooth: true,
      });
      location.state = null;
    }
  }, [location.state]);

  return (
    <>
    {(loaded && user) || loadedHeroSection && 
    loadedAboutSection && loadedSkillSection 
    && loadedExperienceSection && loadedServiceSection 
    && loadedTestimonialSection && loadedPortfolioSection && loadedMyProfileSection ? 
    <Preloader />
     : 
     <Layout>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Service />
          <Portfolio />
          <Testimonial />
          <Blog />
          <Contact />
          <ScrollToTop />
          <ColorSetting />
     </Layout>
     }
    </>
  )
}

export default Home