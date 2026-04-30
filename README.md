# 雲ラーメン — Kumo Ramen

> *"Where the broth never sleeps"*

A full-stack landing page for **Kumo Ramen**, a fictional Japanese ramen bar in Bandra West, Mumbai. Built with Next.js 14, Tailwind CSS, Google Sheets as a reservation database, Twilio WhatsApp notifications, and a password-protected admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

---

## Features

- **Landing Page** — Hero, About, Menu (tabbed), Hours & Location, Reservation Form
- **Reservation System** — Form submissions saved directly to Google Sheets
- **WhatsApp Notifications** — Instant Twilio WhatsApp alert to restaurant owner on every booking
- **Admin Dashboard** — Password-protected `/admin` panel to view, confirm, and cancel reservations
- **Scroll Animations** — Intersection Observer reveal animations throughout
- **Fully Responsive** — Mobile-first layout across all sections

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Reservation Storage | Google Sheets API |
| Notifications | Twilio WhatsApp API |
| Admin Auth | NextAuth.js (credentials) |
| Deployment | Vercel |

---

## Project Structure

```
kumo-ramen/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  ← Landing page
│   │   ├── admin/
│   │   │   ├── page.tsx              ← Admin dashboard
│   │   │   └── login/page.tsx        ← Admin login
│   │   └── api/
│   │       ├── reservations/route.ts ← POST / GET / PATCH
│   │       └── auth/[...nextauth]/   ← NextAuth handler
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Menu.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── ReserveForm.tsx
│   │   └── admin/
│   │       ├── AdminHeader.tsx
│   │       ├── BookingTable.tsx
│   │       └── StatusBadge.tsx
│   ├── lib/
│   │   ├── sheets.ts                 ← Google Sheets helpers
│   │   ├── whatsapp.ts               ← Twilio helpers
│   │   └── auth.ts                   ← NextAuth config
│   └── types/
│       └── index.ts                  ← Reservation types
├── .env.local                        ← Secrets (never committed)
└── ...
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/kumo-ramen.git
cd kumo-ramen
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
# Google Sheets
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
RESTAURANT_WHATSAPP_NUMBER=whatsapp:+91XXXXXXXXXX

# NextAuth
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000

# Admin credentials
ADMIN_EMAIL=admin@kumoramen.com
ADMIN_PASSWORD=your_secure_password
```

### 4. Set up Google Sheets

1. Create a Google Sheet with headers in Row 1: `ID | Name | Phone | Date | Time | Guests | Occasion | Status | Submitted At`
2. Create a Google Cloud project and enable the **Google Sheets API**
3. Create a **Service Account**, download the JSON key
4. Share the sheet with the service account email as **Editor**

### 5. Set up Twilio WhatsApp

1. Sign up at [twilio.com](https://twilio.com)
2. Go to **Messaging → Try it out → Send a WhatsApp message**
3. Activate the sandbox by messaging the sandbox number from your WhatsApp
4. Add your Account SID and Auth Token to `.env.local`

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables — Vercel Deployment

When deploying to Vercel, add all variables from `.env.local` in:
**Project Settings → Environment Variables**

> ⚠️ For `GOOGLE_PRIVATE_KEY` — paste the full key including `\n` characters. Wrap it in double quotes.

---

## Admin Panel

| Route | Description |
|---|---|
| `/admin/login` | Staff login page |
| `/admin` | Reservations dashboard |

The admin dashboard shows all bookings pulled live from Google Sheets. Staff can mark reservations as **Confirmed** or **Cancelled** — changes sync back to the sheet instantly.

---

## API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/reservations` | Public | Submit a new reservation |
| `GET` | `/api/reservations` | Admin | Fetch all reservations |
| `PATCH` | `/api/reservations` | Admin | Update reservation status |

---

## Reservation Flow

```
Customer fills form
        ↓
POST /api/reservations
        ↓
   ┌────────────────────┐
   │                    │
Google Sheets      Twilio WhatsApp
(stores booking)   (alerts owner)
   └────────────────────┘
        ↓
Booking ID shown to customer
```

---

## Deployment

This project is optimised for **Vercel**:

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo directly at [vercel.com/new](https://vercel.com/new) and Vercel will auto-deploy on every push to `main`.

---

## License

MIT — free to use as a template for client projects.

---

*Built with ❤️ and lots of ramen.*