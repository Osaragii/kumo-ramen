'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = contentRef.current?.querySelectorAll('[data-animate]')
    items?.forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'translateY(0)'
      }, 300 + i * 200)
    })
  }, [])

  const animateStyle = {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  }

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 60%, rgba(192,57,43,0.08) 0%, transparent 70%), #080808',
        }}
      />

      {/* Decorative circle */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 520, height: 520,
          border: '1px solid rgba(201,168,76,0.08)',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Vertical Japanese lines */}
      <div className="absolute right-[8vw] top-1/2 -translate-y-1/2 flex gap-6 opacity-10 pointer-events-none">
        {['本物の味', '深夜の麺', '魂の一杯'].map((text) => (
          <span
            key={text}
            className="font-jp text-(--gold) text-sm tracking-[0.3em]"
            style={{ writingMode: 'vertical-rl' }}
          >
            {text}
          </span>
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center">
        <p
          data-animate
          className="text-[0.7rem] tracking-[0.4em] uppercase text-(--muted) mb-4"
          style={animateStyle}
        >
          Bandra West, Mumbai · Est. 2024
        </p>

        <div
          data-animate
          className="font-jp text-[clamp(4rem,10vw,8rem)] font-bold text-(--gold-light) leading-none tracking-wider"
          style={animateStyle}
        >
          雲
        </div>

        <h1
          data-animate
          className="font-jp text-[clamp(2rem,5vw,3.5rem)] font-normal text-(--white) tracking-[0.3em] uppercase mt-2"
          style={animateStyle}
        >
          Kumo Ramen
        </h1>

        <div
          data-animate
          className="w-14 h-px bg-(--gold) mx-auto my-5"
          style={animateStyle}
        />

        <p
          data-animate
          className="text-[0.88rem] tracking-[0.15em] text-(--muted) italic"
          style={animateStyle}
        >
          "Where the broth never sleeps"
        </p>

        <div
          data-animate
          className="flex gap-4 justify-center mt-10"
          style={animateStyle}
        >
          <a
            href="#menu"
            className="px-8 py-3 bg-(--red) text-(--white) text-[0.75rem] tracking-[0.2em] uppercase hover:bg-(--red-light) hover:-translate-y-0.5 transition-all duration-300 no-underline"
          >
            View Menu
          </a>

          <a
            href="#reserve"
            className="px-8 py-3 border border-[rgba(240,235,227,0.25)] text-(--white) text-[0.75rem] tracking-[0.2em] uppercase hover:border-(--white) transition-all duration-300 no-underline"
          >
            Reserve a Table
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ ...animateStyle, transitionDelay: '1.5s' }}
        data-animate
      >
        <span className="text-[0.62rem] tracking-[0.3em] text-(--muted) uppercase">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-(--gold) to-transparent scroll-line" />
      </div>
    </section>
  )
}