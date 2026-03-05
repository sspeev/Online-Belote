import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Router from './router.tsx'
import reportWebVitals from './reportWebVitals.ts'

import './index.css'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)

// Only log Web Vitals in development — keeps production console clean
if (import.meta.env.DEV) {
  reportWebVitals(console.log)
}
