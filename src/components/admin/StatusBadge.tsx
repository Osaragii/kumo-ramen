import { ReservationStatus } from '@/types'

const styles: Record<ReservationStatus, string> = {
  pending:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-green-500/10  text-green-400  border-green-500/30',
  cancelled: 'bg-red-500/10    text-red-400    border-red-500/30',
}

export default function StatusBadge({ status }: { status: ReservationStatus }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 text-[0.62rem] tracking-[0.15em] uppercase border ${styles[status]}`}>
      {status}
    </span>
  )
}