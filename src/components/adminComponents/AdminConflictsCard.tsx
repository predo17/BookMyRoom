import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatSlotLabel } from "@/lib/slots"
import type { ConflictGroup } from "@/lib/conflicts"
import { AlertTriangle } from "lucide-react"

type Props = {
  conflicts: ConflictGroup[]
}

export default function AdminConflictsCard({ conflicts }: Props) {
  if (conflicts.length === 0) return null

  return (
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
              {c.roomName} — {new Date(c.date + "T12:00:00").toLocaleDateString("pt-BR")} —{" "}
              {formatSlotLabel(c.timeSlot)}
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
  )
}
