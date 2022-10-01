import React,{ useState,useEffect } from 'react';

function Skills() {
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
		setSkills([
			{
				id:1,
				name:'HTML',
				percent : 50,
			},
			{
				id:2,
				name:'CSS',
				percent : 40,
			},
			{
				id:3,
				name:'PHP',
				percent : 20,
			},
			{
				id:4,
				name:'JQUERY',
				percent : 50,
			},
			{
				id:5,
				name:'WORDPRESS',
				percent : 80,
			},
		])
	}
   }

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
									<span className="sub_title"
										>Interdum a etiam sagittis vehicula porta. Massa felis eros
										quam blandit nulla dolor habitant. Ullamcorper quis ornare
										et proin pellentesque.</span
									>
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
											Some talk about my professional design skill
										</h2>
										<p className="pt_15">
											At mattis condimentum leo cubilia dictumst purus cubilia
											nisl quisque lacus ultricies proin massa fermentum
											placerat sociosqu ornare felis ultricies taciti mauris.
											Tempor mi, cum a condimentum commodo bibendum risus mauris
											natoque molestie tellus. In iaculis ad augue gravida
											posuere.
										</p>
										<p className="pt_15">
											Lectus neque fames lacinia magnis primis. Dictumst
											torquent dictumst. Bibendum et rutrum feugiat fames
											interdum purus feugiat praesent Nunc vivamus habitant nam
											ultricies est. Massa amet cubilia, vitae nonummy nisl.
											Rutrum mus velit vivamus sapien est.
										</p>
									</div>
								</div>
								<div className="col-md-12 col-lg-6">
									<div className="skill-progress wow animated slideInRight">
										{skills?.map((skill) => {
											return (
												<div key={skill.id} className="prgs-bar fact-counter">
											<span>{skill.name}</span>
											<div
												className="progress count wow"
												data-wow-duration="0ms"
											>
												<div className="skill-percent">
												<span
													className="count-num"
													data-speed="3000"
													data-stop={skill.percent}
												>
													{skill.percent}
												</span>
												%
												</div>
												<div
												className="progress-bar"
												role="progressbar"
												aria-valuenow={skill.percent}
												aria-valuemax="100"
												style={{ width: `${skill.percent}%` }}
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