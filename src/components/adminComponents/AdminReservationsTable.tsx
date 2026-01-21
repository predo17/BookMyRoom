import type { Reservation } from "@/types/reservation"
import { formatSlotLabel } from "@/lib/slots"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Trash2 } from "lucide-react"

type Props = {
  reservations: Reservation[]
  isConflict: (r: Reservation) => boolean
  onCancel: (id: string) => void
}

export default function AdminReservationsTable({
  reservations,
  isConflict,
  onCancel,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold">
          <Calendar className="size-5" />
          Todas as reservas
        </h3>
      </CardHeader>
      <CardContent>
        {reservations.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhuma reserva cadastrada.</p>
        ) : (
          <div className="overflow-x-auto px-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 pr-2 text-left">Cômodo</th>
                  <th className="pb-2 pr-2 text-left">Data</th>
                  <th className="pb-2 pr-2 text-left">Horário</th>
                  <th className="pb-2 pr-2 text-left">Usuário</th>
                  <th className="pb-2 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="py-2 pr-2">
                      {r.roomName}
                      {isConflict(r) && (
                        <Badge variant="destructive" className="ml-1">
                          Conflito
                        </Badge>
                      )}
                    </td>
                    <td className="py-2 pr-2">
                      {new Date(r.date + "T12:00:00").toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-2 pr-2">{formatSlotLabel(r.timeSlot)}</td>
                    <td className="py-2 pr-2">{r.userName}</td>
                    <td className="py-2 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => onCancel(r.id)}
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
  )
}
