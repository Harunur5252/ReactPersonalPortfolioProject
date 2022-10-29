import { useEffect,useContext } from 'react';
import Venobox from 'venobox'
import { PageContext } from '../components/context/Page.Context';


function Portfolio() {
  const {menus,projects,handleClick,portfolioData} = useContext(PageContext)

  useEffect(() => {
		new Venobox({
			selector: '.my-image-links',
			numeration: true,
			infinigall: true,
			share: true,
			spinner: 'rotating-plane',
      maxWidth:'600px'
		});
	}, []);

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
                  {portfolioData?.sub_title ? portfolioData?.sub_title :<p style={{color:'red',fontSize:'1.5rem'}}>No portfolio title or projects is available to show</p>}
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
                            data-gall="gallery01"
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