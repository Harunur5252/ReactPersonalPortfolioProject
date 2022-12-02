import { useContext,useState,useEffect } from 'react'
import { createContext } from 'react'
import qs from 'qs'
import { toast } from 'react-toastify';
import { axiosPrivateInstance, axiosPublicInstance } from '../../Utils/axios'
import { AuthContext } from './Auth.Context'
import { BlogContext } from './Blog.Context'

export const PageContext = createContext()



export function PageProvider({children}) {
    const {user,token} = useContext(AuthContext)
    const {blogsWithoutPaginationData} = useContext(BlogContext)

    const [loadedMyProfileSection,setLoadedMyProfileSection] = useState(false)
    const [loadedHeroSection,setLoadedHeroSection] = useState(false)
    const [loadedAboutSection,setLoadedAboutSection] = useState(false)
    const [loadedSkillSection,setLoadedSkillSection] = useState(false)
    const [loadedExperienceSection,setLoadedExperienceSection] = useState(false)
    const [loadedServiceSection,setLoadedServiceSection] = useState(false)
    const [loadedPortfolioSection,setLoadedPortfolioSection] = useState(false)
    const [loadedTestimonialSection,setLoadedTestimonialSection] = useState(false)
   
    const [professionData,setProfessionData] = useState([])
    const [heroSectionData,setHeroSectionData] = useState({})
    const [myProfileData,setMyProfileData] = useState({})
    const [about,setAbout] = useState({})
    const [allSkill,setAllSkill] = useState({})
    
    const [experience,setExperience] = useState({})
    const [servicesData,setServicesData] = useState({})
    const [portfolioData,setPortfolioData] = useState({})
    const [menus, setMenus] = useState([]);
    const [projects, setProjects] = useState([]);
    const [mainSource, setMainSource] = useState([]);
    const [testimonialData,setTestimonialData] = useState({})
    const [contactSubmit,setContactSubmit] = useState(false)
	const [contactData,setContactData] = useState({})

    let ThreeBlogsData = []
    const BlogsData = blogsWithoutPaginationData?.map((post) => post)
    const reverseBlogsData = BlogsData?.reverse()
	if(reverseBlogsData?.slice(0,3)){
		ThreeBlogsData = reverseBlogsData?.slice(0,3)
	}
    
    // filter projects for portfolio section
    const handleClick = (menu) => {
		const modifiedArr = menus?.map((singleMenu) => {
		  if (singleMenu?.id === menu?.id) {
        singleMenu.isActive = true;
        return singleMenu;
		  } else {
        singleMenu.isActive = false;
        return singleMenu;
		  }
		});
		setMenus(modifiedArr);

		const filteredArr = mainSource?.filter((project) => 
           menu?.tag === "all" ? project : project?.tags?.includes(menu?.tag)
        )
		setProjects(filteredArr)
	}

    useEffect(() => {
        (async () => {
            loadMyProfile()
        })()
	},[])

    useEffect(() => {
        (async () => {
            loadHeroSection()
        })()
	},[])

    useEffect(() => {
        (async () => {
            loadAboutSection()
        })()
	},[])

    useEffect(() => {
        (async () => {
            loadSkillSection()
        })()
	},[])

    useEffect(() => {
        (async () => {
            loadExperienceSection()
        })()
	},[])

    useEffect(() => {
        (async () => {
            loadServiceSection()
        })()
	},[])

    useEffect(() => {
        (async () => {
        loadPortfolioSection()
        })()
    },[])

    useEffect(() => {
        (async () => {
            loadTestimonialSection()
        })()
	},[])

    const loadMyProfile = async () => {
        try {
            setLoadedMyProfileSection(true)
			const response = await axiosPublicInstance.get('/my-profile?populate=*')
            setMyProfileData(response.data?.data?.attributes)
            setLoadedMyProfileSection(false)
		} catch (err) {
            setLoadedMyProfileSection(false)
			console.log(err.response)
		}
    }

    const loadHeroSection = async () => {
		try {
            setLoadedHeroSection(true)
			const response = await axiosPublicInstance.get('/home?populate=*')
			const heroArr = response.data?.data?.attributes?.homeFeatured?.map((hero) => {
				return ({
					homeFeatureId : hero?.id,
					profession : hero?.profession
				})
			})
            setLoadedHeroSection(false)
			setProfessionData(heroArr)
            setHeroSectionData(response.data?.data?.attributes)
		} catch (err) {
            setLoadedHeroSection(false)
			console.log(err.response)
		}
	}

    const loadAboutSection = async () => {
        try {
            setLoadedAboutSection(true)
           const response = await axiosPublicInstance.get('/about?populate=*')
           setAbout({
               broad_details :  response.data?.data?.attributes?.broad_details,
               short_details :  response.data?.data?.attributes?.short_details,
               video_link :  response.data?.data?.attributes?.video_link,
               video_title :  response.data?.data?.attributes?.video_title,
           })
           setLoadedAboutSection(false)
        } catch (err) {
            setLoadedAboutSection(false)
           console.log(err.response)
        }
    }

    const loadSkillSection = async () => {
		try {
            setLoadedSkillSection(true)
			const response = await axiosPublicInstance.get('/skill?populate=*')
			setAllSkill({
				short_skill : response.data?.data?.attributes?.short_skill,
				skill_title : response.data?.data?.attributes?.skill_title,
				skill_details : response.data?.data?.attributes?.skill_details,
				SkillFeature : response.data?.data?.attributes?.SkillFeature,
			})
            setLoadedSkillSection(false)
		} catch (err) {
            setLoadedSkillSection(false)
			console.log(err.response)
		}
	}

    const loadExperienceSection = async () => {
        try {
            setLoadedExperienceSection(true)
          const response = await axiosPublicInstance.get('/experience')
          setExperience({
              data : response.data?.data?.attributes
          })
          setLoadedExperienceSection(false)
        } catch (err) {
            setLoadedExperienceSection(false)
           console.log(err.response)
        }
    }

    const loadServiceSection = async () => {
		try {
            setLoadedServiceSection(true)
			const response = await axiosPublicInstance.get('/service?populate=*')
			setServicesData({
				service_short_des : response.data?.data?.attributes?.service_short_des,
				ServiceFeature : response.data?.data?.attributes?.ServiceFeature,
			})
            setLoadedServiceSection(false)
		} catch (err) {
            setLoadedServiceSection(false)
			console.log(err.response)
		}
	}

    const loadPortfolioSection = async () => {
        const query = qs.stringify({
          populate : [
            'MenusFeature',
            'ProjectsFeature',
            'ProjectsFeature.TagsFeature ',
          ]
       })
        try {
            setLoadedPortfolioSection(true)
          const response = await axiosPublicInstance.get(`/portfolio?${query}`)
          setPortfolioData({
             sub_title : response.data?.data?.attributes?.sub_title,
          })
          const tagsArr = response.data?.data?.attributes?.ProjectsFeature?.map((data) => {
             return ({
                id:data?.id,
                image : data?.image,
                tag_one : data?.tag_one,
                tag_two : data?.tag_two,
                tags : data?.TagsFeature?.map((tag) => tag?.tags)
             })
          })
          setMenus(response.data?.data?.attributes?.MenusFeature)
          setProjects(tagsArr)
          setMainSource(tagsArr)
          setLoadedPortfolioSection(false)
        } catch (err) {
            setLoadedPortfolioSection(false)
          console.log(err.response)
        }
    }

    const loadTestimonialSection = async () => {
		const query = qs.stringify({
			populate:[
				'testimonialFeature',
				'testimonialFeature.FeatureFeedback'
			]
		})
		try {
            setLoadedTestimonialSection(true)
			const response = await axiosPublicInstance.get(`/testimonial?${query}`)
			setTestimonialData({
				tes_sub_title : response.data?.data?.attributes?.tes_sub_title,
				testimonialFeature : response.data?.data?.attributes?.testimonialFeature,
			})
            setLoadedTestimonialSection(false)
		} catch (err) {
            setLoadedTestimonialSection(false)
			console.log(err.response)
		}
	}

    const contactAdd = async (data) => {
        setContactData(data)
		try {
			setContactSubmit(true)
			const response = await axiosPublicInstance.post('/contacts',
			 {
				data : data
			 }
			)
			setContactSubmit(false)
			toast.success('contact added and email sent successfully!')
		} catch (err) {
			toast.error(err?.response?.data?.error?.message)
            setContactSubmit(false)
		}
    }

    const value = {
        professionData,
        loadedHeroSection,
        heroSectionData,
        about,
        loadedAboutSection,
        allSkill,
        experience,
        servicesData,
        menus,
        projects,
        handleClick,
        portfolioData,
        testimonialData,
        ThreeBlogsData,
        contactAdd,
        contactData,
        contactSubmit,
        loadedSkillSection,
        loadedExperienceSection,
        loadedServiceSection,
        loadedTestimonialSection,
        loadedPortfolioSection,
        loadedMyProfileSection,
        myProfileData,
    }
  return (
    <PageContext.Provider value={value} >{children}</PageContext.Provider>
  )
}
