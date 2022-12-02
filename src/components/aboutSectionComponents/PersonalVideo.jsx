import { useContext } from 'react'
import { PageContext } from '../context/Page.Context'
import notFoundImage from '../../assets/R.jpg'
function PersonalVideo() {
    const {about,myProfileData} = useContext(PageContext)
  return (
    <div
        className="profile_img personal_video wow animated fadeInRight"
    >
        <img src={myProfileData?.profilePicture?.data?.attributes?.url ? myProfileData?.profilePicture?.data?.attributes?.url : notFoundImage} className='aboutImage' alt="image" />
        <div className="iconround">
            <a
                className="video-popup round_shape"
                data-vbtype="video"
                href={about?.video_link ? about?.video_link :''}
                title={about?.video_title ? about?.video_title : <span style={{color:'red',fontSize:'1rem'}}> No video title is available to show</span>}
            >
                <i className="fa fa-play" aria-hidden="true"></i>
            </a>
        </div>
        <div className="loader">
            <div className="loader-inner ball-scale-multiple">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default PersonalVideo