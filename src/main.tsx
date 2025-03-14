import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter basename={window.location.origin+"/pi-guesser"}>
      <App />
    </HashRouter>
  </StrictMode>,
)
