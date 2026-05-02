import { ReservationFormData } from '@/types'

export async function sendWhatsAppNotification(
  data: ReservationFormData,
  id: string
): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID!
  const authToken  = process.env.TWILIO_AUTH_TOKEN!

  const message = `🏮 *New Reservation — Kumo Ramen*

👤 *Name:* ${data.name}
📞 *Phone:* ${data.phone}
📅 *Date:* ${data.date}
🕐 *Time:* ${data.time}
👥 *Guests:* ${data.guests}
🎉 *Occasion:* ${data.occasion || 'None'}

🆔 Booking ID: ${id}`

  const body = new URLSearchParams({
    To:   process.env.RESTAURANT_WHATSAPP_NUMBER!,
    From: process.env.TWILIO_WHATSAPP_FROM!,
    Body: message,
  })

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        'Content-Type':  'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    }
  )

  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Twilio error: ${err.message}`)
  }
}