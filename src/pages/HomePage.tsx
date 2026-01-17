import { rooms } from "@/data/rooms.ts"
import { RoomCard } from "@/components/room/RoomCard"

export default function HomePage() {
  return (
    <section className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">
        Salas disponíveis
      </h1>

      <div className="space-y-4 p-4">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
          />
        ))}
      </div>
    </section>
  )
}
