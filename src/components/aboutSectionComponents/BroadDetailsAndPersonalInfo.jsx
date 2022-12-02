import { useContext } from 'react'
import format from 'date-fns/format'
import { PageContext } from '../context/Page.Context'

function BroadDetailsAndPersonalInfo() {
    const {about,myProfileData} = useContext(PageContext)
  return (
    <>
      <div className="myself color_secondery wow animated fadeInLeft">
        <p>
            {about?.broad_details ? about?.broad_details : <span style={{color:'red',fontSize:'1.1rem'}}>No broad description is available to show</span>}
        </p>
      </div>
      <div className="personal_info">
        <div className="row">
            <div className="col-md-12 col-lg-6">
                <ul>
                    <li>
                        <span className="color_secondery">Name :</span> {myProfileData?.fullName ? myProfileData?.fullName :<span style={{color:'red',fontSize:'1rem'}}>No name is available to show</span>}
                    </li>
                    <li>
                        <span className="color_secondery">Email :</span>
                        {myProfileData?.email ? myProfileData?.email :<span style={{color:'red',fontSize:'1rem'}}> No email is available to show</span>}
                    </li>
                    <li>
                        <span className="color_secondery">Phone :</span> {myProfileData?.phone ? myProfileData?.phone :<span style={{color:'red',fontSize:'1rem'}}> No phone number is available to show</span>}
                    </li>
                </ul>
            </div>
            <div className="col-md-12 col-lg-6">
                <ul>
                    <li>
                        <span className="color_secondery">Date of Birth :</span>
                        {myProfileData?.dateOfBirth && format(new Date(myProfileData?.dateOfBirth), 'dd MMMM yyyy') ? myProfileData?.dateOfBirth && format(new Date(myProfileData?.dateOfBirth), 'dd MMMM yyyy') : <span style={{color:'red',fontSize:'1rem'}}> No birth date is available to show</span>}
                    </li>
                    <li>
                        <span className="color_secondery">Blood Group :</span>
                        {myProfileData?.bloodGroup ? myProfileData?.bloodGroup : <span style={{color:'red',fontSize:'1rem'}}> No blood group is available to show</span>}
                    </li>
                    <li>
                        <span className="color_secondery">Address :</span>
                        {myProfileData?.address ? myProfileData?.address :<span style={{color:'red',fontSize:'1rem'}}> No address is available to show</span>}
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </>
  )
}

export default BroadDetailsAndPersonalInfo