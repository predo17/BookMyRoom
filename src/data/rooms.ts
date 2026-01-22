import type { Room } from "../types/room"

export const rooms: Room[] = [
    {
        id: '1',
        name: 'Quarto',
        img: '/quarto-1.avif',
        capacity: 2,
        hasProjector: true
    },
    {
        id: '2',
        name: 'Sala de estar',
        img: '/sala_estar.webp',
        capacity: 6,
        hasProjector: false
    },
    {
        id: '3',
        name: 'Sala de reunião',
        img: '/sala_reuniao.avif',
        capacity: 8,
        hasProjector: true
    }
]
