import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { content } from '../data/content'
import PlaceholderImage from './PlaceholderImage'
import Reveal from './Reveal'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function FinalMessage() {
  const [revealed, setRevealed] = useState(false)
  const reduced = useReducedMotion()
  const { heading, body, closing, photo } = content.finalMessage
  const surprise = content.surprise

  return (
    <section id="final" className="bg-gradient-to-b from-cream to-blush/20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="font-display text-3xl text-plum sm:text-5xl">{heading}</h2>
          <p className="mx-auto mt-6 whitespace-pre-line font-body text-base leading-relaxed text-plum/75 sm:text-lg">
            {body}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 h-64 w-52 overflow-hidden rounded-xl shadow-xl sm:h-80 sm:w-64">
          <PlaceholderImage
            src={photo}
            alt="Krishika"
            label="[FINAL PHOTO — add a favorite photo of Krishika here]"
            className="h-full w-full"
          />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 font-display text-3xl text-terracotta sm:text-4xl">{closing}</p>
        </Reveal>

        <Reveal delay={0.3} className="mt-16">
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="inline-flex items-center gap-2 rounded-full border border-terracotta/40 px-6 py-3 font-body text-sm text-terracotta transition-colors hover:bg-terracotta/10"
            >
              <Sparkles size={16} />
              {surprise.buttonLabel}
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-md rounded-2xl bg-white/80 p-8 shadow-md ring-1 ring-plum/5"
              >
                <h3 className="font-display text-xl text-plum">{surprise.revealTitle}</h3>
                {surprise.photo && (
                  <div className="mx-auto mt-5 h-40 w-40 overflow-hidden rounded-full">
                    <PlaceholderImage
                      src={surprise.photo}
                      alt="Surprise"
                      label="[SURPRISE PHOTO]"
                      className="h-full w-full"
                    />
                  </div>
                )}
                <p className="mt-4 whitespace-pre-line font-body text-sm leading-relaxed text-plum/75">
                  {surprise.revealBody}
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </Reveal>
      </div>
    </section>
  )
}
