import Reveal, { StackedHeading } from './Reveal'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal className="eyebrow mb-8">Career</Reveal>

        <Reveal>
          <StackedHeading top="Years of" bottom="Experience" />
        </Reveal>

        <div className="mt-14 space-y-4">
          {experience.map((job, i) => (
            <Reveal key={job.role + job.period} delay={0.07 * i}>
              <article className="card group relative overflow-hidden p-7 transition-colors duration-500 hover:border-accent/25 sm:p-9">
                {/* Left rail fills in on hover */}
                <span className="absolute inset-y-0 left-0 w-px bg-white/10">
                  <span className="block h-0 w-px bg-accent transition-all duration-500 group-hover:h-full" />
                </span>

                <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-semibold">{job.role}</h3>
                      {job.current && (
                        <span className="rounded-full bg-spark/[0.15] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-spark">
                          Now
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-accent-soft">{job.company}</p>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                      {job.body}
                    </p>
                  </div>

                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:text-right">
                    {job.period}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
