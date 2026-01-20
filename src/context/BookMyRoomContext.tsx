import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { Room } from "@/types/room"
import type { Reservation } from "@/types/reservation"
import { getConflicts, isSlotOccupied } from "@/lib/conflicts"
import { getTimeSlots } from "@/lib/slots"
import { rooms as initialRooms } from "@/data/rooms"

const STORAGE_RESERVATIONS = "bookmyroom_reservations"
const STORAGE_ROOMS = "bookmyroom_rooms"
const STORAGE_USER = "bookmyroom_user"

function loadReservations(): Reservation[] {
  try {
    const s = localStorage.getItem(STORAGE_RESERVATIONS)
    return s ? JSON.parse(s) : []
  } catch {
    return []
  }
}

function loadRooms(): Room[] {
  try {
    const s = localStorage.getItem(STORAGE_ROOMS)
    return s ? JSON.parse(s) : initialRooms
  } catch {
    return initialRooms
  }
}

function loadUser(): string {
  return localStorage.getItem(STORAGE_USER) ?? ""
}

type BookMyRoomContextType = {
  rooms: Room[]
  reservations: Reservation[]
  currentUser: string
  setCurrentUser: (name: string) => void
  setRooms: (rooms: Room[]) => void
  addRoom: (room: Omit<Room, "id">) => void
  updateRoom: (id: string, data: Partial<Room>) => void
  removeRoom: (id: string) => void
  addReservation: (r: Omit<Reservation, "id" | "createdAt">) => Reservation
  cancelReservation: (id: string) => void
  getAvailableSlots: (roomId: string, date: string) => string[]
  getMyReservations: () => Reservation[]
  getConflicts: () => ReturnType<typeof getConflicts>
  isSlotOccupied: (roomId: string, date: string, timeSlot: string) => boolean
}

const BookMyRoomContext = createContext<BookMyRoomContextType | null>(null)

export function BookMyRoomProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(loadReservations)
  const [rooms, setRoomsState] = useState<Room[]>(loadRooms)
  const [currentUser, setCurrentUserState] = useState(loadUser)

  const persistReservations = useCallback((next: Reservation[]) => {
    setReservations(next)
    localStorage.setItem(STORAGE_RESERVATIONS, JSON.stringify(next))
  }, [])

  const persistRooms = useCallback((next: Room[]) => {
    setRoomsState(next)
    localStorage.setItem(STORAGE_ROOMS, JSON.stringify(next))
  }, [])

  const setCurrentUser = useCallback((name: string) => {
    setCurrentUserState(name)
    localStorage.setItem(STORAGE_USER, name)
  }, [])

  const setRooms = useCallback(
    (next: Room[]) => {
      persistRooms(next)
    },
    [persistRooms]
  )

  const addRoom = useCallback(
    (room: Omit<Room, "id">) => {
      const id = (Date.now() + Math.random()).toString(36).slice(2, 10)
      persistRooms([...rooms, { ...room, id }])
    },
    [rooms, persistRooms]
  )

  const updateRoom = useCallback(
    (id: string, data: Partial<Room>) => {
      persistRooms(
        rooms.map((r) => (r.id === id ? { ...r, ...data } : r))
      )
    },
    [rooms, persistRooms]
  )

  const removeRoom = useCallback(
    (id: string) => {
      persistRooms(rooms.filter((r) => r.id !== id))
      persistReservations(reservations.filter((r) => r.roomId !== id))
    },
    [rooms, reservations, persistRooms, persistReservations]
  )

  const addReservation = useCallback(
    (r: Omit<Reservation, "id" | "createdAt">): Reservation => {
      const id = `res-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      const created: Reservation = {
        ...r,
        id,
        createdAt: new Date().toISOString(),
      }
      persistReservations([...reservations, created])
      return created
    },
    [reservations, persistReservations]
  )

  const cancelReservation = useCallback(
    (id: string) => {
      persistReservations(reservations.filter((r) => r.id !== id))
    },
    [reservations, persistReservations]
  )

  const getAvailableSlots = useCallback(
    (roomId: string, date: string): string[] => {
      const all = getTimeSlots()
      return all.filter(
        (slot) => !isSlotOccupied(reservations, roomId, date, slot)
      )
    },
    [reservations]
  )

  const getMyReservations = useCallback((): Reservation[] => {
    if (!currentUser.trim()) return []
    return reservations
      .filter((r) => r.userName.toLowerCase() === currentUser.toLowerCase())
      .sort((a, b) => a.date.localeCompare(b.date) || a.timeSlot.localeCompare(b.timeSlot))
  }, [reservations, currentUser])

  const getConflictsFn = useCallback(
    () => getConflicts(reservations),
    [reservations]
  )

  const isSlotOccupiedFn = useCallback(
    (roomId: string, date: string, timeSlot: string) =>
      isSlotOccupied(reservations, roomId, date, timeSlot),
    [reservations]
  )

  const value = useMemo<BookMyRoomContextType>(
    () => ({
      rooms,
      reservations,
      currentUser,
      setCurrentUser,
      setRooms,
      addRoom,
      updateRoom,
      removeRoom,
      addReservation,
      cancelReservation,
      getAvailableSlots,
      getMyReservations,
      getConflicts: getConflictsFn,
      isSlotOccupied: isSlotOccupiedFn,
    }),
    [
      rooms,
      reservations,
      currentUser,
      setCurrentUser,
      setRooms,
      addRoom,
      updateRoom,
      removeRoom,
      addReservation,
      cancelReservation,
      getAvailableSlots,
      getMyReservations,
      getConflictsFn,
      isSlotOccupiedFn,
    ]
  )

  return (
    <BookMyRoomContext.Provider value={value}>
      {children}
    </BookMyRoomContext.Provider>
  )
}

export function useBookMyRoom() {
  const ctx = useContext(BookMyRoomContext)
  if (!ctx) throw new Error("useBookMyRoom must be used within BookMyRoomProvider")
  return ctx
}
