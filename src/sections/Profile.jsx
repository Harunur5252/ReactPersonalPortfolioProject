import React,{useContext,useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { BarLoader,BeatLoader } from 'react-spinners';
import DatePicker from "react-datepicker";
import {FaEdit} from 'react-icons/fa'
import { AuthContext } from '../components/context/Auth.Context';
import notFoundImage from '../assets/R.jpg'
import { axiosPrivateInstance } from '../Utils/axios';
import { toast } from 'react-toastify';

function Profile() {
    const { register,setValue, reset, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm();
    const {profile,profileSubmit,percentage,user,multipleProfileData,setLoadedProfile,loadedProfile} = useContext(AuthContext)
    const [profileAllData,setProfileAllData] = useState({})
    const [file,setFile] = useState(null)
    const [profileControlData,setProfileControlData] = useState({
        firstName : '',
        bloodGroup:'',
        lastName : '',
        title:'',
        cvLink : '',
        phone : '',
        website : '',
        address : '',
        profilePicture : null,
        facebookAccount : '',
        twitterAccount : '',
        googleAccount : '',
        instagramAccount : '',
        linkdinAccount : ''
    })
    
    const singleProfile = multipleProfileData?.find((profile) => {
        if(profile?.userId === user?.id){
            return profile
        }
    })

    const onSubmit = (data) => {
        setProfileAllData(data)
        profile(data)
    }

   const defaultValue = {
    firstName:profileAllData?.firstName || '',
    bloodGroup:profileAllData?.bloodGroup || '',
    title:profileAllData?.title || '',
    cvLink : profileAllData?.cvLink || '',
    lastName:profileAllData?.lastName || '',
    phone:profileAllData?.phone ||  '',
    website:profileAllData?.website ||  '',
    address:profileAllData?.address ||  '',
    profilePicture:profileAllData?.profilePicture ||  null,
    facebookAccount:profileAllData?.facebookAccount || '',
    twitterAccount:profileAllData?.twitterAccount || '',
    instagramAccount:profileAllData?.instagramAccount ||  '',
    googleAccount:profileAllData?.googleAccount ||  '',
    linkdinAccount:profileAllData?.linkdinAccount || '',
   }
   const {firstName,lastName,bloodGroup,title,cvLink,phone,website,address,profilePicture,facebookAccount,twitterAccount,instagramAccount,googleAccount,linkdinAccount} = defaultValue
   const now = percentage

  useEffect(() => {
      if(profileSubmit){
         reset({
            firstName:'',
            lastName:'',
            phone:'',
            website:'',
            address:'',
            profilePicture:null,
            facebookAccount:'',
            twitterAccount:'',
            instagramAccount:'',
            googleAccount:'',
            linkdinAccount:'',
         })
      }
  },[profileSubmit])

  const handleChange = (evt) => {
    setProfileControlData({
       ...profileControlData,
      [evt?.target?.name] : evt?.target?.value
    })
    setFile(evt?.target?.files[0])
 }

 const handleProfileUpdate = async (evt) => {
   evt.preventDefault()
   const {firstName,lastName,address,phone,website,facebookAccount,googleAccount,twitterAccount,instagramAccount,linkdinAccount} = profileControlData
   const data = {
       user:user?.id,
       firstName,
       lastName ,
       address,
       phone ,
       website ,
       facebookAccount ,
       googleAccount ,
       twitterAccount ,
       instagramAccount ,
       linkdinAccount ,
   }
   const formData = new FormData()
   formData.append('files.profilePicture',file,file?.name)
   formData.append('data',JSON.stringify(data))

   try {
        setLoadedProfile(true)
        const response = await axiosPrivateInstance(token).put(`/profiles/${singleProfile?.profileId}`,
          formData
        )
        setLoadedProfile(false)
        console.log('response',response.data)
   } catch (err) {
       setLoadedProfile(false)
       console.log(err.response)
   }
 }

 const [birthDate,setBirthDate] = useState(new Date())
 useEffect(() =>{
    setValue('dateOfBirth',birthDate)
 },[birthDate])

  return (
    <>
    {
        !singleProfile?.profileId && !singleProfile?.userId && 
        <form
        className="form contact_message wow animated fadeInRight"
        id="contact-form"
        onSubmit={handleSubmit(onSubmit)}
    >
        <div className="row">
        <div className="col-md-6 col-lg-6">
            <div className="form-group">
                <DatePicker
                    showYearDropdown
                    selected={birthDate} 
                    maxDate={birthDate}
                    onChange={(date) => setBirthDate(date)} 
                />
                <span style={{color:'red'}}>{errors?.blog_date?.message}</span>
            </div>
        </div>

        <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("bloodGroup",{required:'bloodGroup is required'})}
                        placeholder="Enter Your BloodGroup"
                        defaultValue={bloodGroup}
                    />
                    <span style={{color:'red'}}>{errors?.bloodGroup?.message}</span>
                </div>
            </div>

            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("firstName",{required:'firstName is required'})}
                        placeholder="Enter Your FirstName"
                        defaultValue={firstName}
                    />
                    <span style={{color:'red'}}>{errors?.firstName?.message}</span>
                </div>
            </div>
            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("lastName",{required:'lastName is required'})}
                        placeholder="Enter Your LastName"
                        defaultValue={lastName}
                    />
                    <span style={{color:'red'}}>{errors?.lastName?.message}</span>
                </div>
            </div>
            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="file"
                        accept='image/*'
                        {...register("profilePicture",{required:'profilePicture is required'})}
                        defaultValue={profilePicture}
                    />
                    <span style={{color:'red'}}>{errors?.profilePicture?.message}</span>
                    {profileSubmit && <BarLoader color="#36d7b7" height={8} width={470}/>}
					{profileSubmit && <p style={{textAlign:'center',color:'green',fontSize:'1.3rem'}}>{`${now}%`}</p>}
                </div>
            </div>
            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="number"
                        {...register("phone",{required:'mobile number is required'})}
                        placeholder="Enter Your Mobile Number"
                        defaultValue={phone}
                    />
                    <span style={{color:'red'}}>{errors?.phone?.message}</span>
                </div>
            </div>
            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("address",{required:'address is required'})}
                        placeholder="Enter Your Address"
                        defaultValue={address}
                    />
                    <span style={{color:'red'}}>{errors?.address?.message}</span>
                </div>
            </div>
            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("website",{required:'website link is required'})}
                        placeholder="Enter Your Website Link"
                        defaultValue={website}
                    />
                    <span style={{color:'red'}}>{errors?.website?.message}</span>
                </div>
            </div>

            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("facebookAccount",{required:'facebookAccount link is required'})}
                        placeholder="Enter Your facebookAccount Link"
                        defaultValue={facebookAccount}
                    />
                    <span style={{color:'red'}}>{errors?.facebookAccount?.message}</span>
                </div>
            </div>

            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("twitterAccount",{required:'twitterAccount link is required'})}
                        placeholder="Enter Your twitterAccount Link"
                        defaultValue={twitterAccount}
                    />
                    <span style={{color:'red'}}>{errors?.twitterAccount?.message}</span>
                </div>
            </div>
            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("googleAccount",{required:'googleAccount link is required'})}
                        placeholder="Enter Your googleAccount Link"
                        defaultValue={googleAccount}
                    />
                    <span style={{color:'red'}}>{errors?.googleAccount?.message}</span>
                </div>
            </div>
            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("instagramAccount",{required:'instagramAccount link is required'})}
                        placeholder="Enter Your instagramAccount Link"
                        defaultValue={instagramAccount}
                    />
                    <span style={{color:'red'}}>{errors?.instagramAccount?.message}</span>
                </div>
            </div>

            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("linkdinAccount",{required:'linkdinAccount link is required'})}
                        placeholder="Enter Your linkdinAccount Link"
                        defaultValue={linkdinAccount}
                    />
                    <span style={{color:'red'}}>{errors?.linkdinAccount?.message}</span>
                </div>
            </div>

            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("title",{required:'title is required'})}
                        placeholder="Enter Your User Title"
                        defaultValue={title}
                    />
                    <span style={{color:'red'}}>{errors?.title?.message}</span>
                </div>
            </div>

            <div className="col-md-6 col-lg-6">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        {...register("cvLink",{required:'cvLink is required'})}
                        placeholder="Enter Your User Cv Link"
                        defaultValue={cvLink}
                    />
                    <span style={{color:'red'}}>{errors?.cvLink?.message}</span>
                </div>
            </div>
            
            <div className="col-md-12 col-lg-12">
                <div className="form-group">
                    <button
                        className="btn btn-default"
                        id="send"
                        type="submit"
                        disabled={profileSubmit && 'disabled'}
                    >
                       {profileSubmit ? 'Loading....' :'Submit'}
                    </button>
                </div>
            </div>
		</div>
        </form>
    }
       
        <table className="table table-responsive table-striped table-dark table-hover table-borderless">
        <thead>
            <tr>
                <th scope="col">ProfileId</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Image</th>
                {
                        singleProfile?.profileId && singleProfile?.userId && <th scope="col">Action</th>
                }
                
            </tr>
        </thead>
        {
            profileSubmit ? <BeatLoader size={20} color="#36d7b7" /> :
            <tbody>
                <tr>
                    <td>{singleProfile?.profileId ? singleProfile?.profileId : <span style={{color:'rgba(208, 213, 17, 0.8)',fontSize:'1rem'}}>no id</span>}</td>
                    <td>{singleProfile?.firstName ? singleProfile?.firstName : <span style={{color:'rgba(208, 213, 17, 0.8)',fontSize:'1rem'}}>no firstName</span>}</td>
                    <td>{singleProfile?.lastName ? singleProfile?.lastName :<span style={{color:'rgba(208, 213, 17, 0.8)',fontSize:'1rem'}}>no lastName</span>}</td>
                    <td>{singleProfile?.phone ? singleProfile?.phone : <span style={{color:'rgba(208, 213, 17, 0.8)',fontSize:'1rem'}}>no mobile number</span>}</td>
                    <td>{singleProfile?.userEmail ? singleProfile?.userEmail : <span style={{color:'rgba(208, 213, 17, 0.8)',fontSize:'1rem'}}>no email</span>}</td>
                    <td>{singleProfile?.address ? singleProfile?.address : <span style={{color:'rgba(208, 213, 17, 0.8)',fontSize:'1rem'}}>no address</span>}</td>
                    <td><img src={singleProfile?.profilePicture ? singleProfile?.profilePicture : notFoundImage} height={40} width={40} alt='notFoundImage' /></td>
                    {
                            singleProfile?.profileId && singleProfile?.userId && 
                            <td>
                            <button type='button' class="btn btn-success" data-toggle="modal" data-target="#exampleModal" title="Edit Profile">
                                <FaEdit />
                            </button>
                        </td>
                    }
                    
                </tr>
            </tbody>
        }
        
        </table>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Update Profile</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form className="form contact_message wow animated fadeInRight"
                     id="contact-form" onSubmit={handleProfileUpdate}>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} defaultValue={singleProfile?.firstName} name="firstName" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your FirstName" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} defaultValue={singleProfile?.lastName} name="lastName" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your LastName" />
                        </div>
                        <div className="form-group">
                            <input type="number"onChange={handleChange} defaultValue={singleProfile?.phone} name="phone" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Mobile Number" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} defaultValue={singleProfile?.address} name="address" className="form-control" id="exampleInputPassword1" placeholder="Enter Your Address" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} defaultValue={singleProfile?.website} name="website" className="form-control" id="exampleInputPassword1" placeholder="Enter Your Website Link" />
                        </div>
                        <div className="form-group">
                            <input type="file" accept='image/*' onChange={handleChange} name="profilePicture" className="form-control" id="exampleInputPassword1" />
                            {singleProfile?.profilePicture ? <p>Before Image</p> : <p>Updated Image</p>}
                            <img src={singleProfile?.profilePicture ? singleProfile?.profilePicture : notFoundImage } alt='notFoundImage' />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="facebookAccount" defaultValue={singleProfile?.facebookAccount} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Facebook Link" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="twitterAccount" defaultValue={singleProfile?.twitterAccount} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Twitter Link" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="googleAccount" defaultValue={singleProfile?.googleAccount} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Google Link" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="instagramAccount" defaultValue={singleProfile?.instagramAccount} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Instagram Link" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="linkdinAccount" defaultValue={singleProfile?.linkdinAccount} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Linkedin Link" />
                        </div>
                        <button type="submit" className="btn btn-success" disabled={loadedProfile}>
                          {loadedProfile ? 'Loading...' : 'Update Profile'}    
                        </button>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile