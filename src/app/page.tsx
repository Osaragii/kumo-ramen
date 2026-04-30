import Navbar     from '@/components/layout/Navbar'
import Footer     from '@/components/layout/Footer'
import Hero       from '@/components/sections/Hero'
import About      from '@/components/sections/About'
import Menu       from '@/components/sections/Menu'
import Experience from '@/components/sections/Experience'
import ReserveForm from '@/components/sections/ReserveForm'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Experience />
        <ReserveForm />
      </main>
      <Footer />
    </>
  )
}