export const aboutDesVariants = {
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

export const aboutPersonaInfoVariants = {
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

export const aboutPersonaVideoInfoVariants = {
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