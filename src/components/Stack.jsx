import Reveal, { StackedHeading } from './Reveal'
import { stack } from '../data/content'

export default function Stack() {
  return (
    <section id="stack" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal className="eyebrow mb-8">Toolbox</Reveal>

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <StackedHeading top="Tech" bottom="Stack" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
              The tools I reach for daily. I&apos;m happy to learn yours — the fundamentals travel.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2.5">
              {stack.map((item, i) => (
                <span
                  key={item}
                  style={{ transitionDelay: `${i * 8}ms` }}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 font-mono text-[12px] uppercase tracking-wider text-fg/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.08] hover:text-fg"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
