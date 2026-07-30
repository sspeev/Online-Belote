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

if (import.meta.env.DEV) {
  reportWebVitals(console.log)
}
