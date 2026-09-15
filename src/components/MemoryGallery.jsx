import { useState } from 'react'
import { content } from '../data/content'
import { memories } from '../data/memories'
import PlaceholderImage from './PlaceholderImage'
import Reveal from './Reveal'
import Lightbox from './Lightbox'

export default function MemoryGallery() {
  const [activeIndex, setActiveIndex] = useState(null)

  const slides = memories.map((m) => ({
    src: m.image,
    alt: m.category ? `${m.category} photo` : 'Memory photo',
    description: m.category,
  }))

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mb-14 text-center">
        <h2 className="font-display text-3xl text-plum sm:text-5xl">
          {content.gallery.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-plum/70">{content.gallery.intro}</p>
      </Reveal>

      <div className="columns-2 gap-4 sm:columns-3 sm:gap-5">
        {memories.map((memory, i) => (
          <Reveal key={i} delay={(i % 6) * 0.06} className="mb-4 break-inside-avoid sm:mb-5">
            <button
              onClick={() => setActiveIndex(i)}
              className="group block w-full overflow-hidden rounded-lg shadow-sm ring-1 ring-plum/5"
              aria-label={`Open photo${memory.category ? `: ${memory.category}` : ''}`}
            >
              <PlaceholderImage
                src={memory.image}
                alt={memory.category ? `${memory.category} photo` : 'Memory photo'}
                label="[Memory photo]"
                fit="natural"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox index={activeIndex} onClose={() => setActiveIndex(null)} slides={slides} />
    </section>
  )
}
