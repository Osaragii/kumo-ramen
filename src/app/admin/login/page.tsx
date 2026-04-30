'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.ok) {
      router.push('/admin')
    } else {
      setError('Invalid email or password.')
      setLoading(false)
    }
  }

  const inputClass = `
    w-full bg-[var(--bg3)] border border-[var(--border)] text-[var(--white)]
    px-4 py-3 text-[0.85rem] outline-none focus:border-[var(--gold)]
    transition-colors duration-300 placeholder:text-[var(--muted)]
  `

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg)' }}>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-jp text-4xl text-(--gold-light)">雲ラーメン</p>
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-(--muted) mt-2">
            Admin Portal
          </p>
          <div className="w-8 h-px bg-(--gold) mx-auto mt-4" />
        </div>

        {/* Card */}
        <div className="border border-(--border) p-8" style={{ background: 'var(--bg2)' }}>
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-(--muted) mb-6">
            Sign in to continue
          </p>

          {error && (
            <div className="border border-[rgba(192,57,43,0.4)] bg-[rgba(192,57,43,0.08)] px-4 py-3 mb-5 text-[0.8rem] text-(--red-light)">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[0.62rem] tracking-[0.25em] uppercase text-(--muted)">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="admin@kumoramen.com"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.62rem] tracking-[0.25em] uppercase text-(--muted)">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3 bg-(--red) text-(--white) text-[0.75rem] tracking-[0.25em] uppercase hover:bg-(--red-light) transition-colors duration-300 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p className="text-center text-[0.65rem] text-(--muted) mt-6 tracking-wide">
          Kumo Ramen · Staff only
        </p>
      </div>
    </div>
  )
}