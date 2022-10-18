import React,{ useState,useEffect,useContext } from 'react';
import { AuthContext } from '../components/context/Auth.Context';
import { axiosPrivateInstance } from '../Utils/axios';
import Venobox from 'venobox'
import qs from 'qs'

// const projectsData = [
// 	{
// 	  image: "/images/portfolio/01.jpg",
// 	  tag_one: "Web Development",
// 	  tag_two: "Wordpress",
// 	  tags: ["development", "wordpress"],
// 	},
// 	{
// 	  image: "/images/portfolio/02.jpg",
// 	  tag_one: "Branding",
// 	  tag_two: "Wordpress",
// 	  tags: ["branding", "wordpress"],
// 	},
// 	{
// 	  image: "/images/portfolio/03.jpg",
// 	  tag_one: "Web Design",
// 	  tag_two: "Web Development",
// 	  tags: ["design", "development"],
// 	},
// 	{
// 	  image: "/images/portfolio/04.jpg",
// 	  tag_one: "Branding",
// 	  tag_two: "Wordpress",
// 	  tags: ["branding", "wordpress"],
// 	},
// 	{
// 	  image: "/images/portfolio/05.jpg",
// 	  tag_one: "Web Design",
// 	  tag_two: "Wordpress",
// 	  tags: ["design", "wordpress"],
// 	},
// 	{
// 	  image: "/images/portfolio/06.jpg",
// 	  tag_one: "Web Design",
// 	  tag_two: "Web Development",
// 	  tags: ["design", "development"],
// 	},
//   ];
  
//   const menusData = [
// 	{
// 	  id: 1,
// 	  name: "all",
// 	  isActive: true,
// 	  tag: "all",
// 	},
// 	{
// 	  id: 2,
// 	  name: "web design",
// 	  isActive: false,
// 	  tag: "design",
// 	},
// 	{
// 	  id: 3,
// 	  name: "wordpress",
// 	  isActive: false,
// 	  tag: "wordpress",
// 	},
// 	{
// 	  id: 4,
// 	  name: "web development",
// 	  isActive: false,
// 	  tag: "development",
// 	},
// 	{
// 	  id: 5,
// 	  name: "branding",
// 	  isActive: false,
// 	  tag: "branding",
// 	},
//   ]; 

function Portfolio() {
  const {user,token} = useContext(AuthContext)
  const [portfolioData,setPortfolioData] = useState({})
  const [menus, setMenus] = useState([]);
  const [projects, setProjects] = useState([]);

	useEffect(() => {
		new Venobox({
		  autoplay: false,
		  spinner:'wave',
		})
	  },[])

    useEffect(() => {
      if(user && token){
        (async () => {
          loadPortfolioSection()
        })()
      }
      },[user,token])

    const query = qs.stringify({
       populate : [
         'MenusFeature',
         'ProjectsFeature',
         'ProjectsFeature.TagsFeature ',
       ]
    })
    const loadPortfolioSection = async () => {
      try {
        const response = await axiosPrivateInstance(token).get(`/portfolio?${query}`)
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
      } catch (err) {
        console.log(err.response)
      }
    }


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

		const filteredArr = projects?.filter((project) => 
       menu?.tag === "all" ? project : project?.tags?.includes(menu?.tag)
    )
		  setProjects(filteredArr)
	  }


  return (
    <>
         <section
      id="portfolio"
      name="portfolio"
      className="py_80 bg_secondery full_row"
    >
      <div className="container">
        <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
                <h2 className="title text-uppercase">
                  <span className="line_double mx-auto color_default">
                    portfolio
                  </span>
                  Recent Projects
                </h2>
                <span className="sub_title">
                  {portfolioData?.sub_title}
                </span>
              </div>
            </div>
          <div className="col-md-12 col-lg-12">
            <div className="my_portfolio" id="tab-panel">
              <div className="row">
                <div className="col-md-12">
                  <div className="filters mb_30 w-100 text-center">
                    <ul
                      className="filter-tabs mx-auto d-inline-block"
                    >
                      {menus?.map((menu) => {
                        return (
                          <li
                            key={menu?.id}
                            className={`filter ${
                              menu?.isActive ? "active" : ""
                            }`}
                            data-role="button"
                            data-filter="all"
                            onClick={() => handleClick(menu)}
                          >
                            {menu?.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="filter-list">
                <div className="portfolio-items">
                  <div className="row">
                    {projects?.map((project) => {
                      return (
                        <div
                        key={project?.id}
                        className="mb_30 col-md-4 col-lg-4"
                      >
                        <div className="default-portfolio-item">
                          <a
                            href={project?.image}
                            data-gall="myGallery"
                            data-maxwidth="600px"
                            className='venobox'
                          >
                            <img
                              src={project?.image}
                              alt="image"
                            />
                            <div className="overlay-box">
                              <span>
                                <i
                                  className="fa fa-eye"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <div className="tag">
                                <ul>
                                  <li>{project?.tag_one},</li>
                                  <li>{project?.tag_two}</li>
                                </ul>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>  
    </>
  )
}

export default Portfolio