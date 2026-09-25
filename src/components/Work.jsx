import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Reveal, { StackedHeading } from './Reveal'
import { projects } from '../data/content'

export default function Work() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal className="eyebrow mb-8">Selected work</Reveal>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <StackedHeading top="Recent" bottom="Projects" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              A few things I&apos;ve designed, built and shipped. Case studies available on request.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-white/[0.07]">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={0.05 * i}>
              <a
                href={project.href}
                {...(/^https?:\/\//.test(project.href)
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative block border-b border-white/[0.07] py-8 transition-colors sm:py-10"
              >
                {/* Accent wash follows the hovered row */}
                <span
                  className="absolute inset-0 -mx-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:-mx-8"
                  style={{
                    background: `linear-gradient(90deg, ${project.accent}14, transparent 65%)`,
                  }}
                />

                <div className="relative grid gap-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8">
                  <span
                    className="font-mono text-[11px] tracking-widest transition-colors duration-300"
                    style={{ color: hovered === project.id ? project.accent : undefined }}
                  >
                    <span className={hovered === project.id ? '' : 'text-muted'}>
                      {project.id}
                    </span>
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="display text-[clamp(1.6rem,4vw,2.4rem)] transition-transform duration-500 group-hover:translate-x-1">
                        {project.name}
                      </h3>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                        {project.category}
                      </span>
                    </div>

                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                      {project.blurb}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[11px] text-muted">{project.year}</span>
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-fg transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:text-ink-950"
                      style={{
                        backgroundColor: hovered === project.id ? project.accent : 'transparent',
                      }}
                    >
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-14 flex flex-col items-center gap-5 text-center">
            <p className="display text-[clamp(1.4rem,3.4vw,2rem)] text-outline">
              Want to see more?
            </p>
            <a href="#contact" className="btn-ghost group">
              Explore all works
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
