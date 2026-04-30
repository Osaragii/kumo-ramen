import twilio from 'twilio'
import { ReservationFormData } from '@/types'

export async function sendWhatsAppNotification(
  data: ReservationFormData,
  id: string
): Promise<void> {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )

  const message = `
🏮 *New Reservation — Kumo Ramen*

👤 *Name:* ${data.name}
📞 *Phone:* ${data.phone}
📅 *Date:* ${data.date}
🕐 *Time:* ${data.time}
👥 *Guests:* ${data.guests}
🎉 *Occasion:* ${data.occasion || 'None'}

🆔 Booking ID: ${id}

Reply CONFIRM ${id} or CANCEL ${id}
  `.trim()

  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to:   process.env.RESTAURANT_WHATSAPP_NUMBER!,
    body: message,
  })
}