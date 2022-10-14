import React,{ useState,useEffect,useContext } from 'react';
import { AuthContext } from '../components/context/Auth.Context';
import { axiosPrivateInstance } from '../Utils/axios';

function Skills() {
	const {user,token} = useContext(AuthContext)
	const [allSkill,setAllSkill] = useState({})
	const featureSkill = allSkill?.SkillFeature?.map((skill) => {
        return({
			id : skill?.id,
			name : skill?.name,
			percent:skill?.percent
		})
	})

	const skillsData = [
		{
			id:1,
            name:'HTML',
			percent : 0,
		},
		{
			id:2,
            name:'CSS',
			percent : 0,
		},
		{
			id:3,
            name:'PHP',
			percent : 0,
		},
		{
			id:4,
            name:'JQUERY',
			percent : 0,
		},
		{
			id:5,
            name:'WORDPRESS',
			percent : 0,
		},
	]
	const [skills , setSkills] = useState(skillsData)

   const handleEvent = () => {
	const value = window.scrollY  
	if(value >= 1140){
		setSkills(featureSkill)
	}
   }

	useEffect(() =>{
		document.addEventListener('scroll',handleEvent)
		return () => {
			document.removeEventListener('scroll',handleEvent)
		}
	})

	useEffect(() => {
		if(user && token){
			(async () => {
				loadSkillSection()
			})()
		}
	  },[user,token])

	const loadSkillSection = async () => {
		try {
			const response = await axiosPrivateInstance(token).get('/skill?populate=*')
			setAllSkill({
				short_skill : response.data?.data?.attributes?.short_skill,
				skill_title : response.data?.data?.attributes?.skill_title,
				skill_details : response.data?.data?.attributes?.skill_details,
				SkillFeature : response.data?.data?.attributes?.SkillFeature,
			})
		} catch (err) {
			console.log(err.response)
		}
	}
	
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
										
										{/* <div className="prgs-bar fact-counter">
											<span>CSS</span>
											<div className="progress count wow" data-wow-duration="0ms">
												<div className="skill-percent">
													<span
														className="count-num"
														data-speed="3000"
														data-stop="95"
														>0</span
													>%
												</div>
												<div
													className="progress-bar"
													role="progressbar"
													aria-valuenow="95"
													aria-valuemax="100"
												></div>
											</div>
										</div>
										<div className="prgs-bar fact-counter">
											<span>JQuery</span>
											<div className="progress count wow" data-wow-duration="0ms">
												<div className="skill-percent">
													<span
														className="count-num"
														data-speed="3000"
														data-stop="85"
														>0</span
													>%
												</div>
												<div
													className="progress-bar"
													role="progressbar"
													aria-valuenow="85"
													aria-valuemax="100"
												></div>
											</div>
										</div>
										<div className="prgs-bar fact-counter">
											<span>PHP</span>
											<div className="progress count wow" data-wow-duration="0ms">
												<div className="skill-percent">
													<span
														className="count-num"
														data-speed="3000"
														data-stop="90"
														>0</span
													>%
												</div>
												<div
													className="progress-bar"
													role="progressbar"
													aria-valuenow="90"
													aria-valuemax="100"
												></div>
											</div>
										</div>
										<div className="prgs-bar fact-counter">
											<span>Wordpress</span>
											<div className="progress count wow" data-wow-duration="0ms">
												<div className="skill-percent">
													<span
														className="count-num"
														data-speed="3000"
														data-stop="90"
														>0</span
													>%
												</div>
												<div
													className="progress-bar"
													role="progressbar"
													aria-valuenow="90"
													aria-valuemax="100"
												></div>
											</div>
										</div> */}
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