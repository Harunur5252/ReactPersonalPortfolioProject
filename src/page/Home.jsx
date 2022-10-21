import { useContext } from 'react'
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

function Home() {
  const {loaded} = useContext(BlogContext)
  const {loadedHeroSection,loadedAboutSection,loadedSkillSection,loadExperienceSection,loadedServiceSection,loadTestimonialSection,loadPortfolioSection} = useContext(PageContext)

  return (
    <>
    {loaded && loadedHeroSection && 
    loadedAboutSection && loadedSkillSection 
    && loadExperienceSection && loadedServiceSection 
    && loadTestimonialSection && loadPortfolioSection ? 
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