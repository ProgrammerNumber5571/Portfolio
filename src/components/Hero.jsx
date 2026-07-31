import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { profile, stats } from '../data/content'

/** Counts up to `value` once the element scrolls into view. */
function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 1400
    let frame
    let start

    const tick = (now) => {
      start ??= now
      const progress = Math.min((now - start) / duration, 1)
      // ease-out cubic so it decelerates into the final number
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span ref={ref} className="display text-[clamp(1.9rem,4vw,2.8rem)] text-fg">
      {display}
      <span className="text-accent-soft">{suffix}</span>
    </span>
  )
}

/**
 * Vite rewrites root-relative URLs in HTML and CSS, but not ones written as JS
 * strings — so a `/photo.jpg` in content.js would point at the domain root and
 * 404 on a project Pages site. Prefix it with the configured base ourselves.
 * Absolute URLs (https://…) and relative paths are passed through untouched.
 */
function resolveAsset(path) {
  if (!path || !path.startsWith('/')) return path
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`
}

const rise = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  // A wrong avatar path would otherwise render as a silent empty box.
  const [avatarFailed, setAvatarFailed] = useState(false)

  useEffect(() => {
    if (profile.roles.length < 2) return
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % profile.roles.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" className="relative pt-32 sm:pt-40 lg:pt-44">
      <div className="shell">
        {/* Status strip */}
        <motion.div
          {...rise(0.1)}
          className="mb-10 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            {profile.available && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-spark" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-spark" />
              </span>
            )}
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg/75">
              {profile.available ? 'Available for work' : 'Currently booked'}
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {profile.location}
          </span>
        </motion.div>

        {/* Name + rotating role, full shell width so nothing gets clipped */}
        <motion.p {...rise(0.18)} className="mb-3 font-sans text-lg font-light text-muted">
          Hello — I&apos;m
        </motion.p>

        <motion.h1
          {...rise(0.26)}
          className="display text-gradient text-[clamp(2.2rem,7.4vw,5.5rem)]"
        >
          {profile.name}
        </motion.h1>

        <motion.div {...rise(0.34)} className="mt-4 flex items-center gap-3 sm:gap-4">
          <span className="shrink-0 font-sans text-[clamp(0.95rem,1.8vw,1.25rem)] font-light text-muted">
            A
          </span>
          {/* The clip track carries the role's own font-size so `em` height
              resolves against it — not against the inherited 16px body size.
              1.45em clears Poppins' full font box (~1.42em), so roles with
              descenders or diacritics don't get their tails shaved off. */}
          <span className="display relative block h-[1.45em] min-w-0 flex-1 overflow-hidden text-[clamp(1.25rem,4.4vw,3.25rem)]">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                exit={{ y: '-110%' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center whitespace-nowrap leading-none text-accent-soft"
              >
                {profile.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        {/* Tagline + CTAs beside the portrait plate */}
        <div className="mt-14 grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div {...rise(0.44)}>
            <p className="max-w-lg text-[15px] leading-relaxed text-muted">{profile.tagline}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn-primary group">
                See my work
                <ArrowDownRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
              <a href="#contact" className="btn-ghost group">
                Get in touch
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[320px] lg:ml-auto lg:mr-0"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] bg-accent/10 blur-3xl" />
            <div className="card relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              {profile.avatar && !avatarFailed ? (
                <img
                  src={resolveAsset(profile.avatar)}
                  alt={`Portrait of ${profile.name}`}
                  width="400"
                  height="500"
                  onError={() => setAvatarFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-to-br from-white/[0.06] to-transparent">
                  <span className="display text-[5.5rem] text-outline">{profile.initials}</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-white/[0.07] bg-ink-950/70 px-5 py-4 backdrop-blur-md">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Open to
                  </p>
                  <p className="font-display text-[13px] font-semibold uppercase tracking-wider">
                    Freelance &amp; contract
                  </p>
                </div>
                <span className="animate-float shrink-0 text-accent-soft">
                  <ArrowDownRight size={20} />
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stat row */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-5 bg-ink-950/60 px-6 py-7 backdrop-blur-sm"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="whitespace-pre-line font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
