import { useContext } from "react";
import { motion } from "framer-motion";
import { PageContext } from "../context/Page.Context";
import { portfolioDesVariants } from "../../components/portfolioSectionComponents/animationData";
import  "../../../public/css/pickColor.css";

function AllPortfolio({ controls }) {
  const { menus, projects, handleClick, colorData } = useContext(PageContext);
  const greenCl = 'green'
  const blackCl = 'black'
  const blueCl = 'blue'
  const lightCl = 'rgb(213, 222, 222)'
  const infoCl = 'rgb(16, 236, 239)'
  const redCl = 'red'
  const yellowCl = 'yellow'
  let result = ''

    if(colorData?.colorName === greenCl){
      result = 'greenCl'
    }else if(colorData?.colorName === blackCl){
      result = 'blackCl'
    }
    else if(colorData?.colorName === blueCl){
      result = 'blueCl'
    }
    else if(colorData?.colorName === lightCl){
      result = 'lightCl'
    }
    else if(colorData?.colorName === infoCl){
      result = 'infoCl'
    }
    else if(colorData?.colorName === redCl){
      result = 'redCl'
    }
    else if(colorData?.colorName === yellowCl){
      result = 'yellowCl'
    }


  return (
    <>
      <div className="col-md-12 col-lg-12">
        <div className="my_portfolio" id="tab-panel">
          <div className="row">
            <div className="col-md-12">
              <div className="filters mb_30 w-100 text-center">
                <ul className="filter-tabs mx-auto d-inline-block">
                  {menus?.map((menu) => {
                    return (
                      <li
                        key={menu?.id}
                        className={`filter ${menu?.isActive ? `${result}` : ""}`}
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
              <motion.div
                variants={portfolioDesVariants}
                initial="hidden"
                animate={controls}
                className="row"
              >
                {projects?.map((project) => {
                  return (
                    <div key={project?.id} className="mb_30 col-md-4 col-lg-4">
                      <div className="default-portfolio-item">
                        <a
                          href={project?.image}
                          data-gall="myGallery"
                          className="my-image-links"
                        >
                          <img src={project?.image} alt="image" />
                          <div
                            className="overlay-box"
                            style={{ borderColor: colorData?.colorName }}
                          >
                            <span>
                              <i className="fa fa-eye" aria-hidden="true"></i>
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllPortfolio;
