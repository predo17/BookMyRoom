import { BrowserRouter, Routes, Route } from "react-router-dom"


import HomePage from "./pages/HomePage"
import Reservation from "./pages/ReservationPage"
import Admin from "./pages/AdminPage"
import Header from "./components/Header"

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}