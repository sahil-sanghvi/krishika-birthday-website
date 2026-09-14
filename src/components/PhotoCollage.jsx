import { content } from '../data/content'
import { friends } from '../data/friends'
import PlaceholderImage from './PlaceholderImage'
import Reveal from './Reveal'

// A calm scattered wall, not a chaotic overlap — a subset of friend photos
// with gentle alternating offsets and rotations.
const OFFSETS = [
  'translate-y-0 rotate-[-3deg]',
  'translate-y-4 rotate-[2deg]',
  'translate-y-1 rotate-[-1deg]',
  'translate-y-5 rotate-[3deg]',
  '-translate-y-1 rotate-[1.5deg]',
  'translate-y-3 rotate-[-2deg]',
]

export default function PhotoCollage() {
  const featured = friends.slice(0, 12)

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <Reveal className="mb-10 text-center">
        <h3 className="font-display text-2xl text-plum sm:text-3xl">
          {content.collage.heading}
        </h3>
      </Reveal>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-5 lg:grid-cols-6">
        {featured.map((friend, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div
              className={`group aspect-square overflow-hidden rounded-lg bg-white p-1.5 shadow-md transition-transform duration-300 hover:z-10 hover:scale-110 hover:rotate-0 ${OFFSETS[i % OFFSETS.length]}`}
            >
              <PlaceholderImage
                src={friend.image}
                alt={friend.name}
                label={friend.name}
                className="h-full w-full rounded"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
