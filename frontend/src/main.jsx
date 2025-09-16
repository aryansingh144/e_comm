import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  AuthContext  from './context/authContext.jsx'
import UserContext from './context/UserContext.jsx'
// import ShopContext from './context/ShopContext.jsx'
import { ShopContextProvider } from './context/ShopContext.jsx'
import ScrollToTop from './component/ScrollToTop.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <ShopContextProvider>
          <ScrollToTop />
            <App />
        </ShopContextProvider>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
)
