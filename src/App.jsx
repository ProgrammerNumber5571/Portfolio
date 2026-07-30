import { motion, useScroll, useSpring } from 'framer-motion'
import Backdrop from './components/Backdrop'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Experience from './components/Experience'
import Stack from './components/Stack'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <>
      <Backdrop />

      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-soft to-spark"
      />

      <Nav />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
