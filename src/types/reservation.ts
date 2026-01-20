export type Reservation = {
  id: string
  roomId: string
  roomName: string
  date: string // YYYY-MM-DD
  timeSlot: string // "08:00", "09:00", etc.
  userName: string
  createdAt: string // ISO
}

export type TimeSlot = {
  value: string // "08:00"
  label: string // "08:00 - 09:00"
  available: boolean
}
