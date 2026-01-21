import type { Room } from "@/types/room"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

type Props = {
  room: Room
  onEdit: () => void
  onRemove: () => void
}

export default function AdminRoomListItem({ room, onEdit, onRemove }: Props) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2">
      <span className="font-medium">{room.name}</span>
      <span className="text-muted-foreground text-sm">
        {room.capacity} pessoas {room.hasProjector && "• Projetor"}
      </span>
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" onClick={onEdit}>
          <Pencil className="size-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-destructive hover:bg-destructive/10"
          onClick={onRemove}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </li>
  )
}
