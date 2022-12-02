import React from 'react'

function SkillPercentage({skills}) {
  return (
    <>
          {
            skills?.length >=1 ?
            <div className="skill-progress wow animated slideInRight">
                {skills?.map((skill) => {
                    return (
                        <div key={skill?.id} className="prgs-bar fact-counter">
                    <span>{skill?.name}</span>
                    <div
                        className="progress count wow"
                        data-wow-duration="0ms"
                    >
                        <div className="skill-percent">
                        <span
                            className="count-num"
                            data-speed="3000"
                            data-stop={skill?.percent}
                        >
                            {skill?.percent}
                        </span>
                        %
                        </div>
                        <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={skill?.percent}
                        aria-valuemax="100"
                        style={{ width: `${skill?.percent}%` }}
                        ></div>
                    </div>
                    </div>
                    )
                })}
            </div>
            :
            <span style={{color:'red',fontSize:'1.5rem'}}>No short skill progress is available to show</span>
		  }
    </>
  )
}

export default SkillPercentage