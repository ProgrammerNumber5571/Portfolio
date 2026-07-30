import { motion } from 'framer-motion'

/**
 * Scroll-triggered entrance used by every section, so timing stays consistent.
 */
export default function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/** Stacked-heading helper: solid first line, outlined second line. */
export function StackedHeading({ top, bottom, className = '' }) {
  return (
    <h2 className={`display text-[clamp(2.4rem,7vw,4.6rem)] ${className}`}>
      <span className="block">{top}</span>
      <span className="block text-outline">{bottom}</span>
    </h2>
  )
}
