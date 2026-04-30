export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Reservation {
  id: string
  name: string
  phone: string
  date: string
  time: string
  guests: string
  occasion: string
  status: ReservationStatus
  submittedAt: string
}

export interface ReservationFormData {
  name: string
  phone: string
  date: string
  time: string
  guests: string
  occasion: string
}