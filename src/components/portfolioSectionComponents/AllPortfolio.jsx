import React, { useContext } from 'react'
import { motion } from "framer-motion"
import { PageContext } from '../context/Page.Context';
import {portfolioDesVariants} from '../../components/portfolioSectionComponents/animationData'

function AllPortfolio({controls}) {
    const {menus,projects,handleClick} = useContext(PageContext)
  return (
    <>
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
                  <motion.div variants={portfolioDesVariants} initial='hidden' animate={controls} className="row">
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
                            className="my-image-links"
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
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default AllPortfolio