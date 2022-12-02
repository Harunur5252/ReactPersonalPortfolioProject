import React, { useContext } from 'react'
import CountUp from 'react-countup';
import VisibilitySensor from "react-visibility-sensor";
import { PageContext } from '../context/Page.Context'
function Projects() {
    const {experience} = useContext(PageContext)
  return (
    <>
        <div className="col-md-4 col-lg-4">
            <div
                className="counter count wow text-center"
                data-wow-duration="300ms"
            >
                <span className="flaticon-half-time-work"></span>
                {
                    (experience?.data?.start || experience?.data?.pr_end) ?
                    <>
                        <div className="counting_digit color_default mt_15">
                        <CountUp start={experience?.data?.start} end={experience?.data?.pr_end} duration={5}>
                            {({ countUpRef,start }) => (
                                <VisibilitySensor onChange={start} delayedCall>
                                    <span ref={countUpRef} style={{fontSize:'2rem',fontWeight:'600'}} /> 
                                </VisibilitySensor>
                            )}
                        </CountUp>
                        <span>+</span>
                        </div>
                    </>
                    :
                    <p style={{color:'red',fontSize:'1.5rem',marginTop:'0.6rem'}}>No Projects is available to show</p>
                }
                
                <h3 className="color_white mt_15">Projects Done</h3>
            </div>
        </div>
    </>
  )
}

export default Projects