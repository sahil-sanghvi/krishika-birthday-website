import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, Sparkles } from 'lucide-react'
import { content } from '../data/content'
import PlaceholderImage from './PlaceholderImage'
import Reveal from './Reveal'
import { useReducedMotion } from '../hooks/useReducedMotion'

// 'button' -> 'prompt' (enter password) -> 'unlocked' (reveal)
export default function FinalMessage() {
  const [stage, setStage] = useState('button')
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const reduced = useReducedMotion()
  const { closing } = content.finalMessage
  const surprise = content.surprise

  function handleSubmit(e) {
    e.preventDefault()
    if (input.trim() === surprise.password) {
      setStage('unlocked')
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <section id="final" className="bg-gradient-to-b from-cream to-blush/20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="font-display text-3xl text-terracotta sm:text-4xl">{closing}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          {stage === 'button' && (
            <button
              onClick={() => setStage('prompt')}
              className="inline-flex items-center gap-2 rounded-full border border-terracotta/40 px-6 py-3 font-body text-sm text-terracotta transition-colors hover:bg-terracotta/10"
            >
              <Sparkles size={16} />
              {surprise.buttonLabel}
            </button>
          )}

          {stage === 'prompt' && (
            <motion.form
              onSubmit={handleSubmit}
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto flex max-w-xs flex-col items-center gap-3"
            >
              <p className="flex items-center gap-2 font-body text-sm text-plum/70">
                <Lock size={14} />
                This one needs a password
              </p>
              <input
                type="password"
                inputMode="numeric"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  setError(false)
                }}
                autoFocus
                placeholder="Enter password"
                className={`w-full rounded-full border bg-white px-5 py-2.5 text-center font-body text-sm text-plum outline-none transition-colors ${
                  error ? 'border-red-400' : 'border-plum/15 focus:border-terracotta'
                }`}
              />
              {error && (
                <p className="font-body text-xs text-red-500">Not quite — try again.</p>
              )}
              <button
                type="submit"
                className="rounded-full bg-terracotta px-6 py-2 font-body text-sm text-cream transition-colors hover:bg-terracotta/90"
              >
                Unlock
              </button>
            </motion.form>
          )}

          {stage === 'unlocked' && (
            <AnimatePresence>
              <motion.div
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-md rounded-2xl bg-white/80 p-8 shadow-md ring-1 ring-plum/5"
              >
                <h3 className="font-display text-xl text-plum">{surprise.revealTitle}</h3>
                <div className="mx-auto mt-5 h-40 w-40 overflow-hidden rounded-full">
                  <PlaceholderImage
                    src={surprise.photo}
                    alt="A spider saying goodbye"
                    label="[Add the spider photo here]"
                    className="h-full w-full"
                  />
                </div>
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
