import React, { useContext } from "react";
import Typed from "react-typed";
import { PageContext } from "../context/Page.Context";

function Bio() {
  const { heroSectionData, professionData, myProfileData, colorData } =
    useContext(PageContext);
  const strings = professionData?.map((profession) => {
    return profession?.profession;
  });

  const options = {
    typeSpeed: 40,
    backSpeed: 40,
    startDelay: 500,
    loop: true,
    stringElement: null,
    loopCount: 100,
    contentType: "html",
  };

  return (
    <>
      <span className="pb_5 banner_title color_white">
        <span style={{ color: colorData?.colorName }}>
          {myProfileData?.fullName ? "I am" : ""}&nbsp;
        </span>
        {myProfileData?.fullName ? (
          <span style={{ color: colorData?.colorName }}>
            {myProfileData?.fullName}!
          </span>
        ) : (
          <span style={{ color: "red", fontSize: "1.5rem" }}>
            No name is available to show
          </span>
        )}
      </span>
      <h1 className="cd-headline clip is-full-width text-uppercase">
        {strings?.length >= 1 ? (
          <>
            <span className="color_white">
              <span style={{ color: colorData?.colorName }}>I am a</span> &nbsp;
            </span>
            <span className="color_default">
              <span style={{ color: colorData?.colorName }}>
                <Typed strings={strings} {...options} />
              </span>
            </span>
          </>
        ) : (
          <span style={{ color: "red", fontSize: "1.5rem" }}>
            No profession is available to show
          </span>
        )}
      </h1>
      <p className=" mb_30">
        {heroSectionData?.short_des ? (
          <span style={{ color: colorData?.colorName }}>
            {heroSectionData?.short_des}
          </span>
        ) : (
          <span style={{ color: "red", fontSize: "1.5rem" }}>
            No short description is available to show
          </span>
        )}
      </p>
    </>
  );
}

export default Bio;
