const START_HOUR = 0
const END_HOUR = 23

/** Slots de 1 hora: 08:00, 09:00, ... 17:00 */
export function getTimeSlots(): string[] {
  const slots: string[] = []
  for (let h = START_HOUR; h < END_HOUR; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`)
  }
  return slots
}

export function formatSlotLabel(slot: string): string {
  const [h] = slot.split(":")
  const next = (parseInt(h, 10) + 1).toString().padStart(2, "0")
  return `${slot} - ${next}:00`
}

/** Retorna true se a data é passada (antes de hoje) */
export function isPastDate(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr + "T12:00:00")
  return d < today
}

/** Retorna a data mínima selecionável (hoje) em YYYY-MM-DD */
export function getMinDate(): string {
  return new Date().toISOString().slice(0, 10)
}
/** Retorna true se o horário já passou para a data selecionada */
export function isPastTimeSlot(
  dateStr: string,
  slot: string
): boolean {
  const now = new Date()

  // Se não for hoje, não é horário passado
  const todayStr = now.toISOString().slice(0, 10)
  if (dateStr !== todayStr) return false

  const [hour] = slot.split(":").map(Number)

  const slotDate = new Date()
  slotDate.setHours(hour, 0, 0, 0)

  return slotDate <= now
}