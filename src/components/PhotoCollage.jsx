import { content } from '../data/content'
import { friends } from '../data/friends'
import PlaceholderImage from './PlaceholderImage'
import Reveal from './Reveal'

// A big, dense wall of friend photos rather than a carousel of quotes — no
// messages here on purpose. Slight rotations echo the childhood gallery's
// scrapbook feel; hovering straightens the photo and reveals the name.
const ROTATIONS = [-3, 2, -1.5, 3, -2.5, 1.5, -2, 2.5]
const ASPECTS = [
  'aspect-square',
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[5/4]',
]

export default function PhotoCollage() {
  return (
    <section id="friends" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mb-14 text-center">
        <h2 className="font-display text-3xl text-plum sm:text-5xl">
          {content.friends.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-plum/70">
          {content.friends.intro}
        </p>
      </Reveal>

      <div className="columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4">
        {friends.map((friend, i) => (
          <Reveal
            key={i}
            delay={(i % 8) * 0.05}
            className="mb-4 break-inside-avoid sm:mb-5"
          >
            <div
              className={`group rotate-card relative overflow-hidden rounded-lg bg-white p-1.5 shadow-md transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-105 ${ASPECTS[i % ASPECTS.length]}`}
              style={{ '--rot': `${ROTATIONS[i % ROTATIONS.length]}deg` }}
            >
              <div className="relative h-full w-full overflow-hidden rounded">
                <PlaceholderImage
                  src={friend.image}
                  alt={friend.name}
                  label={`[${friend.name}'s photo]`}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-plum/80 to-transparent px-3 py-2 font-body text-xs text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {friend.name}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
