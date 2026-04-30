import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { appendReservation, getAllReservations, updateReservationStatus } from '@/lib/sheets'
import { sendWhatsAppNotification } from '@/lib/whatsapp'
import { ReservationStatus } from '@/types'
import { randomUUID } from 'crypto'

// POST — submit a new reservation
export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Basic validation
    if (!data.name || !data.phone || !data.date || !data.time || !data.guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const id = randomUUID().slice(0, 8).toUpperCase()

    // Save to Google Sheets
    await appendReservation(data, id)

    // Send WhatsApp to restaurant (non-blocking — don't fail if it errors)
    sendWhatsAppNotification(data, id).catch((err) =>
      console.error('WhatsApp notification failed:', err)
    )

    return NextResponse.json(
      { success: true, id, message: 'Reservation received!' },
      { status: 201 }
    )
  } catch (err) {
    console.error('Reservation error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// GET — fetch all reservations (admin only)
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const reservations = await getAllReservations()
    return NextResponse.json({ reservations })
  } catch (err) {
    console.error('Fetch reservations error:', err)
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 })
  }
}

// PATCH — update reservation status (admin only)
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, status } = await req.json() as { id: string; status: ReservationStatus }
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })
    }

    await updateReservationStatus(id, status)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Update status error:', err)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}