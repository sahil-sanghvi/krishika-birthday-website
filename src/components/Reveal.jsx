import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Fade-up-on-scroll wrapper. Becomes an instant, static render when the
 * viewer has requested reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
  as: Component = motion.div,
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  )
}
