import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { content } from '../data/content'
import { friends } from '../data/friends'
import PlaceholderImage from './PlaceholderImage'
import Reveal from './Reveal'

export default function FriendCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi])

  const onSelect = useCallback((api) => {
    setSelectedIndex(api.selectedScrollSnap())
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollNext()
    }
  }

  return (
    <section id="friends" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <h2 className="font-display text-3xl text-plum sm:text-5xl">
            {content.friends.heading}
          </h2>
        </Reveal>

        <div
          className="relative outline-none"
          tabIndex={0}
          role="region"
          aria-label="Friend birthday messages carousel"
          onKeyDown={handleKeyDown}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4 flex sm:-ml-6">
              {friends.map((friend, i) => (
                <div
                  key={i}
                  className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] sm:pl-6 lg:flex-[0_0_33.333%]"
                >
                  <FriendCard friend={friend} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              aria-label="Previous friend"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-plum shadow-md transition-opacity disabled:opacity-30 hover:bg-blush/30"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === selectedIndex ? 'w-6 bg-terracotta' : 'w-2 bg-plum/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              disabled={!canNext}
              aria-label="Next friend"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-plum shadow-md transition-opacity disabled:opacity-30 hover:bg-blush/30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FriendCard({ friend }) {
  return (
    <article className="flex h-full flex-col items-center rounded-2xl bg-white p-7 text-center shadow-md ring-1 ring-plum/5">
      <div className="mb-4 h-20 w-20 overflow-hidden rounded-full ring-4 ring-gold/30">
        <PlaceholderImage
          src={friend.image}
          alt={friend.name}
          label={`[${friend.name}'s photo]`}
          className="h-full w-full"
        />
      </div>
      <h3 className="font-display text-lg text-plum">{friend.name}</h3>
      {friend.relationship && (
        <p className="mb-3 font-body text-[11px] uppercase tracking-wide text-terracotta">
          {friend.relationship}
        </p>
      )}
      <p className="font-body text-sm italic leading-relaxed text-plum/75">
        "{friend.message}"
      </p>
    </article>
  )
}
