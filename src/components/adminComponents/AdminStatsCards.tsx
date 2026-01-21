import { Card, CardContent, CardHeader } from "@/components/ui/card"

type Props = {
  reservationsCount: number
  conflictsCount: number
}

export default function AdminStatsCards({ reservationsCount, conflictsCount }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <span className="text-muted-foreground text-sm">Total de reservas</span>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{reservationsCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <span className="text-muted-foreground text-sm">Conflitos de horário</span>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-destructive">{conflictsCount}</p>
        </CardContent>
      </Card>
    </div>
  )
}
