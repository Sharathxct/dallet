import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Wallet } from './components/Wallet.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Wallet>
      <App />
    </Wallet>
  </StrictMode>,
)
