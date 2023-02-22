import React, { useContext } from "react";
import * as FaIcons from "react-icons/fa";
import { motion } from "framer-motion";
import { PageContext } from "../context/Page.Context";
import { childVariants } from "../../components/serviceSectionComponents/animationData";

function AllServices() {
  const { servicesData, colorData } = useContext(PageContext);
  return (
    <>
      {servicesData?.ServiceFeature?.length >= 1 ? (
        <>
          {servicesData?.ServiceFeature?.map((service) => {
            let icon = service?.serviceIcon;
            const DynamicIcon = FaIcons[icon];
            return (
              <motion.div
                variants={childVariants}
                key={service?.id}
                className="col-md-6 col-lg-4"
              >
                <div className="service_two text-center pt_15 mb_30 wow animated slideInUp">
                  <div className="srv_item_number color_lightgray">
                    <strong>{service?.serviceNumber}.</strong>
                  </div>
                  <h3 className="p_20 text-uppercase color_primary">
                    {service?.serviceName}
                  </h3>
                  <div className="srv_icon color_white d-flex align-items-center justify-content-center" style={{color:colorData?.colorName}}>
                    <DynamicIcon size={40} />
                  </div>
                  <p>{service?.serviceDescription}</p>
                </div>
              </motion.div>
            );
          })}
        </>
      ) : (
        <>
          <div className="row">
            <div
              className='className="col-md-12 col-lg-12'
              style={{ color: "red", fontSize: "1.5rem" }}
            >
              {" "}
              service data is not available to show
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AllServices;
