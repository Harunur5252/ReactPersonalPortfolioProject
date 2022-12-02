import { useContext } from 'react'
import { PageContext } from '../context/Page.Context'

function ContactInfoAndSocial() {
    const {myProfileData} = useContext(PageContext)
  return (
    <>
       <div className="contact_info wow animated fadeInLeft">
            <ul>
                <li>
                    <div className="contact_text">
                        <h6 className="font-weight-bold color_primary">
                            Email
                        </h6>
                        <span className="color_secondery">
                            {myProfileData?.email ? myProfileData?.email : <span style={{color:'red',fontSize:'1rem'}}>email is not available to show</span>}
                        </span>
                        
                    </div>
                </li>
                <li>
                    <div className="contact_text">
                        <h6 className="font-weight-bold color_primary">
                            Phone
                        </h6>
                        <span className="color_secondery">{myProfileData?.phone ? myProfileData?.phone : <span style={{color:'red',fontSize:'1rem'}}>phone number is not available to show</span>}</span>
                    </div>
                </li>
                <li>
                    <div className="contact_text">
                        <h6 className="font-weight-bold color_primary">
                            Address
                        </h6>
                        <span className="color_secondery">
                            {myProfileData?.address ? myProfileData?.address :  <span style={{color:'red',fontSize:'1rem'}}>address is not available to show</span>}
                        </span>
                        
                    </div>
                </li>
                <li>
                    <div className="contact_text">
                        <h6 className="font-weight-bold color_primary">
                            Website
                        </h6>
                        <span className="color_secondery">
                            {myProfileData?.website ? myProfileData?.website : <span style={{color:'red',fontSize:'1rem'}}>website link is not available to show</span>}
                        </span>
                        
                    </div>
                </li>
            </ul>
        </div>
        <div className="socal_media_2 mt_15 d-inline-block">
            <ul>
                <li>
                    <a target='_blank' href={myProfileData?.facebookAccount}
                        ><i className="fa fa-facebook" aria-hidden="true"></i
                    ></a>
                </li>
                <li>
                    <a target='_blank' href={myProfileData?.twitterAccount}
                        ><i className="fa fa-twitter" aria-hidden="true"></i
                    ></a>
                </li>
                <li>
                    <a target='_blank' href={myProfileData?.googlePlusAccount}
                        ><i className="fa fa-google-plus" aria-hidden="true"></i
                    ></a>
                </li>
                <li>
                    <a target='_blank' href={myProfileData?.LinkedInAccount}
                        ><i className="fa fa-linkedin" aria-hidden="true"></i
                    ></a>
                </li>
                <li>
                    <a target='_blank' href={myProfileData?.instagramAccount}
                        ><i className="fa fa-instagram" aria-hidden="true"></i
                    ></a>
                </li>
            </ul>
        </div>   
    </>
  )
}

export default ContactInfoAndSocial