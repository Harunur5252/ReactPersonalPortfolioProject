export const blogDesVariants = {
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

export const parentVariants = {
	hidden : {
		opacity:0, 
	},
	visible:{
		opacity:1,
		transition:{
			when:'beforeChildren',
			staggerChildren:0.4,
		}
	}
}

export const childVariants = {
	hidden : {
		opacity:0,
	},
	visible:{
		opacity:1,
		transition:{
			duration:0.4
		}
	}
}