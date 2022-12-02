export const experienceVariants = {
	hidden : {
		y:1000,
		opacity:0,
		scale:0,
	},
	visible:{
		y:0,
		opacity:1,
		scale:1,
		transition:{
			type:'spring',
			delay:0.3,
			ease: "easeInOut",
			duration:0.5
		}
	}
}