import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BookMyRoomProvider } from './context/BookMyRoomContext'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookMyRoomProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BookMyRoomProvider>
  </StrictMode>,
)
