'use client'

import { useEffect, useRef } from 'react'

const features = [
  { num: '01', title: '18-Hour Broth',     desc: 'Every morning at 4AM, the bones go in. No shortcuts. The soul of a bowl is its broth.'           },
  { num: '02', title: 'Late Night Kitchen', desc: 'Open until 2AM because good food doesn\'t care what time it is. Night owls welcome.'              },
  { num: '03', title: 'Imported Noodles',  desc: 'Sun Noodle Co. noodles flown in from Tokyo. The bite, the texture — it matters.'                   },
  { num: '04', title: 'Omakase Ramen',     desc: 'On Fridays, let our chef decide your bowl based on the day\'s freshest ingredients.'              },
]

const hours = [
  { day: 'Monday – Thursday', time: '12:00 PM – 12:00 AM', closed: false },
  { day: 'Friday – Saturday', time: '12:00 PM – 2:00 AM',  closed: false },
  { day: 'Sunday',            time: '1:00 PM – 11:00 PM',  closed: false },
  { day: 'Tuesday',           time: 'Closed · Rest Day',   closed: true  },
]

export default function Experience() {
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
      id="hours"
      ref={sectionRef}
      className="grid md:grid-cols-2 border-t border-(--border) px-[5vw] py-24 gap-0"
    >
      {/* Left — Features */}
      <div className="reveal md:pr-16 md:border-r border-(--border) pb-16 md:pb-0">
        <p className="text-[0.68rem] tracking-[0.4em] uppercase text-(--red) mb-3">
          The Experience
        </p>
        <h2 className="font-jp text-[clamp(2rem,4vw,3rem)] font-normal text-(--white) mb-8">
          Why Kumo<br />Is Different
        </h2>

        <div>
          {features.map(({ num, title, desc }) => (
            <div key={num} className="flex gap-5 py-5 border-b border-(--border) last:border-b-0">
              <span className="text-[0.68rem] text-(--red) tracking-wide pt-0.5 shrink-0 font-mono">
                {num}
              </span>
              <div>
                <h4 className="font-jp text-[0.95rem] font-normal text-(--white) mb-1">{title}</h4>
                <p className="text-[0.78rem] text-(--muted) leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Hours & Location */}
      <div className="reveal md:pl-16 pt-16 md:pt-0">
        <p className="text-[0.68rem] tracking-[0.4em] uppercase text-(--red) mb-3">
          Hours & Location
        </p>
        <h2 className="font-jp text-[clamp(2rem,4vw,3rem)] font-normal text-(--white) mb-8">
          Find Us
        </h2>

        {/* Hours */}
        <div className="border border-(--border) p-6 mb-4" style={{ background: 'var(--bg3)' }}>
          {hours.map(({ day, time, closed }) => (
            <div key={day} className="flex justify-between py-2.5 text-[0.85rem] border-b border-[rgba(201,168,76,0.08)] last:border-b-0">
              <span className="text-(--muted)">{day}</span>
              <span className={closed ? 'text-(--red) opacity-60' : 'text-(--white)'}>
                {time}
              </span>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="border border-(--border) p-6" style={{ background: 'var(--bg3)' }}>
          <span className="block text-[0.62rem] tracking-[0.3em] uppercase text-(--gold) mb-3">
            Address
          </span>
          <address className="not-italic text-[0.88rem] leading-loose text-[rgba(240,235,227,0.65)]">
            14, Union Park Lane<br />
            Off Carter Road, Bandra West<br />
            Mumbai – 400050<br />
            Maharashtra, India
          </address>
          
          <a
            href="tel:+919876543210"
            className="block mt-4 text-(--gold-light) text-[0.88rem] tracking-wide no-underline hover:text-(--white) transition-colors duration-300"
          >
            +91 98765 43210
          </a>
        </div>
      </div>
    </section>
  )
}