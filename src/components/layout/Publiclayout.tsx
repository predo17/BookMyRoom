import { Outlet } from "react-router-dom"

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b p-4 font-semibold">
        Room Reservation
      </header>

      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  )
}
