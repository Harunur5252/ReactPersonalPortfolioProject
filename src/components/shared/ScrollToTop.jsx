import React from 'react'
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { animateScroll as scroll } from 'react-scroll'

function ScrollToTop() {
  const scrollTop = () => {
    scroll.scrollToTop()
  }

  return (
    <BsFillArrowUpCircleFill className='scrollToTopIcon' onClick={scrollTop}/>
  )
}

export default ScrollToTop