export const portfolioDesVariants = {
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