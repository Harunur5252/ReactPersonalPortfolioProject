import React from 'react'

function Preloader() {
  return (
    <>
			<div className="preloader">
			<div className="lds-css ng-scope">
				<div className="lds-spinner" style={{height:'100%',width:'100%'}}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
    </>
  )
}

export default Preloader