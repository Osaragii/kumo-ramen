'use client'

import { signOut } from 'next-auth/react'

export default function AdminHeader() {
  return (
    <div className="flex justify-between items-end mb-10 pb-6 border-b border-(--border)">
      <div>
        <p className="font-jp text-2xl text-(--gold-light)">雲ラーメン</p>
        <h1 className="text-(--white) text-xl mt-1">Reservations Dashboard</h1>
        <p className="text-(--muted) text-[0.78rem] mt-0.5">
          Manage and update all bookings
        </p>
      </div>
      <div className="flex gap-3 items-center">
        <a
          href="/"
          className="px-4 py-2 text-[0.7rem] tracking-[0.15em] uppercase border border-(--border) text-(--muted) hover:text-(--white) transition-colors no-underline"
        >
          ← View Site
        </a>

        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="px-4 py-2 text-[0.7rem] tracking-[0.15em] uppercase border border-[rgba(192,57,43,0.4)] text-(--red) hover:bg-[rgba(192,57,43,0.1)] transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}