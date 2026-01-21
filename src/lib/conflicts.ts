import type { Reservation } from "@/types/reservation"

export type ConflictGroup = {
  roomId: string
  roomName: string
  date: string
  timeSlot: string
  reservations: Reservation[]
}

/** Agrupa reservas por (roomId, date, timeSlot) e retorna apenas grupos com 2+ reservas (conflito) */
export function getConflicts(reservations: Reservation[]): ConflictGroup[] {
  const map = new Map<string, Reservation[]>()
  for (const r of reservations) {
    const key = `${r.roomId}|${r.date}|${r.timeSlot}`
    const list = map.get(key) ?? []
    list.push(r)
    map.set(key, list)
  }
  return Array.from(map.entries())
    .filter(([, list]) => list.length >= 2)
    .map(([key, list]) => {
      const [roomId, date, timeSlot] = key.split("|")
      return {
        roomId,
        roomName: list[0].roomName,
        date,
        timeSlot,
        reservations: list,
      }
    })
}

/** Verifica se existe reserva para (roomId, date, timeSlot) */
export function isSlotOccupied(
  reservations: Reservation[],
  roomId: string,
  date: string,
  timeSlot: string
): boolean {
  return reservations.some(
    (r) => r.roomId === roomId && r.date === date && r.timeSlot === timeSlot
  )
}
