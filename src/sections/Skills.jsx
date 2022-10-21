import React,{ useEffect,useContext } from 'react';
import { PageContext } from '../components/context/Page.Context';

function Skills() {
	const {allSkill,skills,handleEvent} = useContext(PageContext)

	useEffect(() =>{
		document.addEventListener('scroll',handleEvent)
		return () => {
			document.removeEventListener('scroll',handleEvent)
		}
	})

  return (
    <>
         <section id="skill" name="skill" className="py_80 bg_secondery full_row">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div
									className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
								>
									<h2 className="title text-uppercase">
										<span className="line_double mx-auto color_default">skill</span
										>Design skill
									</h2>
									<span className="sub_title">
										{allSkill?.short_skill}
									</span>
									
								</div>
							</div>
						</div>
						<div className="my_skill">
							<div className="row">
								<div className="col-md-12 col-lg-6">
									<div
										className="about_myskill color_secondery wow animated slideInLeft"
									>
										<h2 className="color_primary">
										  {allSkill?.skill_title}
										</h2>
										<p className="pt_15">
											{allSkill?.skill_details}
										</p>
									</div>
								</div>
								<div className="col-md-12 col-lg-6">
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
								</div>
							</div>
						</div>
					</div>
		 </section>
    </>
  )
}

export default Skills