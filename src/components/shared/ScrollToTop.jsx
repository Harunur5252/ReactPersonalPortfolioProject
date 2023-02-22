import Tippy from "@tippyjs/react";
import React from "react";
import { animateScroll as scroll } from "react-scroll";

function ScrollToTop() {
  return (
    <Tippy content={<span>Back to Top</span>}>
      <div id="scroll" onClick={() => scroll.scrollToTop()}>
        <span></span>
      </div>
    </Tippy>
  );
}

export default ScrollToTop;
