import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav, profile } from '../data/content'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav item whose section is currently crossing the upper third.
  useEffect(() => {
    const sections = nav.map(({ href }) => document.querySelector(href)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.05, 0.3, 0.6] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll while the mobile sheet is open, and allow Escape to close.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-6"
      >
        <div className="shell">
          <div
            className={`flex items-center justify-between gap-4 rounded-full border px-4 py-3 transition-all duration-500 sm:px-5 ${
              scrolled
                ? 'border-white/10 bg-ink-950/80 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl'
                : 'border-transparent bg-transparent'
            }`}
          >
            <a href="#home" className="group flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-fg font-display text-[13px] font-bold text-ink-950 transition-colors group-hover:bg-accent group-hover:text-white">
                {profile.initials}
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-fg sm:block">
                {profile.email}
              </span>
            </a>

            <nav className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                    active === item.href ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {active === item.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden shrink-0 rounded-full bg-fg px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-950 transition-colors hover:bg-accent hover:text-white sm:block"
              >
                Hire me
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-fg transition-colors hover:border-accent/50 lg:hidden"
              >
                <Menu size={17} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/*
        Mobile sheet. Deliberately always mounted and toggled with CSS rather than
        AnimatePresence: an exit animation stalls whenever the tab is backgrounded
        (no rAF), which would leave a full-screen overlay stuck over the page
        swallowing every click. `invisible` also takes it out of the tab order.
      */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] bg-ink-950/95 backdrop-blur-xl transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'
        }`}
      >
        <div className="shell flex h-full flex-col pt-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              tabIndex={open ? 0 : -1}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-fg transition-colors hover:border-accent/50"
            >
              <X size={17} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 pb-24">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${60 * i + 80}ms` : '0ms' }}
                className={`display border-b border-white/[0.06] py-4 text-[2rem] text-fg/85 transition-all duration-500 hover:text-accent-soft ${
                  open ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
