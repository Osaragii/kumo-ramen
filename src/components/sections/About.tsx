'use client'

import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="grid md:grid-cols-2 gap-16 md:gap-24 items-center px-[5vw] py-24 border-t border-(--border)"
    >
      {/* Visual */}
      <div className="reveal relative aspect-3/4">
        <div
          className="absolute inset-0 border border-(--border) flex items-center justify-center overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(192,57,43,0.12) 0%, transparent 50%), var(--bg3)',
          }}
        >
          <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64">
            <ellipse cx="130" cy="215" rx="85" ry="12" fill="rgba(0,0,0,0.4)"/>
            <path d="M 45 140 Q 50 210 130 215 Q 210 210 215 140 Z" fill="#1a0f0f" stroke="#c9a84c" strokeWidth="1.5"/>
            <ellipse cx="130" cy="140" rx="85" ry="22" fill="#200f0f" stroke="#c9a84c" strokeWidth="1.5"/>
            <ellipse cx="130" cy="140" rx="78" ry="18" fill="#6b2020" opacity="0.8"/>
            <ellipse cx="110" cy="135" rx="30" ry="7" fill="rgba(201,168,76,0.15)"/>
            <path d="M 70 138 Q 90 128 110 138 Q 130 148 150 138 Q 170 128 190 138" stroke="#e8c97a" strokeWidth="2" fill="none" opacity="0.7"/>
            <path d="M 65 142 Q 85 135 105 142 Q 125 149 145 142 Q 165 135 185 142" stroke="#e8c97a" strokeWidth="1.5" fill="none" opacity="0.5"/>
            <ellipse cx="105" cy="138" rx="18" ry="10" fill="#8b3a1a" stroke="#c0392b" strokeWidth="1"/>
            <circle cx="152" cy="136" r="13" fill="#f5d78e" stroke="#c9a84c" strokeWidth="1"/>
            <circle cx="152" cy="136" r="8" fill="#e8a030" opacity="0.7"/>
            <rect x="168" y="128" width="8" height="22" rx="1" fill="#1a2a1a" stroke="#2d4a2d" strokeWidth="0.5" transform="rotate(-5, 172, 139)"/>
            <circle cx="90" cy="133" r="2" fill="#4a8a3a" opacity="0.8"/>
            <circle cx="96" cy="131" r="1.5" fill="#4a8a3a" opacity="0.8"/>
            <circle cx="135" cy="144" r="2" fill="#4a8a3a" opacity="0.8"/>
            <path d="M 100 120 Q 105 110 100 100 Q 95 90 100 80" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" strokeLinecap="round">
              <animate attributeName="opacity" values="0.15;0.4;0.15" dur="3s" repeatCount="indefinite"/>
            </path>
            <path d="M 130 118 Q 136 105 130 92 Q 124 79 130 68" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" strokeLinecap="round">
              <animate attributeName="opacity" values="0.12;0.35;0.12" dur="4s" repeatCount="indefinite"/>
            </path>
            <path d="M 160 122 Q 154 112 160 100 Q 166 88 160 78" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeLinecap="round">
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3.5s" repeatCount="indefinite"/>
            </path>
            <line x1="80" y1="110" x2="175" y2="145" stroke="#8b6914" strokeWidth="3" strokeLinecap="round"/>
            <line x1="85" y1="105" x2="180" y2="140" stroke="#a07820" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        {/* Accent border */}
        <div className="absolute -bottom-6 -right-6 w-[60%] h-[60%] border border-[rgba(192,57,43,0.2)] pointer-events-none" />
      </div>

      {/* Text */}
      <div className="reveal relative">
        <p className="text-[0.68rem] tracking-[0.4em] uppercase text-(--red) mb-3">
          Our Story
        </p>
        <h2 className="font-jp text-[clamp(2rem,4vw,3rem)] font-normal text-(--white) leading-snug mb-6">
          A Den Beneath<br />the Mumbai Rain
        </h2>
        <p className="text-[0.95rem] leading-[1.9] text-[rgba(240,235,227,0.65)] mb-5">
          Kumo — meaning "cloud" in Japanese — was born from one obsession: the perfect bowl.
          Our head chef Hiroshi Tanaka spent seven years in Fukuoka perfecting a tonkotsu broth
          that simmers for 18 hours straight, coaxing deep umami from pork bones, kelp, and time.
        </p>
        <p className="text-[0.95rem] leading-[1.9] text-[rgba(240,235,227,0.65)]">
          Tucked into the lanes of Bandra West, we've brought that rainy-Tokyo alley spirit to
          Mumbai. Open until 2AM, Kumo is where the night shift finds warmth and the city never
          quite sleeps.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-(--border)">
          {[
            { number: '18', label: 'Hours broth simmers' },
            { number: '4',  label: 'Signature broths'    },
            { number: '2AM', label: 'Last orders'        },
          ].map(({ number, label }) => (
            <div key={label} className="text-center">
              <span className="font-jp text-[2rem] text-(--gold-light) block">{number}</span>
              <span className="text-[0.68rem] tracking-[0.15em] uppercase text-(--muted) mt-1 block">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}