/**
 * Full-viewport ambient background (Cohere-inspired): deep gradient, blurred
 * reference art from /public/bg, and a fine grain overlay. Fixed + non-interactive.
 */
const GRAIN_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)" opacity="0.55"/>
  </svg>`
)

const LAYERS = [
  { src: '/bg/cohere-docs.png', style: { top: '-8%', left: '-12%', width: '58%', height: '85%', opacity: 0.2, filter: 'blur(72px)', transform: 'rotate(-5deg)' } },
  { src: '/bg/cohere-hero-purple.png', style: { top: '15%', right: '-18%', width: '62%', height: '90%', opacity: 0.18, filter: 'blur(80px)', transform: 'rotate(4deg)' } },
  { src: '/bg/cohere-glass-ui.png', style: { bottom: '-12%', left: '5%', width: '70%', height: '55%', opacity: 0.14, filter: 'blur(64px)', transform: 'rotate(2deg)' } },
  { src: '/bg/cohere-green-hero.png', style: { bottom: '-5%', right: '-8%', width: '52%', height: '50%', opacity: 0.16, filter: 'blur(68px)', transform: 'rotate(-3deg)' } },
  { src: '/bg/cohere-light-cta.png', style: { top: '-10%', left: '25%', width: '55%', height: '45%', opacity: 0.1, filter: 'blur(90px)', transform: 'rotate(6deg)' } },
]

export default function AppBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(120% 80% at 10% 0%, rgba(118, 112, 197, 0.45) 0%, transparent 55%),
            radial-gradient(90% 70% at 90% 10%, rgba(209, 142, 226, 0.22) 0%, transparent 50%),
            radial-gradient(80% 60% at 50% 100%, rgba(76, 110, 230, 0.18) 0%, transparent 45%),
            linear-gradient(155deg, #0f0a1a 0%, #1a1230 22%, #241a4a 48%, #152238 78%, #0d1522 100%)
          `,
        }}
      />
      {LAYERS.map((layer, i) => (
        <img
          key={i}
          src={layer.src}
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            objectFit: 'cover',
            pointerEvents: 'none',
            userSelect: 'none',
            ...layer.style,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.22,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 100% 55% at 50% -15%, rgba(255,255,255,0.09), transparent 52%)',
        }}
      />
    </div>
  )
}
