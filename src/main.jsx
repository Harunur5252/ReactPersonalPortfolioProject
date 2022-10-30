import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import { BrowserRouter } from "react-router-dom";
import "venobox/dist/venobox.min.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.min.css';
import { BlogProvider } from './components/context/Blog.Context';
import { AuthProvider } from './components/context/Auth.Context';
import { PageProvider } from './components/context/Page.Context';
 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BlogProvider>
          <PageProvider>
              <App />
          </PageProvider>
        </BlogProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
