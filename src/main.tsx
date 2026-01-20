import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BookMyRoomProvider } from './context/BookMyRoomContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookMyRoomProvider>
      <App />
    </BookMyRoomProvider>
  </StrictMode>,
)
