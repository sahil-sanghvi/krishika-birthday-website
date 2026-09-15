import { content } from '../data/content'
import { childhoodPhotos } from '../data/childhood'
import PlaceholderImage from './PlaceholderImage'
import Reveal from './Reveal'

// Deterministic slight rotation per card index, alternating left/right.
// Photos render at their real aspect ratio (fit="natural") in a masonry
// layout — no forced square/portrait crop, so nobody's head gets cut off.
const ROTATIONS = [-2, 1.5, -1, 2.5, -2.5, 1]

export default function ChildhoodGallery() {
  return (
    <section id="childhood" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mb-14 text-center">
        <h2 className="font-display text-3xl text-plum sm:text-5xl">
          {content.childhood.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-plum/70">
          {content.childhood.intro}
        </p>
      </Reveal>

      <div className="columns-2 gap-4 sm:columns-3 sm:gap-6">
        {childhoodPhotos.map((photo, i) => (
          <Reveal key={i} delay={i * 0.08} className="mb-4 break-inside-avoid sm:mb-6">
            <figure
              className="group rotate-card rounded-lg bg-white p-2.5 pb-8 shadow-lg transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.03] sm:pb-10"
              style={{ '--rot': `${ROTATIONS[i % ROTATIONS.length]}deg` }}
            >
              <div className="relative overflow-hidden rounded">
                <PlaceholderImage
                  src={photo.image}
                  alt={photo.caption}
                  label={photo.caption}
                  fit="natural"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                {photo.year && (
                  <span className="absolute right-2 top-2 rounded-full bg-plum/70 px-2 py-0.5 font-body text-[11px] text-cream">
                    {photo.year}
                  </span>
                )}
              </div>
              <figcaption className="mt-2 line-clamp-2 px-1 text-center font-body text-xs text-plum/70">
                {photo.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
