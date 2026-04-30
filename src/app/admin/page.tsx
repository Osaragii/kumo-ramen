import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getAllReservations } from '@/lib/sheets'
import AdminHeader from '@/components/admin/AdminHeader'
import BookingTable from '@/components/admin/BookingTable'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const reservations = await getAllReservations()

  return (
    <div className="min-h-screen px-[5vw] py-10" style={{ background: 'var(--bg)' }}>
      <AdminHeader />
      <BookingTable initial={reservations} />
    </div>
  )
}