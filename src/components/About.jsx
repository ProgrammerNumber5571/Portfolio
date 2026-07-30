import Reveal, { StackedHeading } from './Reveal'
import { profile, services } from '../data/content'

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal className="eyebrow mb-8">About me</Reveal>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <StackedHeading top="What" bottom="I do" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[17px] leading-relaxed text-fg/80">{profile.intro}</p>
            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              Currently freelancing from {profile.location} and open to product work, contracts and
              the occasional rescue mission on a codebase that got away from someone.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={0.08 * i}>
              <article className="card group h-full p-7 transition-colors duration-500 hover:border-accent/30 sm:p-9">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="display text-[1.6rem] tracking-normal">{service.title}</h3>
                    <p className="mt-2 text-sm text-accent-soft">{service.subtitle}</p>
                  </div>
                  <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                </div>

                <p className="text-[15px] leading-relaxed text-muted">{service.body}</p>

                <p className="mt-8 mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-muted/70">
                  Skillset &amp; tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.skills.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
