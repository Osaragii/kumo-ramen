export default function Footer() {
  return (
    <footer className="border-t border-(--border) px-[5vw] py-10 flex flex-wrap justify-between items-center gap-6">
      <div className="font-jp text-(--gold) text-lg">
        雲ラーメン
        <span className="block font-sans font-light text-[0.62rem] tracking-[0.3em] text-(--muted) uppercase mt-1">
          Kumo Ramen · Bandra West, Mumbai
        </span>
      </div>

      <ul className="flex gap-8 list-none">
        {[
          { label: 'About',     href: '#about'   },
          { label: 'Menu',      href: '#menu'    },
          { label: 'Reserve',   href: '#reserve' },
          { label: 'Instagram', href: 'https://instagram.com' },
        ].map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-[0.7rem] tracking-[0.15em] uppercase text-(--muted) hover:text-(--gold-light) transition-colors duration-300 no-underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <p className="text-[0.68rem] tracking-wide text-(--muted) opacity-50">
        © 2024 Kumo Ramen. All rights reserved.
      </p>
    </footer>
  )
}