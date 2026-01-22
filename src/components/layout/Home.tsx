import { useState } from "react"
import { RoomCard } from "../room/RoomCard"
import { useBookMyRoom } from "@/context/BookMyRoomContext"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { formatSlotLabel } from "@/lib/slots"
import { Calendar, Search, User } from "lucide-react"

export default function Home() {
  const { rooms, currentUser, setCurrentUser, getMyReservations } = useBookMyRoom()
  const [inputName, setInputName] = useState(currentUser)
  const myReservations = getMyReservations()

  const handleSetUser = () => {
    setCurrentUser(inputName.trim())
  }

  return (
    <section className="w-full max-w-7xl mx-auto space-y-8 p-6 ">


      <div className="flex flex-col-reverse lg:flex-row-reverse lg:gap-4">

        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <h2 className="text-xl font-semibold mb-4">Cômodos disponíveis</h2>

          <div className="space-y-4 ">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 w-full  max-h-max space-y-4 ">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4"><Search /> Buscar reservas</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="my-name" className="text-sm font-medium flex items-start gap-1 ">
              <User className="size-4 mt-0.5" />
              Nome para identificar suas reservas
            </label>
            <div className="flex gap-2">
              <div className="flex-1 min-w-50 space-y-1">
                <Input
                  id="my-name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  onBlur={handleSetUser}
                  onKeyDown={(e) => e.key === "Enter" && handleSetUser()}
                  placeholder="Ex: Maria"
                />
              </div>
              <Button variant="outline" onClick={handleSetUser}>
                Atualizar
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Calendar className="size-5" />
              <h3 className="text-lg font-semibold">Minhas reservas</h3>
            </CardHeader>
            <CardContent>
              {!currentUser.trim() ? (
                <p className="text-muted-foreground text-sm">
                  Informe seu nome acima para listar suas reservas.
                </p>
              ) : myReservations.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Você ainda não tem reservas. Clique em &quot;Reservar&quot; em uma sala.
                </p>
              ) : (
                <ul className="space-y-2">
                  {myReservations.map((r) => (
                    <li
                      key={r.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm"
                    >
                      <span className="font-medium">{r.roomName}</span>
                      <span className="text-muted-foreground">
                        {new Date(r.date + "T12:00:00").toLocaleDateString("pt-BR")} • {formatSlotLabel(r.timeSlot)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

    </section>
  )
}
