import type { Room } from "@/types/room"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DoorOpen, Plus } from "lucide-react"
import AdminRoomForm, { type RoomFormState } from "./AdminRoomForm"
import AdminRoomListItem from "./AdminRoomListItem"

type Props = {
  rooms: Room[]
  editingRoomId: string | null
  showNewRoom: boolean
  form: RoomFormState
  onFormChange: (patch: RoomFormState) => void
  imgInputMode: "url" | "upload"
  onImgInputModeChange: (mode: "url" | "upload") => void
  imgLoading: boolean
  setImgLoading: (v: boolean) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImg: () => void
  onStartNew: () => void
  onStartEdit: (room: Room) => void
  onSaveRoom: () => void
  onCancelForm: () => void
  onRemoveRoom: (id: string, name: string) => void
}

export default function AdminRoomsSection({
  rooms,
  editingRoomId,
  showNewRoom,
  form,
  onFormChange,
  imgInputMode,
  onImgInputModeChange,
  imgLoading,
  setImgLoading,
  onFileUpload,
  onUrlChange,
  onRemoveImg,
  onStartNew,
  onStartEdit,
  onSaveRoom,
  onCancelForm,
  onRemoveRoom,
}: Props) {
  const showForm = showNewRoom || !!editingRoomId

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold">
          <DoorOpen className="size-5" />
          Cômodos
        </h3>
        <Button size="sm" onClick={onStartNew} disabled={showNewRoom || !!editingRoomId}>
          <Plus className="size-4" />
          Novo cômodo
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <AdminRoomForm
            form={form}
            onFormChange={onFormChange}
            imgInputMode={imgInputMode}
            onImgInputModeChange={onImgInputModeChange}
            imgLoading={imgLoading}
            setImgLoading={setImgLoading}
            onFileUpload={onFileUpload}
            onUrlChange={onUrlChange}
            onRemoveImg={onRemoveImg}
            onSave={onSaveRoom}
            onCancel={onCancelForm}
            isEditing={!!editingRoomId}
          />
        )}

        <ul className="space-y-2">
          {rooms.map((r) =>
            editingRoomId === r.id ? null : (
              <AdminRoomListItem
                key={r.id}
                room={r}
                onEdit={() => onStartEdit(r)}
                onRemove={() => onRemoveRoom(r.id, r.name)}
              />
            )
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
