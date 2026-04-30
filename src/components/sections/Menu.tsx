'use client'

import { useEffect, useRef, useState } from 'react'

const menuData = {
  ramen: [
    { name: 'Kumo Tonkotsu',    jp: '雲豚骨ラーメン',      price: '₹650', badge: 'Signature', desc: '18-hour pork bone broth · chashu · soft egg · black garlic oil · nori' },
    { name: 'Karai Miso',       jp: '辛い味噌ラーメン',     price: '₹600', badge: 'Spicy',     desc: 'Red miso · chilli paste · ground pork · bamboo shoots · sesame'       },
    { name: 'Shoyu Black Garlic', jp: '醤油黒ニンニクラーメン', price: '₹620', badge: '',       desc: 'Clear soy broth · chicken chashu · menma · roasted black garlic'        },
    { name: 'Shiro Vegan',      jp: '白味噌ビーガンラーメン', price: '₹550', badge: 'Vegan',   desc: 'White miso · kombu dashi · king oyster mushroom · bok choy · yuzu'      },
    { name: 'Tori Paitan',      jp: '鶏白湯ラーメン',       price: '₹580', badge: '',          desc: 'Creamy chicken broth · chicken chashu · ginger · spring onion'          },
    { name: 'Yuzu Shio',        jp: '柚子塩ラーメン',       price: '₹720', badge: 'Seasonal',  desc: 'Light salt broth · yuzu citrus · sea bream · ikura · microgreens'       },
  ],
  sides: [
    { name: 'Gyoza',            jp: '餃子 · 6 pcs',         price: '₹320', badge: '',          desc: 'Pan-fried pork & cabbage dumplings · yuzu ponzu'                        },
    { name: 'Karaage Chicken',  jp: '唐揚げ · 5 pcs',       price: '₹380', badge: 'Fan Fav',   desc: 'Double-fried in ginger soy · Japanese mayo · shichimi'                  },
    { name: 'Takoyaki',         jp: 'たこ焼き · 6 pcs',     price: '₹360', badge: '',          desc: 'Octopus balls · bonito flakes · okonomiyaki sauce'                       },
    { name: 'Chashu Rice Bowl', jp: 'チャーシュー丼',        price: '₹420', badge: '',          desc: 'Slow-braised pork belly · seasoned egg · pickled ginger'                 },
  ],
  drinks: [
    { name: 'Yuzu Highball',    jp: '柚子ハイボール',        price: '₹480', badge: '',          desc: 'Japanese whisky · yuzu soda · shiso leaf'                               },
    { name: 'Umeshu Soda',      jp: '梅酒ソーダ',            price: '₹350', badge: '',          desc: 'Plum wine · sparkling water · pickled plum'                             },
    { name: 'Matcha Latte',     jp: '抹茶ラテ',              price: '₹280', badge: '',          desc: 'Ceremonial grade matcha · oat milk · adzuki bean'                        },
    { name: 'Ramune Float',     jp: 'ラムネフロート',         price: '₹260', badge: 'Non-Alc',  desc: 'Japanese ramune soda · vanilla ice cream · lychee'                       },
  ],
}

type TabKey = keyof typeof menuData

export default function Menu() {
  const [activeTab, setActiveTab] = useState<TabKey>('ramen')
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

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'ramen',  label: 'Ramen'  },
    { key: 'sides',  label: 'Sides'  },
    { key: 'drinks', label: 'Drinks' },
  ]

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="px-[5vw] py-24 border-t border-(--border)"
      style={{ background: 'var(--bg2)' }}
    >
      {/* Header */}
      <div className="reveal flex flex-wrap justify-between items-end gap-6 mb-14">
        <div>
          <p className="text-[0.68rem] tracking-[0.4em] uppercase text-(--red) mb-3">
            The Menu
          </p>
          <h2 className="font-jp text-[clamp(2rem,4vw,3rem)] font-normal text-(--white)">
            What We Serve
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex">
          {tabs.map(({ key, label }, i) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 text-[0.72rem] tracking-[0.2em] uppercase transition-all duration-300 border border-(--border) cursor-pointer
                ${i !== tabs.length - 1 ? 'border-r-0' : ''}
                ${activeTab === key
                  ? 'bg-(--red) text-(--white) border-(--red)'
                  : 'text-(--muted) hover:text-(--white)'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 border-t border-l border-(--border)">
        {menuData[activeTab].map((item) => (
          <div
            key={item.name}
            className="group relative flex justify-between items-start gap-4 p-8 border-b border-r border-(--border) hover:bg-[rgba(192,57,43,0.04)] transition-colors duration-300 overflow-hidden cursor-pointer"
          >
            {/* Left accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-(--red) scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

            <div>
              {item.badge && (
                <span className="inline-block px-2 py-0.5 mb-2 text-[0.58rem] tracking-[0.15em] uppercase bg-[rgba(192,57,43,0.2)] text-(--red-light)">
                  {item.badge}
                </span>
              )}
              <p className="font-jp text-[1rem] text-(--white) mb-1">{item.name}</p>
              <p className="text-[0.72rem] text-(--muted) tracking-wide mb-2">{item.jp}</p>
              <p className="text-[0.78rem] text-[rgba(240,235,227,0.4)] leading-relaxed">{item.desc}</p>
            </div>

            <span className="font-jp text-[1rem] text-(--gold-light) whitespace-nowrap shrink-0">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}