'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-5 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(8,8,8,0.92)] backdrop-blur-md border-b border-(--border)'
          : 'border-b border-transparent'
      }`}
    >
      {/* Logo */}
      <div className="font-jp text-(--gold-light) text-xl leading-tight">
        雲ラーメン
        <span className="block text-(--white) text-[0.65rem] tracking-[0.25em] font-sans font-light mt-0.5">
          Kumo Ramen · Bandra West
        </span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-10 list-none">
        {['About', 'Menu', 'Hours', 'Reserve'].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="text-(--muted) text-[0.75rem] tracking-[0.2em] uppercase hover:text-(--gold-light) transition-colors duration-300 no-underline"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#reserve"
        className="px-5 py-2 border border-(--gold) text-(--gold) text-[0.72rem] tracking-[0.2em] uppercase hover:bg-(--gold) hover:text-(--bg) transition-all duration-300 no-underline"
      >
        Reserve a Table
      </a>
    </nav>
  )
}