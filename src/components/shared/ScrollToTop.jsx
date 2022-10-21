import React from 'react'
import { animateScroll as scroll } from 'react-scroll'

function ScrollToTop() {
  return (
      <div id="scroll" onClick={() => scroll.scrollToTop()}><span></span></div>
  )
}

export default ScrollToTop