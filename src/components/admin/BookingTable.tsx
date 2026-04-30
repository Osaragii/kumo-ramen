'use client'

import { useState } from 'react'
import { Reservation, ReservationStatus } from '@/types'
import StatusBadge from './StatusBadge'

export default function BookingTable({ initial }: { initial: Reservation[] }) {
  const [reservations, setReservations] = useState<Reservation[]>(initial)
  const [loading, setLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<ReservationStatus | 'all'>('all')
  const [search, setSearch] = useState('')

  async function updateStatus(id: string, status: ReservationStatus) {
    setLoading(id)
    try {
      const res = await fetch('/api/reservations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (!res.ok) throw new Error('Failed')
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      )
    } catch {
      alert('Failed to update status. Try again.')
    } finally {
      setLoading(null)
    }
  }

  const filtered = reservations
    .filter((r) => filter === 'all' || r.status === filter)
    .filter((r) =>
      search === '' ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      r.id.toLowerCase().includes(search.toLowerCase())
    )

  const counts = {
    all:       reservations.length,
    pending:   reservations.filter((r) => r.status === 'pending').length,
    confirmed: reservations.filter((r) => r.status === 'confirmed').length,
    cancelled: reservations.filter((r) => r.status === 'cancelled').length,
  }

  const filterTabs: { key: ReservationStatus | 'all'; label: string }[] = [
    { key: 'all',       label: `All (${counts.all})`             },
    { key: 'pending',   label: `Pending (${counts.pending})`     },
    { key: 'confirmed', label: `Confirmed (${counts.confirmed})` },
    { key: 'cancelled', label: `Cancelled (${counts.cancelled})` },
  ]

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total',     value: counts.all,       color: 'text-[var(--gold-light)]' },
          { label: 'Pending',   value: counts.pending,   color: 'text-yellow-400'          },
          { label: 'Confirmed', value: counts.confirmed, color: 'text-green-400'           },
          { label: 'Cancelled', value: counts.cancelled, color: 'text-red-400'             },
        ].map(({ label, value, color }) => (
          <div key={label} className="border border-(--border) p-4" style={{ background: 'var(--bg3)' }}>
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-(--muted) mb-1">{label}</p>
            <p className={`font-jp text-3xl ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
        <div className="flex gap-0">
          {filterTabs.map(({ key, label }, i) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 text-[0.68rem] tracking-[0.15em] uppercase border border-(--border) transition-all duration-200 cursor-pointer
                ${i !== filterTabs.length - 1 ? 'border-r-0' : ''}
                ${filter === key
                  ? 'bg-(--red) text-white border-(--red)'
                  : 'text-(--muted) hover:text-white'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search name, phone, ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-(--bg3) border border-(--border) text-(--white) px-4 py-2 text-[0.82rem] outline-none focus:border-(--gold) transition-colors placeholder:text-(--muted) w-64"
        />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="border border-(--border) p-16 text-center text-(--muted) text-sm">
          No reservations found.
        </div>
      ) : (
        <div className="border border-(--border) overflow-x-auto">
          <table className="w-full text-left text-[0.82rem]">
            <thead>
              <tr className="border-b border-(--border)" style={{ background: 'var(--bg3)' }}>
                {['ID', 'Name', 'Phone', 'Date', 'Time', 'Guests', 'Occasion', 'Status', 'Submitted', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-[0.62rem] tracking-[0.2em] uppercase text-(--muted) font-normal whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr
                  key={r.id}
                  className={`border-b border-(--border) hover:bg-[rgba(201,168,76,0.03)] transition-colors
                    ${i % 2 === 0 ? '' : 'bg-[rgba(255,255,255,0.01)]'}`}
                >
                  <td className="px-4 py-4 font-mono text-(--gold) text-[0.72rem]">{r.id}</td>
                  <td className="px-4 py-4 text-(--white) whitespace-nowrap">{r.name}</td>
                  <td className="px-4 py-4 text-(--muted)">{r.phone}</td>
                  <td className="px-4 py-4 text-(--white) whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-4 text-(--white) whitespace-nowrap">{r.time}</td>
                  <td className="px-4 py-4 text-(--muted)">{r.guests}</td>
                  <td className="px-4 py-4 text-(--muted)">{r.occasion || '—'}</td>
                  <td className="px-4 py-4"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-4 text-(--muted) text-[0.72rem] whitespace-nowrap">{r.submittedAt}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {r.status !== 'confirmed' && (
                        <button
                          onClick={() => updateStatus(r.id, 'confirmed')}
                          disabled={loading === r.id}
                          className="px-2.5 py-1 text-[0.62rem] tracking-wide uppercase bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors disabled:opacity-40 cursor-pointer"
                        >
                          {loading === r.id ? '...' : 'Confirm'}
                        </button>
                      )}
                      {r.status !== 'cancelled' && (
                        <button
                          onClick={() => updateStatus(r.id, 'cancelled')}
                          disabled={loading === r.id}
                          className="px-2.5 py-1 text-[0.62rem] tracking-wide uppercase bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors disabled:opacity-40 cursor-pointer"
                        >
                          {loading === r.id ? '...' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}