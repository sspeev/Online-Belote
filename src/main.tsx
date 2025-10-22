import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import Router from './router.tsx'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Render the app
createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
