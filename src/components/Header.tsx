import { Link, useLocation } from "react-router-dom"
import { Home, CalendarPlus, LayoutDashboard, MapPinHouse, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetClose, SheetTrigger, SheetContent } from "./ui/sheet"
import { cn } from "@/lib/utils"

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between gap-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Link to="/" className="flex items-center gap-1">
        <MapPinHouse size={30} />
        <h1 className="text-xl font-medium tracking-tight">BookMyRoom</h1>
      </Link>

      <nav className="hidden sm:flex items-center gap-2">
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
        <Button variant="ghost" size="sm" asChild>
          <Link
            to="/admin"
            className={cn(pathname === "/admin" && "bg-accent")}
          >
            <LayoutDashboard className="size-4" />
            Admin
          </Link>
        </Button>
      </nav>
      {/* Mobile navbar */}
      <nav className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-10"
            >
              <Menu className="size-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 px-2">
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center gap-1">
                <MapPinHouse className="size-7 text-primary" />
                <h2 className="text-xl font-bold">BookMyRoom</h2>
              </div>

              <div className="flex flex-col gap-2">
                <SheetClose asChild>
                  <Link
                    to="/"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors",
                      pathname === "/" && "bg-accent"
                    )}
                  >
                    <Home className="size-5" />
                    <span>Início</span>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    to="/reservation"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors",
                      pathname === "/reservation" && "bg-accent"
                    )}
                  >
                    <CalendarPlus className="size-5" />
                    <span>Reservar</span>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    to="/admin"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors mt-4",
                      pathname === "/admin" && "bg-accent"
                    )}
                  >
                    <LayoutDashboard className="size-5" />
                    <span>Admin</span>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
