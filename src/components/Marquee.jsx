import { marquee } from '../data/content'

function Row({ items, reverse = false }) {
  // Rendered twice so the -50% keyframe loops seamlessly.
  const loop = [...items, ...items]

  return (
    <div className="marquee-mask flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-10 pr-10 ${
          reverse ? 'animate-marquee-rev' : 'animate-marquee'
        }`}
      >
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-10">
            <span className="display whitespace-nowrap text-[clamp(1.4rem,3.4vw,2.4rem)] text-fg/25 transition-colors hover:text-fg/70">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section aria-hidden className="border-y border-white/[0.06] py-10 sm:py-14">
      <div className="flex flex-col gap-5">
        <Row items={marquee} />
        <Row items={[...marquee].reverse()} reverse />
      </div>
    </section>
  )
}
