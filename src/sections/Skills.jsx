import { useEffect,useContext } from 'react';
import { motion,useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'
import { PageContext } from '../components/context/Page.Context';

const skillSmallDesVariants = {
	hidden : {
		opacity:0,
		scale:0
	},
	visible:{
		opacity:1,
		scale:1,
		transition:{
			type:'spring',
			delay: 0.5,
			ease: "easeOut",
			duration:1,
		}
	}
}

const skillBroadDesVariants = {
	hidden: {
		x:-1000,
		opacity:0,
		scale:0
	},
	visible:{
		x:0,
		opacity:1,
		scale:1,
		transition:{
			delay: 0.3,
			duration:0.9,
		}
	}
}

const skillInfoVariants = {
	hidden: {
		x:1000,
		opacity:0,
		scale:0
	},
	visible:{
		x:0,
		opacity:1,
		scale:1,
		transition:{
			delay: 0.3,
			duration:0.9,
		}
	}
}

function Skills() {
	const {allSkill,skills,handleEvent} = useContext(PageContext)

	console.log(skills)
		// animation
		const controls = useAnimation()
		const [ref,inView] = useInView()
		
		useEffect(() => {
		   if(inView){
			 controls.start('visible')
		   }
		   if(!inView){
			controls.start('hidden')
		  }
		 },[controls,inView])

	useEffect(() =>{
		document.addEventListener('scroll',handleEvent)
		return () => {
			document.removeEventListener('scroll',handleEvent)
		}
	})

  return (
    <>
         <section id="skill" name="skill" className="py_80 bg_secondery full_row">
					<div ref={ref} className="container">
						<div className="row">
							<div className="col-md-12 col-lg-12">
								<div
									className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp"
								>
									<h2 className="title text-uppercase">
										<span className="line_double mx-auto color_default">skill</span
										>Design skill
									</h2>
									<motion.span className="sub_title"
									variants={skillSmallDesVariants} initial='hidden'
									animate={controls}
									>
										{allSkill?.short_skill?allSkill?.short_skill:<span style={{color:'red',fontSize:'1.5rem'}}>No short skill description is available to show</span>}
									</motion.span>
									
								</div>
							</div>
						</div>
						<div className="my_skill">
							<div className="row">
								<motion.div className="col-md-12 col-lg-6"
								variants={skillBroadDesVariants} initial='hidden'
								animate={controls}
								>
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
								</motion.div>
								<motion.div className="col-md-12 col-lg-6"
								variants={skillInfoVariants} initial='hidden'
								animate={controls}
								>
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
								</motion.div>
							</div>
						</div>
					</div>
		 </section>
    </>
  )
}

export default Skills