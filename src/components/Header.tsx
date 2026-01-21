import { Link, useLocation } from "react-router-dom"
import { Home, CalendarPlus, LayoutDashboard } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between gap-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Link to="/" className="text-2xl font-bold tracking-tight hover:opacity-90">
        BookMyRoom
      </Link>
      <nav className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link
            to="/"
            className={cn(pathname === "/" && "bg-accent")}
          >
            <Home className="size-4" />
            Início
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link
            to="/reservation"
            className={cn(pathname === "/reservation" && "bg-accent")}
          >
            <CalendarPlus className="size-4" />
            Reservar
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link
            to="/admin"
            className={cn(pathname === "/admin" && "bg-accent")}
          >
            <LayoutDashboard className="size-4" />
            Admin
          </Link>
        </Button>
      </nav>
    </header>
  )
}
