import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { WishListProvider } from './Modules/User/Context.jsx/WishListContext.jsx'
import { UserProvider } from './Modules/User/Context.jsx/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
   <UserProvider>
    <WishListProvider>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
    </WishListProvider>
    </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
