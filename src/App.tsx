import { BrowserRouter, Routes, Route } from "react-router-dom"


import HomePage from "./pages/HomePage"
import Reservation from "./pages/Reservation"
import Admin from "./pages/Admin"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}