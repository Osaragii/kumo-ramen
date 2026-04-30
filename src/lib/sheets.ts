import { google } from 'googleapis'
import { Reservation, ReservationFormData, ReservationStatus } from '@/types'

const SHEET_NAME = 'Sheet1'

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

export async function appendReservation(
  data: ReservationFormData,
  id: string
): Promise<void> {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
  })

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:I`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        id,
        data.name,
        data.phone,
        data.date,
        data.time,
        data.guests,
        data.occasion || 'None',
        'pending',
        submittedAt,
      ]],
    },
  })
}

export async function getAllReservations(): Promise<Reservation[]> {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: `${SHEET_NAME}!A2:I`,
  })

  const rows = res.data.values
  if (!rows || rows.length === 0) return []

  return rows.map((row) => ({
    id:          row[0] || '',
    name:        row[1] || '',
    phone:       row[2] || '',
    date:        row[3] || '',
    time:        row[4] || '',
    guests:      row[5] || '',
    occasion:    row[6] || '',
    status:      (row[7] as ReservationStatus) || 'pending',
    submittedAt: row[8] || '',
  }))
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus
): Promise<void> {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  // Find the row with this ID
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:A`,
  })

  const rows = res.data.values || []
  const rowIndex = rows.findIndex((row) => row[0] === id)
  if (rowIndex === -1) throw new Error('Reservation not found')

  // Row 1 is header, data starts at row 2 (rowIndex 0 = row 2)
  const sheetRow = rowIndex + 1

  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: `${SHEET_NAME}!H${sheetRow}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[status]] },
  })
}