import React from 'react'
import Header from '../shared/Header'
import Footer from '../shared/Footer'

function Layout({children}) {
  return (
    <>
     <div id="page_wrapper">
			  <div className="row">
            <Header />
               {children}
            <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout