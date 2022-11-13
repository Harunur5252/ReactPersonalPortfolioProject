import {motion} from 'framer-motion'

function ErrorFallback({error, resetErrorBoundary}) {
    return (
        <div className="container">
           <div className="row">
                 <div className="col-lg-12">
                     <div className="card" role="alert" style={{margin:'0 auto',width:'600px',marginTop:'10rem'}}>
                        <div className="card-header" style={{color:'red',fontSize:'1.3rem',fontWeight:'600'}}>
                            ErrorOccurred
                        </div>
                        <div className="card-body">
                            <h5 className="card-title" style={{color:'red',fontSize:'1.2rem',fontWeight:'600'}}>Something went wrong</h5>
                            <p className="card-text" style={{color:'red',fontSize:'1.1rem',fontWeight:'600'}}>Error has : <span style={{color:'black',fontSize:'1rem',fontWeight:'400'}}>{error.message}</span></p>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="btn btn-success mt-2" onClick={resetErrorBoundary}>Try again</motion.button>
                        </div>
                    </div>
                 </div>
           </div>
        </div>
      
    )
}

export default ErrorFallback