import type { Room } from "../types/room"

export const rooms: Room[] = [
    {
        id: '1',
        name: 'Sala 1',
        img: '/quarto-1.avif',
        capacity: 10,
        hasProjector: true
    },
    {
        id: '2',
        name: 'Sala 2',
        img: 'https://pixabay.com/pt/images/download/bedroom-389254_1280.jpg',
        capacity: 15,
        hasProjector: false
    },
    {
        id: '3',
        name: 'Sala 3',
        img: 'https://pixabay.com/pt/images/download/bedroom-389254_1280.jpg',
        capacity: 20,
        hasProjector: true
    }
]
