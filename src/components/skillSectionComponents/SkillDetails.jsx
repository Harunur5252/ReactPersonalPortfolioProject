import React, { useContext } from 'react'
import { PageContext } from '../context/Page.Context'

function SkillDetails() {
    const {allSkill} = useContext(PageContext)
  return (
    <>
        <div
			className="about_myskill color_secondery wow animated slideInLeft"
		>
        <h2 className="color_primary">
            {allSkill?.skill_title ? allSkill?.skill_title :<span style={{color:'red',fontSize:'1.5rem'}}>No short skill title is available to show</span>}
        </h2>
        <p className="pt_15">
            {allSkill?.skill_details ? allSkill?.skill_details :<span style={{color:'red',fontSize:'1.5rem'}}>No short skill details is available to show</span>}
        </p>
        </div>
    </>
  )
}

export default SkillDetails