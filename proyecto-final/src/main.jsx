import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MenuProvider } from './context/MenuContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MenuProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </MenuProvider>
    </AuthProvider>
  </StrictMode>
)
