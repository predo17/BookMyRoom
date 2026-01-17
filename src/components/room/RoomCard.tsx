import type { Room } from "@/types/room"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"

type Props = {
    room: Room
}

export function RoomCard({ room }: Props) {
    return (
        <Card>
            <CardHeader className="space-y-1" >
                <h3 className="text-lg font-semibold" >
                    {room.name}
                </h3>

                < p className="text-sm text-muted-foreground" >
                    Capacidade: {room.capacity} pessoas
                </p>
            </CardHeader>

            < CardContent className="flex items-center justify-between" >
                <div className="flex gap-2" >
                    {
                        room.hasProjector && (
                            <Badge variant="secondary"> Projetor </Badge>
                        )
                    }
                </div>

                < Button size="sm" >
                    Reservar
                </Button>
            </CardContent>
        </Card>

    )
}
