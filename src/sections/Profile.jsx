import React,{useContext,useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { BarLoader,BeatLoader } from 'react-spinners';
import DatePicker from "react-datepicker";
import {FaEdit} from 'react-icons/fa'
import { AuthContext } from '../components/context/Auth.Context';
import notFoundImage from '../assets/R.jpg'
import { axiosPrivateInstance } from '../Utils/axios';
import { toast } from 'react-toastify';
import { BlogContext } from '../components/context/Blog.Context';

function Profile() {
    const { register, reset, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm();
    const {loadAllBlogWithoutPagination,loadAllBlog} = useContext(BlogContext)
    const {profile,profileSubmit,loadUserBlog,percentage,user,token,multipleProfileData,loadAllProfile} = useContext(AuthContext)
    const [profileAllData,setProfileAllData] = useState({})
    const [file,setFile] = useState(null)
    const [loadedProfile,setLoadedProfile] = useState(false)
    const [profileDeleteImg,setProfileDeleteImg] = useState(false)
    const [imageError,setImageError] = useState({
        error:''
    })
    const [profileControlData,setProfileControlData] = useState({
        firstName : '',
        lastName : '',
        profilePicture : null,
        facebookAccount : '',
        twitterAccount : '',
        googlePlusAccount : '',
        instagramAccount : '',
        linkedinAccount : ''
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
    lastName:profileAllData?.lastName || '',
    profilePicture:profileAllData?.profilePicture ||  null,
    facebookAccount:profileAllData?.facebookAccount || '',
    twitterAccount:profileAllData?.twitterAccount || '',
    instagramAccount:profileAllData?.instagramAccount ||  '',
    googlePlusAccount:profileAllData?.googlePlusAccount ||  '',
    linkedinAccount:profileAllData?.linkedinAccount || '',
   }
   const {firstName,lastName,profilePicture,facebookAccount,twitterAccount,instagramAccount,googlePlusAccount,linkedinAccount} = defaultValue
   const now = percentage

  useEffect(() => {
      if(profileSubmit){
         reset({
            firstName:'',
            lastName:'',
            profilePicture:null,
            facebookAccount:'',
            twitterAccount:'',
            instagramAccount:'',
            googlePlusAccount:'',
            linkedinAccount:'',
         })
      }
  },[profileSubmit])

  useEffect(() => {
    (async () => {
        if(user && token){
            loadAllProfile()
        }
    })()
},[user,token,loadedProfile,profileDeleteImg])

useEffect(() => {
    (async () => {
        if(user && token){
            loadUserBlog()
        }
    })()
},[user,token,loadedProfile,profileDeleteImg])

useEffect(() => {
    if(user && token){
        (async () => {
          loadAllBlogWithoutPagination()
        })()
    }
  },[user,token,loadedProfile,profileDeleteImg])

  useEffect(() => {
    if(user && token){
        (async () => {
          loadAllBlog()
        })()
    }
  },[user,token,loadedProfile,profileDeleteImg])

  const handleChange = (evt) => {
    setProfileControlData({
       ...profileControlData,
      [evt?.target?.name] : evt?.target?.value,
    })
    setFile(evt?.target?.files[0])
 }

 const deleteProfileImage = async () => {
    try {
        setProfileDeleteImg(true)
        const response = await axiosPrivateInstance(token).delete(`upload/files/${singleProfile?.imgId}`)
        console.log(response.data)
        toast.success('Before profile image is deleted successfully,now update with new image!')
        setProfileDeleteImg(false)
    } catch (err) {
        setProfileDeleteImg(false)
        toast.error(err?.response?.data?.error?.message)
    }
 }

 const handleProfileUpdate = async (evt) => {
   evt.preventDefault()
   const {firstName,lastName,facebookAccount,googlePlusAccount,twitterAccount,instagramAccount,linkedinAccount} = profileControlData
   const data = {
       user:user?.id,
       firstName,
       lastName ,
       facebookAccount ,
       googlePlusAccount ,
       twitterAccount ,
       instagramAccount ,
       linkedinAccount ,
   }
   try {
    if((!firstName && !lastName && !facebookAccount && !googlePlusAccount && !twitterAccount && !instagramAccount && !linkedinAccount)  && (file  && singleProfile?.imgId)){
        setImageError({
            error : 'You have already an image,if you want to update then delete before image'
        })
        toast.error('already an image exist')
    }else if(((firstName && lastName && facebookAccount && googlePlusAccount && twitterAccount && instagramAccount && linkedinAccount) && file) && !singleProfile?.imgId){
        const formData = new FormData()
        formData.append('files.profilePicture',file,file?.name)
        formData.append('data',JSON.stringify(data))
        setLoadedProfile(true)
        const response = await axiosPrivateInstance(token).put(`/profiles/${singleProfile?.profileId}`,
          formData
        )
        setImageError({
            error : ''
        })
        setLoadedProfile(false)
        toast.success('profile update successfully with image!')
    }else if(firstName || lastName || facebookAccount || googlePlusAccount || twitterAccount || instagramAccount || linkedinAccount){
        setLoadedProfile(true)
        const response = await axiosPrivateInstance(token).put(`/profiles/${singleProfile?.profileId}`,
          {
            data : data
          }
        )
        if(singleProfile?.imgId){
            setImageError({
            error : 'You have already an image,if you want to update then delete before image'
           })
        }else if(!singleProfile?.imgId){
            setImageError({
                error : ''
            })
        }
        
        setLoadedProfile(false)
        toast.success('profile update successfully!')
    } else if((!firstName && !lastName && !facebookAccount && !googlePlusAccount && !twitterAccount && !instagramAccount && !linkedinAccount) && !file){
        toast.error('please fill up fields')
    } else if(file && !singleProfile?.imgId){
        toast.error('please fill up other data with image')
    }
   } catch (err) {
       setLoadedProfile(false)
       console.log(err.response)
   }
 }


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
                            {...register("googlePlusAccount",{required:'googlePlusAccount link is required'})}
                            placeholder="Enter Your googlePlusAccount Link"
                            defaultValue={googlePlusAccount}
                        />
                        <span style={{color:'red'}}>{errors?.googlePlusAccount?.message}</span>
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
                            {...register("linkedinAccount",{required:'linkedinAccount link is required'})}
                            placeholder="Enter Your linkedinAccount Link"
                            defaultValue={linkedinAccount}
                        />
                        <span style={{color:'red'}}>{errors?.linkedinAccount?.message}</span>
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
                <th scope="col">Email</th>
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
                    <td>{user?.email ? user?.email : <span style={{color:'rgba(208, 213, 17, 0.8)',fontSize:'1rem'}}>no email</span>}</td>
                    <td><img src={singleProfile?.profilePicture ? singleProfile?.profilePicture : notFoundImage} style={{height:'107px',width:'156px'}} alt='notFoundImage' /></td>
                    {
                            singleProfile?.profileId && singleProfile?.userId && 
                            <td>
                            <button type='button' className="btn btn-success" data-toggle="modal" data-target="#exampleModal" title="Edit Profile">
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
                            <input type="file" accept='image/*' onChange={handleChange} name="profilePicture" className="form-control" id="exampleInputPassword1" />
                            <span style={{color:'red'}}>{imageError?.error}</span>
                            <div className='row mt-3'>
                                 <div className='col-lg-5'>
                                    <img src={singleProfile?.profilePicture ? singleProfile?.profilePicture : notFoundImage } style={{height:'107px',width:'156px'}} alt='notFoundImage' />
                                    {singleProfile?.profilePicture ? <p>Before Image</p> : <p>No Image</p>}
                                 </div>
                                 <div className='col-lg-5'>
                                    <button className='btn btn-danger' type='submit' disabled={(profileDeleteImg || !singleProfile?.imgId) ? 'disabled' : ''} onClick={deleteProfileImage}>
                                       {profileDeleteImg ? 'Loading...' : 'Delete Image'} 
                                    </button>
                                 </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="facebookAccount" defaultValue={singleProfile?.facebookAccount} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Facebook Link" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="twitterAccount" defaultValue={singleProfile?.twitterAccount} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Twitter Link" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="googlePlusAccount" defaultValue={singleProfile?.googlePlusAccount} className="form-control" id="exampleInputPassword1" placeholder="Enter Your GooglePlus Link" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="instagramAccount" defaultValue={singleProfile?.instagramAccount} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Instagram Link" />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChange} name="linkedinAccount" defaultValue={singleProfile?.linkedinAccount} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Linkedin Link" />
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