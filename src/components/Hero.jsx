import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { content } from '../data/content'
import PlaceholderImage from './PlaceholderImage'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const reduced = useReducedMotion()
  const { title, subtitle, photo } = content.hero

  const container = reduced
    ? {}
    : {
        initial: 'hidden',
        animate: 'visible',
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
        },
      }

  const item = reduced
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 18 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
        },
      }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-20 text-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blush/20 via-transparent to-cream" />

      <motion.div {...container} className="relative z-10 flex flex-col items-center">
        <motion.div {...item} className="mb-8 h-56 w-56 overflow-hidden rounded-full shadow-xl ring-4 ring-cream sm:h-72 sm:w-72">
          <PlaceholderImage
            src={photo}
            alt="Krishika"
            label="[HERO PHOTO — add Krishika's photo here]"
            className="h-full w-full"
          />
        </motion.div>

        <motion.h1 {...item} className="font-display text-4xl leading-tight text-plum sm:text-6xl">
          {title} <span aria-hidden>❤️</span>
        </motion.h1>

        <motion.p {...item} className="mt-5 max-w-md text-balance font-body text-base text-plum/70 sm:text-lg">
          {subtitle}
        </motion.p>
      </motion.div>

      <motion.button
        onClick={() =>
          document.getElementById('childhood')?.scrollIntoView({ behavior: 'smooth' })
        }
        aria-label="Scroll to next section"
        className={`absolute bottom-8 text-plum/50 ${reduced ? '' : 'animate-bounce-slow'}`}
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  )
}
