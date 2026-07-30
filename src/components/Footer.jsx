import { ArrowUp, Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import { profile, socials } from '../data/content'

const icons = { github: Github, linkedin: Linkedin, twitter: Twitter, instagram: Instagram }

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] pt-16">
      <div className="shell">
        <div className="flex flex-wrap items-start justify-between gap-10 pb-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              Let&apos;s build something
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="display mt-3 block text-[clamp(1.6rem,4vw,2.6rem)] transition-colors hover:text-accent-soft"
            >
              {profile.email}
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">Social</p>
            <div className="flex gap-2.5">
              {socials.map((social) => {
                const Icon = icons[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
                  >
                    {Icon ? <Icon size={16} /> : social.label[0]}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] py-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            © {new Date().getFullYear()} {profile.name} — Designed &amp; built in-house
          </p>
          <a
            href="#home"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
          >
            Back to top
            <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge */}
      <p
        aria-hidden
        className="display pointer-events-none select-none whitespace-nowrap text-center text-[clamp(4rem,17vw,13rem)] leading-[0.8] text-outline opacity-40"
        style={{ marginBottom: '-0.22em' }}
      >
        {profile.name}
      </p>
    </footer>
  )
}
