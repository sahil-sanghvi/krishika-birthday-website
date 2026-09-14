// Ambient decorative balloons, fixed behind all page content. Kept low-opacity
// and edge-weighted so they read as atmosphere, not clutter, and never sit
// on top of photos or text (pointer-events-none, negative z-index).
const PALETTE = {
  silver:
    'radial-gradient(circle at 32% 26%, #ffffff 0%, #eef0f2 22%, #c9ccd1 52%, #9a9ea6 100%)',
  pink: 'radial-gradient(circle at 32% 26%, #ffeef1 0%, #f8c4cf 22%, #ea9bab 52%, #d17a8f 100%)',
}

const BALLOONS = [
  { left: '4%', top: '8%', size: 90, color: 'silver', duration: 11, delay: 0, rot: -6 },
  { left: '11%', top: '58%', size: 60, color: 'pink', duration: 9, delay: 1.2, rot: 5 },
  { left: '2%', top: '82%', size: 70, color: 'pink', duration: 12, delay: 0.4, rot: -4 },
  { left: '90%', top: '14%', size: 75, color: 'pink', duration: 10, delay: 0.8, rot: 4 },
  { left: '95%', top: '48%', size: 55, color: 'silver', duration: 8, delay: 1.6, rot: -5 },
  { left: '86%', top: '78%', size: 85, color: 'silver', duration: 13, delay: 0.2, rot: 6 },
  { left: '50%', top: '4%', size: 45, color: 'pink', duration: 9.5, delay: 2, rot: -3 },
]

function Balloon({ left, top, size, color, duration, delay, rot }) {
  return (
    <div
      className="absolute animate-balloon-drift opacity-40 sm:opacity-50"
      style={{
        left,
        top,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        '--rot': `${rot}deg`,
        '--rot2': `${-rot}deg`,
      }}
    >
      <div
        className="shadow-lg"
        style={{
          width: size,
          height: size * 1.15,
          background: PALETTE[color],
          borderRadius: '50% 50% 50% 50% / 58% 58% 42% 42%',
          boxShadow: '0 10px 24px -8px rgba(61,44,62,0.25)',
        }}
      />
      <div
        className="mx-auto bg-plum/20"
        style={{ width: 1, height: size * 0.8 }}
      />
    </div>
  )
}

export default function Balloons() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {BALLOONS.map((b, i) => (
        <Balloon key={i} {...b} />
      ))}
    </div>
  )
}
