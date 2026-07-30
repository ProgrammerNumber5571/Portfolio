/**
 * Fixed page backdrop: grid lines, two accent glows and a film-grain overlay.
 * Purely decorative, so it stays out of the a11y tree and ignores pointer events.
 */
export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-60" />

      <div className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-accent/20 blur-[140px]" />
      <div className="absolute -right-32 top-[38%] h-[440px] w-[440px] rounded-full bg-accent-deep/[0.15] blur-[150px]" />
      <div className="absolute bottom-[-12%] left-1/3 h-[380px] w-[380px] rounded-full bg-spark/[0.07] blur-[130px]" />

      {/* Vignette keeps the glows from washing out the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#08070A_100%)]" />

      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
