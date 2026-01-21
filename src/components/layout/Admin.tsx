import { useState } from "react"
import { useBookMyRoom } from "@/context/BookMyRoomContext"
import type { Room } from "@/types/room"
import {
  AdminStatsCards,
  AdminConflictsCard,
  AdminReservationsTable,
  AdminRoomsSection,
  DeletRoomDialog,
} from "../adminComponents"

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

  const [imgInputMode, setImgInputMode] = useState<"url" | "upload">("url")
  const [imgLoading, setImgLoading] = useState(false)
  const [dialog, setDialog] = useState<{
    open: boolean
    type: "room" | "reservation" | null
    id?: string
    name?: string
  }>({ open: false, type: null })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione apenas imagens")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB")
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => setForm((f) => ({ ...f, img: reader.result as string }))
    reader.readAsDataURL(file)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setForm((f) => ({ ...f, img: url }))
    setImgLoading(!!url)
  }

  const startEdit = (r: Room) => {
    setEditingRoomId(r.id)
    setForm({ name: r.name, img: r.img, capacity: r.capacity, hasProjector: r.hasProjector })
    setShowNewRoom(false)
    setImgInputMode(r.img?.startsWith("http") ? "url" : "upload")
    setImgLoading(false)
  }

  const startNew = () => {
    setShowNewRoom(true)
    setEditingRoomId(null)
    setForm({ name: "", img: "", capacity: 10, hasProjector: false })
    setImgInputMode("url")
    setImgLoading(false)
  }

  const saveRoom = () => {
    if (editingRoomId) {
      const { name, img, capacity, hasProjector } = form
      if (name != null)
        updateRoom(editingRoomId, {
          name,
          img: img ?? "",
          capacity: capacity ?? 10,
          hasProjector: hasProjector ?? false,
        })
      setEditingRoomId(null)
    } else if (showNewRoom && form.name) {
      addRoom({
        name: form.name,
        img: form.img ?? "",
        capacity: form.capacity ?? 10,
        hasProjector: form.hasProjector ?? false,
      })
      setShowNewRoom(false)
      setForm({ name: "", img: "", capacity: 10, hasProjector: false })
    }
  }

  const cancelForm = () => {
    setEditingRoomId(null)
    setShowNewRoom(false)
  }

  const handleRemoveImg = () => {
    setForm((f) => ({ ...f, img: "" }))
    setImgLoading(false)
  }

  const handleCancelReservation = (id: string) => {
    setDialog({ open: true, type: "reservation", id })
  }

  const handleRemoveRoom = (id: string, name: string) => {
    setDialog({ open: true, type: "room", id, name })
  }

  const isConflict = (r: (typeof reservations)[0]) =>
    conflicts.some(
      (c) => c.roomId === r.roomId && c.date === r.date && c.timeSlot === r.timeSlot
    )

  const sortedReservations = [...reservations].sort(
    (a, b) => a.date.localeCompare(b.date) || a.timeSlot.localeCompare(b.timeSlot)
  )

  const handleDialogConfirm = () => {
    if (dialog.type === "room" && dialog.id) removeRoom(dialog.id)
    if (dialog.type === "reservation" && dialog.id) cancelReservation(dialog.id)
    setDialog({ open: false, type: null })
  }

  return (
    <section className="mx-auto max-w-4xl space-y-8 p-6">
      <h2 className="text-2xl font-semibold">Dashboard Admin</h2>

      <AdminStatsCards
        reservationsCount={reservations.length}
        conflictsCount={conflicts.length}
      />

      <DeletRoomDialog
        open={dialog.open}
        title={
          dialog.type === "room"
            ? `Remover cômodo "${dialog.name}"?`
            : "Cancelar esta reserva?"
        }
        message={
          dialog.type === "room"
            ? "As reservas deste cômodo também serão removidas."
            : undefined
        }
        confirmLabel={dialog.type === "room" ? "Remover cômodo" : "Remover"}
        cancelLabel="Voltar"
        onCancel={() => setDialog({ open: false, type: null })}
        onConfirm={handleDialogConfirm}
      />

      <AdminConflictsCard conflicts={conflicts} />

      <AdminReservationsTable
        reservations={sortedReservations}
        isConflict={isConflict}
        onCancel={handleCancelReservation}
      />

      <AdminRoomsSection
        rooms={rooms}
        editingRoomId={editingRoomId}
        showNewRoom={showNewRoom}
        form={form}
        onFormChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
        imgInputMode={imgInputMode}
        onImgInputModeChange={setImgInputMode}
        imgLoading={imgLoading}
        setImgLoading={setImgLoading}
        onFileUpload={handleFileUpload}
        onUrlChange={handleUrlChange}
        onRemoveImg={handleRemoveImg}
        onStartNew={startNew}
        onStartEdit={startEdit}
        onSaveRoom={saveRoom}
        onCancelForm={cancelForm}
        onRemoveRoom={handleRemoveRoom}
      />
    </section>
  )
}
