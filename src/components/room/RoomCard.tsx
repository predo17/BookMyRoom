import type { Room } from "@/types/room"
import { Link } from "react-router-dom"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Projector } from "lucide-react"

type Props = {
  room: Room
}

export function RoomCard({ room }: Props) {

  return (
    <Card className="relative z-10 p-0 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0 flex flex-col">
        {/* Container da imagem com fallback */}
        <div className="relative rounded-t-xl overflow-hidden h-60 bg-gray-100">
          <img
            src={room.img}
            alt={room.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Conteúdo do card */}
        <div className="p-6">
          <CardHeader className="space-y-2 p-0">
            <h3 className="text-xl font-bold tracking-tight line-clamp-1">
              {room.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Capacidade: {room.capacity} {room.capacity === 1 ? 'pessoa' : 'pessoas'}
            </p>
          </CardHeader>

          {/* Badges/recursos da sala */}
          <div className="mt-4 flex flex-wrap gap-2">
            {room.hasProjector && (
              <Badge variant="secondary" className="gap-1.5">
                <Projector className="w-3.5 h-3.5" />
                Projetor
              </Badge>
            )}

          </div>

          {/* Botão de reserva */}
          <div className="mt-6 pt-4 border-t">
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 transition-colors"
              size="lg"
            >
              <Link
                to={`/reservation?room=${room.id}`}
                state={{ room }} // Passa dados do room via state
                className="flex items-center justify-center gap-2"
              >
                <span>Reservar Agora</span>
                <span className="text-lg">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
// Componente de fallback para carregamento
export function RoomCardSkeleton() {
  return (
    <Card className="relative z-10 animate-pulse">
      <CardContent className="p-0 flex flex-col">
        <div className="rounded-t-xl overflow-hidden h-60 bg-gray-200" />
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-20" />
            <div className="h-6 bg-gray-200 rounded w-24" />
          </div>
          <div className="h-10 bg-gray-200 rounded w-full mt-6" />
        </div>
      </CardContent>
    </Card>
  );
}
