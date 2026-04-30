'use client'

import { useEffect, useRef, useState } from 'react'
import { ReservationFormData } from '@/types'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ReserveForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus]   = useState<Status>('idle')
  const [bookingId, setBookingId] = useState('')
  const [form, setForm] = useState<ReservationFormData>({
    name: '', phone: '', date: '', time: '', guests: '', occasion: '',
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const today = new Date().toISOString().split('T')[0]

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Something went wrong')

      setBookingId(data.id)
      setStatus('success')
      setForm({ name: '', phone: '', date: '', time: '', guests: '', occasion: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = `
    w-full bg-[var(--bg3)] border border-[var(--border)] text-[var(--white)]
    px-4 py-3 text-[0.85rem] font-light outline-none
    focus:border-[var(--gold)] transition-colors duration-300
    placeholder:text-[var(--muted)]
  `

  return (
    <section
      id="reserve"
      ref={sectionRef}
      className="relative px-[5vw] py-24 border-t border-(--border) overflow-hidden text-center flex justify-center"
    >
      {/* Background kanji */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-jp text-[20rem] pointer-events-none select-none leading-none whitespace-nowrap"
        style={{ color: 'rgba(201,168,76,0.03)' }}
      >
        予約
      </div>

      <div className="reveal relative max-w-xl mx-auto">
        <p className="text-[0.68rem] tracking-[0.4em] uppercase text-(--red) mb-3">
          Reserve a Table
        </p>
        <h2 className="font-jp text-[clamp(2rem,4vw,3rem)] font-normal text-(--white) mb-2">
          Come Sit With Us
        </h2>
        <p className="text-[0.83rem] text-(--muted) leading-relaxed mb-10">
          Walk-ins always welcome. Reservations recommended on weekends and after 9PM.
        </p>

        {/* Success state */}
        {status === 'success' && (
          <div className="border border-[rgba(74,138,58,0.4)] bg-[rgba(74,138,58,0.08)] p-6 mb-6 text-left">
            <p className="text-[0.78rem] tracking-[0.2em] uppercase text-green-400 mb-1">
              Reservation Confirmed
            </p>
            <p className="text-(--white) text-[0.9rem]">
              Booking ID: <span className="font-jp text-(--gold-light)">{bookingId}</span>
            </p>
            <p className="text-(--muted) text-[0.8rem] mt-1">
              We'll reach out on WhatsApp to confirm your table.
            </p>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="border border-[rgba(192,57,43,0.4)] bg-[rgba(192,57,43,0.08)] p-4 mb-6 text-left">
            <p className="text-(--red-light) text-[0.85rem]">
              Something went wrong. Please try again or call us directly.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-left">
          <div className="flex flex-col gap-2">
            <label className="text-[0.62rem] tracking-[0.25em] uppercase text-(--muted)">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange}
              className={inputClass} placeholder="Arjun Sharma" required />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.62rem] tracking-[0.25em] uppercase text-(--muted)">Phone / WhatsApp</label>
            <input name="phone" value={form.phone} onChange={handleChange}
              className={inputClass} placeholder="+91 98765 43210" required />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.62rem] tracking-[0.25em] uppercase text-(--muted)">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange}
              min={today} className={inputClass} required />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.62rem] tracking-[0.25em] uppercase text-(--muted)">Time</label>
            <select name="time" value={form.time} onChange={handleChange} className={inputClass} required>
              <option value="">Select time</option>
              {['12:00 PM','1:00 PM','2:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM','11:00 PM','12:00 AM'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.62rem] tracking-[0.25em] uppercase text-(--muted)">Guests</label>
            <select name="guests" value={form.guests} onChange={handleChange} className={inputClass} required>
              <option value="">Select</option>
              {['1 person','2 people','3 people','4 people','5 to 6 people','7+ people'].map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.62rem] tracking-[0.25em] uppercase text-(--muted)">Occasion (optional)</label>
            <select name="occasion" value={form.occasion} onChange={handleChange} className={inputClass}>
              <option value="">None</option>
              {['Birthday','Anniversary','Business dinner','Date night'].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="col-span-2 py-4 bg-(--red) text-(--white) text-[0.75rem] tracking-[0.3em] uppercase hover:bg-(--red-light) transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
          >
            {status === 'loading' ? 'Sending...' : 'Confirm Reservation →'}
          </button>
        </form>
      </div>
    </section>
  )
}