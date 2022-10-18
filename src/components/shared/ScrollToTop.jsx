import React from 'react'
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { animateScroll as scroll } from 'react-scroll'
import { Link } from 'react-scroll'

function ScrollToTop() {
  const scrollTop = () => {
    scroll.scrollToTop()
  }

  return (
   <Link spy={true} smooth={true}> <BsFillArrowUpCircleFill className='scrollToTopIcon' onClick={scrollTop}/></Link>
  )
}

export default ScrollToTop