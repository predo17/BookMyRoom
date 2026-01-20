import { useState } from "react"
import { useBookMyRoom } from "@/context/BookMyRoomContext"
import { formatSlotLabel } from "@/lib/slots"
import type { Room } from "@/types/room"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Calendar,
  Trash2,
  Pencil,
  Plus,
  X,
  DoorOpen,
  Projector,
} from "lucide-react"

export default function Admin() {
  const {
    rooms,
    reservations,
    addRoom,
    updateRoom,
    removeRoom,
    cancelReservation,
    getConflicts: getConflictsList,
  } = useBookMyRoom()

  const conflicts = getConflictsList()
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null)
  const [showNewRoom, setShowNewRoom] = useState(false)
  const [form, setForm] = useState<Partial<Room> & { name?: string }>({
    name: "",
    img: "",
    capacity: 10,
    hasProjector: false,
  })

  const startEdit = (r: Room) => {
    setEditingRoomId(r.id)
    setForm({ name: r.name, img: r.img, capacity: r.capacity, hasProjector: r.hasProjector })
    setShowNewRoom(false)
  }

  const startNew = () => {
    setShowNewRoom(true)
    setEditingRoomId(null)
    setForm({ name: "", img: "", capacity: 10, hasProjector: false })
  }

  const saveRoom = () => {
    if (editingRoomId) {
      const { name, img, capacity, hasProjector } = form
      if (name != null)
        updateRoom(editingRoomId, {
          name,
          img: img || "/vite.svg",
          capacity: capacity ?? 10,
          hasProjector: hasProjector ?? false,
        })
      setEditingRoomId(null)
    } else if (showNewRoom && form.name) {
      addRoom({
        name: form.name,
        img: form.img || "/vite.svg",
        capacity: form.capacity ?? 10,
        hasProjector: form.hasProjector ?? false,
      })
      setShowNewRoom(false)
      setForm({ name: "", img: "", capacity: 10, hasProjector: false })
    }
  }

  const handleCancelReservation = (id: string) => {
    if (window.confirm("Cancelar esta reserva?")) cancelReservation(id)
  }

  const handleRemoveRoom = (id: string, name: string) => {
    if (window.confirm(`Remover cômodo "${name}"? As reservas deste cômodo também serão removidos.`))
      removeRoom(id)
  }

  
  const isConflict = (r: (typeof reservations)[0]) =>
    conflicts.some(
      (c) => c.roomId === r.roomId && c.date === r.date && c.timeSlot === r.timeSlot
    )

  const sortedReservations = [...reservations].sort(
    (a, b) => a.date.localeCompare(b.date) || a.timeSlot.localeCompare(b.timeSlot)
  )

  return (
    <section className="mx-auto max-w-4xl space-y-8 p-6">
      <h2 className="text-2xl font-semibold">Dashboard Admin</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <span className="text-muted-foreground text-sm">Total de reservas</span>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{reservations.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <span className="text-muted-foreground text-sm">Conflitos de horário</span>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">{conflicts.length}</p>
          </CardContent>
        </Card>
      </div>

      {conflicts.length > 0 && (
        <Card className="border-destructive/50">
          <CardHeader className="flex flex-row items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" />
            <h3 className="font-semibold">Conflitos detectados</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {conflicts.map((c) => (
              <div
                key={`${c.roomId}-${c.date}-${c.timeSlot}`}
                className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm"
              >
                <p className="font-medium">
                  {c.roomName} — {new Date(c.date + "T12:00:00").toLocaleDateString("pt-BR")} — {formatSlotLabel(c.timeSlot)}
                </p>
                <ul className="mt-1 text-muted-foreground">
                  {c.reservations.map((r) => (
                    <li key={r.id}>• {r.userName}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="flex items-center gap-2 font-semibold">
            <Calendar className="size-5" />
            Todas as reservas
          </h3>
        </CardHeader>
        <CardContent>
          {sortedReservations.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nenhuma reserva cadastrada.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 pr-2 text-left">Sala</th>
                    <th className="pb-2 pr-2 text-left">Data</th>
                    <th className="pb-2 pr-2 text-left">Horário</th>
                    <th className="pb-2 pr-2 text-left">Usuário</th>
                    <th className="pb-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedReservations.map((r) => (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="py-2 pr-2">
                        {r.roomName}
                        {isConflict(r) && (
                          <Badge variant="destructive" className="ml-1">Conflito</Badge>
                        )}
                      </td>
                      <td className="py-2 pr-2">{new Date(r.date + "T12:00:00").toLocaleDateString("pt-BR")}</td>
                      <td className="py-2 pr-2">{formatSlotLabel(r.timeSlot)}</td>
                      <td className="py-2 pr-2">{r.userName}</td>
                      <td className="py-2 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleCancelReservation(r.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="flex items-center gap-2 font-semibold">
            <DoorOpen className="size-5" />
            Cômodos
          </h3>
          <Button size="sm" onClick={startNew} disabled={showNewRoom || !!editingRoomId}>
            <Plus className="size-4" />
            Novo cômodo
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {(showNewRoom || editingRoomId) && (
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Nome</Label>
                  <Input
                    value={form.name ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Ex: Sala de reuniões 1"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Capacidade</Label>
                  <Input
                    type="number"
                    min={1}
                    value={form.capacity ?? 10}
                    onChange={(e) => setForm((f) => ({ ...f, capacity: parseInt(e.target.value, 10) || 1 }))}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>URL da imagem (opcional)</Label>
                <Input
                  value={form.img ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, img: e.target.value }))}
                  placeholder="/vite.svg ou https://..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasProjector"
                  checked={form.hasProjector ?? false}
                  onChange={(e) => setForm((f) => ({ ...f, hasProjector: e.target.checked }))}
                />
                <Label htmlFor="hasProjector" className="flex items-center gap-1">Possui<em> projetor</em> <Projector /> </Label>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={saveRoom} disabled={!form.name?.trim()}>
                  {editingRoomId ? "Salvar" : "Adicionar"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingRoomId(null)
                    setShowNewRoom(false)
                  }}
                >
                  <X className="size-4" />
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          <ul className="space-y-2">
            {rooms.map((r) =>
              editingRoomId === r.id ? null : (
                <li
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2"
                >
                  <span className="font-medium">{r.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {r.capacity} pessoas {r.hasProjector && "• Projetor"}
                  </span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => startEdit(r)}>
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveRoom(r.id, r.name)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </li>
              )
            )}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
