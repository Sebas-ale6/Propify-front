import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LanguageProvider } from './components/context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
