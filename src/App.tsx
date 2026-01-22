import { Routes, Route, useLocation } from "react-router-dom"


import HomePage from "./pages/HomePage"
import Reservation from "./pages/ReservationPage"
import Admin from "./pages/AdminPage"
import Header from "./components/Header"
import { useEffect } from "react"

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}