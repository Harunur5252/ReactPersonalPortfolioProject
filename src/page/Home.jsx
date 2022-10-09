import React from 'react'
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

function Home() {
  return (
    <>
        {/* <Preloader /> */}
        <ScrollToTop />
        <ColorSetting />
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
        </Layout>
    </>
  )
}

export default Home