import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useBookMyRoom } from "@/context/BookMyRoomContext"
import { getMinDate, isPastDate, getTimeSlots, formatSlotLabel, isPastTimeSlot } from "@/lib/slots"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Reservation() {
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const {
    rooms,
    currentUser,
    setCurrentUser,
    addReservation,
    getAvailableSlots,
  } = useBookMyRoom()

  const roomIdParam = search.get("room")
  const room = rooms.find((r) => r.id === roomIdParam) ?? undefined

  const [roomId, setRoomId] = useState(room?.id ?? "")
  const [date, setDate] = useState(getMinDate())
  const [timeSlot, setTimeSlot] = useState("")
  const [userName, setUserName] = useState(currentUser)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Sincronizar cômodo da URL
  useEffect(() => {
    if (room?.id && !roomId) setRoomId(room.id)
  }, [room?.id, roomId])

  const availableSlots = roomId && date && !isPastDate(date)
    ? getAvailableSlots(roomId, date)
    : []

  // Resetar horário ao mudar data ou sala
  useEffect(() => {
    setTimeSlot("")
  }, [date, roomId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!userName.trim()) {
      setError("Informe seu nome.")
      return
    }
    if (!roomId || !date || !timeSlot) {
      setError("Preencha sala, data e horário.")
      return
    }
    if (isPastDate(date)) {
      setError("Não é possível reservar em data passada.")
      return
    }

    const r = rooms.find((x) => x.id === roomId)
    if (!r) {
      setError("Sala inválida.")
      return
    }

    setCurrentUser(userName.trim())
    addReservation({
      roomId,
      roomName: r.name,
      date,
      timeSlot,
      userName: userName.trim(),
    })
    setSuccess(true)
    setTimeSlot("")
    setDate(getMinDate())
    setTimeout(() => {
      setSuccess(false)
      navigate("/")
    }, 1300)
  }

  const allSlots = getTimeSlots()

  return (
    <section className="mx-auto max-w-xl space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Criar reserva</h2>

      <Card>
        <CardHeader>
          <p className="text-muted-foreground">
            Selecione a sala, data e horário. Datas passadas e horários já ocupados são bloqueados.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Seu nome</Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Ex: João Silva"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">Cômodo</Label>
              <select
                id="room"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Selecione um cômodo</option>
                {rooms?.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.capacity} pessoas)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                min={getMinDate()}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Horário</Label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {allSlots.map((slot) => {
                  const available = availableSlots.includes(slot) && !isPastTimeSlot(date, slot)
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={!available}
                      onClick={() => setTimeSlot(available ? slot : timeSlot)}
                      className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${timeSlot === slot
                          ? "border-primary bg-primary text-primary-foreground"
                          : available
                            ? "border-input hover:bg-accent"
                            : "cursor-not-allowed border-input bg-muted text-muted-foreground opacity-60"
                        }`}
                    >
                      {formatSlotLabel(slot)}
                    </button>
                  )
                })}
              </div>
              {date && isPastDate(date) && (
                <p className="text-sm text-destructive">Selecione uma data futura ou hoje.</p>
              )}
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-green-600 dark:text-green-400" role="status">
                Reserva criada com sucesso! Redirecionando…
              </p>
            )}

            <div className="flex gap-2">
              <Button type="submit">Confirmar reserva</Button>
              <Button type="button" variant="outline" onClick={() => navigate("/")}>
                Voltar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}