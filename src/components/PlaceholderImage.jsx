import { useState } from 'react'
import { Camera } from 'lucide-react'

// Warm gradient pairs to cycle through so a page full of placeholders still
// feels varied rather than one flat block repeated everywhere.
const GRADIENTS = [
  'from-blush to-terracotta',
  'from-rose to-gold',
  'from-terracotta to-blush',
  'from-gold to-rose',
  'from-blush to-rose',
]

function gradientFor(seed = '') {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return GRADIENTS[hash % GRADIENTS.length]
}

/**
 * Renders `src` when it loads successfully; otherwise (or when `src` is
 * empty) falls back to a soft gradient placeholder so a missing photo never
 * breaks the layout.
 *
 * `fit`:
 *  - 'cover' (default) — fills a fixed-size container, cropping to match.
 *    Use for deliberately-framed spots (hero circle, family square photo).
 *  - 'natural' — no forced box or crop; the image renders at its own aspect
 *    ratio at the container's width. Use for photo-wall/masonry layouts so
 *    real candid photos are never cropped into someone's face.
 */
export default function PlaceholderImage({
  src,
  alt = '',
  label,
  className = '',
  imgClassName = '',
  fit = 'cover',
}) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed

  if (showPlaceholder) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${gradientFor(
          label || alt,
        )} text-cream/90 ${fit === 'natural' ? 'aspect-[4/5] w-full' : ''} ${className}`}
        role="img"
        aria-label={label || alt || 'Photo placeholder'}
      >
        <Camera className="h-7 w-7 opacity-80" strokeWidth={1.5} />
        {label && (
          <span className="px-4 text-center font-body text-xs leading-snug opacity-90">
            {label}
          </span>
        )}
      </div>
    )
  }

  if (fit === 'natural') {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className={`block h-auto w-full ${className} ${imgClassName}`}
        loading="lazy"
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`${className} ${imgClassName} object-cover`}
      loading="lazy"
    />
  )
}
