import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { PageContext } from "../context/Page.Context";

function UserSocialLinks() {
  const { user, multipleProfileData } = useContext(AuthContext);
  const { colorData } = useContext(PageContext);

  // finding user socials link
  const checkUserSocialLink = multipleProfileData?.find(
    (userSocialLink) => userSocialLink?.userId === user?.id
  );

  return (
    <>
      <div className="widget mb_60 d-inline-block p_30 bg_white full_row wow animated slideInUp">
        <h3 className="widget_title mb_30 text-capitalize">Follow Me</h3>
        <div className="socal_media">
          <ul>
            <li>
              <a target="_blank" href={checkUserSocialLink?.facebookAccount}>
                <i
                  style={{ color: colorData?.colorName }}
                  className="fa fa-facebook"
                  aria-hidden="true"
                ></i>
              </a>
            </li>
            <li>
              <a target="_blank" href={checkUserSocialLink?.twitterAccount}>
                <i
                  style={{ color: colorData?.colorName }}
                  className="fa fa-twitter"
                  aria-hidden="true"
                ></i>
              </a>
            </li>
            <li>
              <a target="_blank" href={checkUserSocialLink?.googlePlusAccount}>
                <i
                  style={{ color: colorData?.colorName }}
                  className="fa fa-google-plus"
                  aria-hidden="true"
                ></i>
              </a>
            </li>
            <li>
              <a target="_blank" href={checkUserSocialLink?.linkedinAccount}>
                <i
                  style={{ color: colorData?.colorName }}
                  className="fa fa-linkedin"
                  aria-hidden="true"
                ></i>
              </a>
            </li>
            <li>
              <a target="_blank" href={checkUserSocialLink?.instagramAccount}>
                <i
                  style={{ color: colorData?.colorName }}
                  className="fa fa-instagram"
                  aria-hidden="true"
                ></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserSocialLinks;
