import { useState, useEffect, useRef } from 'react'
import logo from './logo.png'

/* ─── Dot grid background ─────────────────────────────────────── */
function DotGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const spacing = 46
      const cols = Math.ceil(canvas.width / spacing) + 1
      const rows = Math.ceil(canvas.height / spacing) + 1
      t += 0.007

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing
          const y = j * spacing
          const wave = (Math.sin(x * 0.011 + t) + Math.sin(y * 0.015 + t * 0.85)) * 0.5
          const a = 0.05 + wave * 0.1
          const r = 0.9 + wave * 0.9
          ctx.beginPath()
          ctx.arc(x, y, Math.max(0.3, r), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
    }} />
  )
}

/* ─── Glitch title ────────────────────────────────────────────── */
function GlitchTitle() {
  const text = 'ILLECTRIKA'
  const base = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(4.8rem, 15vw, 10.5rem)',
    lineHeight: 1,
    letterSpacing: '0.07em',
    color: '#fff',
    display: 'inline-block',
    userSelect: 'none',
    animation: 'shimmer 3s ease-in-out infinite, flicker 9s linear infinite',
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={base}>{text}</span>

      {/* glitch slice 1 */}
      <span aria-hidden style={{
        ...base,
        position: 'absolute', top: 0, left: 0,
        color: 'rgba(255,255,255,0.88)',
        animation: 'glitch 3.6s infinite step-start',
        textShadow: 'none',
      }}>{text}</span>

      {/* glitch slice 2 */}
      <span aria-hidden style={{
        ...base,
        position: 'absolute', top: 0, left: 0,
        color: 'rgba(255,255,255,0.45)',
        animation: 'glitch2 2.7s infinite step-start',
        textShadow: 'none',
        mixBlendMode: 'screen',
      }}>{text}</span>
    </div>
  )
}

/* ─── EKG line ────────────────────────────────────────────────── */
function EkgLine() {
  const pts = "0,18 55,18 65,18 74,4 83,32 92,6 101,30 110,18 170,18 176,18 182,1 190,35 198,1 206,35 212,18 272,18 282,18 292,11 302,25 312,18 370,18 378,13 386,23 394,13 402,18 460,18 560,18"
  return (
    <svg viewBox="0 0 560 36" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 500, height: 36, display: 'block', overflow: 'visible' }}>
      {/* soft glow copy */}
      <polyline points={pts} stroke="white" strokeWidth="5" strokeLinejoin="round"
        strokeDasharray="1000" strokeDashoffset="1000"
        style={{ opacity: 0.12, filter: 'blur(5px)', animation: 'ekg 2.5s cubic-bezier(.4,0,.2,1) 0.6s forwards' }} />
      {/* crisp line */}
      <polyline points={pts} stroke="white" strokeWidth="1.1" strokeLinejoin="round"
        strokeDasharray="1000" strokeDashoffset="1000"
        style={{ filter: 'drop-shadow(0 0 3px white) drop-shadow(0 0 9px rgba(255,255,255,0.55))', animation: 'ekg 2.5s cubic-bezier(.4,0,.2,1) 0.6s forwards' }} />
    </svg>
  )
}

/* ─── Link button ─────────────────────────────────────────────── */
function LinkBtn({ href, label, sub, icon, index }) {
  const [hov, setHov] = useState(false)

  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.1rem',
        padding: '1.05rem 1.5rem',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)'}`,
        background: hov ? 'rgba(255,255,255,0.035)' : 'transparent',
        color: '#fff',
        textDecoration: 'none',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.82rem',
        letterSpacing: '0.13em',
        textTransform: 'uppercase',
        cursor: 'crosshair',
        transition: 'all 0.16s ease',
        animation: `fadeUp 0.55s ease ${1.0 + index * 0.13}s both`,
        boxShadow: hov
          ? '0 0 24px rgba(255,255,255,0.1), 0 0 50px rgba(255,255,255,0.04), inset 0 0 16px rgba(255,255,255,0.025)'
          : 'none',
        transform: hov ? 'translateX(7px)' : 'translateX(0)',
      }}
    >
      <span style={{
        fontSize: '1.15rem',
        opacity: hov ? 1 : 0.35,
        filter: hov ? 'drop-shadow(0 0 7px white) drop-shadow(0 0 14px rgba(255,255,255,0.5))' : 'none',
        transition: 'all 0.16s ease',
        flexShrink: 0,
      }}>{icon}</span>

      <span style={{ flex: 1 }}>
        <span style={{
          display: 'block',
          textShadow: hov ? '0 0 8px #fff, 0 0 20px rgba(255,255,255,0.45)' : 'none',
          transition: 'text-shadow 0.16s ease',
        }}>{label}</span>
        {sub && (
          <span style={{
            display: 'block',
            fontSize: '0.64rem',
            color: 'rgba(255,255,255,0.32)',
            marginTop: '0.18rem',
            letterSpacing: '0.07em',
          }}>{sub}</span>
        )}
      </span>

      <span style={{
        opacity: hov ? 1 : 0,
        transform: hov ? 'translateX(0)' : 'translateX(-8px)',
        transition: 'all 0.16s ease',
        fontSize: '0.85rem',
        filter: hov ? 'drop-shadow(0 0 6px white)' : 'none',
      }}>→</span>
    </a>
  )
}

/* ─── App ─────────────────────────────────────────────────────── */
export default function App() {
  const links = [
    {
      href: 'https://www.instagram.com/illectrika?igsh=MXNxZ3J0a3NheDlwMw==',
      icon: '◈',
      label: 'Instagram',
      sub: '@illectrika',
    },
    {
      href: 'mailto:contact@illectrika.net',
      icon: '◉',
      label: 'Email',
      sub: 'contact@illectrika.net',
    },
  ]

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050505', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <DotGrid />

      {/* Radial vignette */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 35%, rgba(0,0,0,0.78) 100%)',
      }} />

      {/* Corner brackets */}
      {[
        { top: 22, left: 22, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
        { top: 22, right: 22, borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 0, borderBottomWidth: 0 },
        { bottom: 22, left: 22, borderBottomWidth: 1, borderLeftWidth: 1, borderTopWidth: 0, borderRightWidth: 0 },
        { bottom: 22, right: 22, borderBottomWidth: 1, borderRightWidth: 1, borderTopWidth: 0, borderLeftWidth: 0 },
      ].map((s, i) => (
        <div key={i} style={{
          position: 'fixed', width: 22, height: 22, zIndex: 10,
          pointerEvents: 'none', borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.22)',
          animation: `shimmer 4.5s ease-in-out ${i * 0.35}s infinite`,
          ...s,
        }} />
      ))}

      {/* Status — top left */}
      <div style={{
        position: 'fixed', top: 20, left: 52, zIndex: 10,
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.56rem', letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase',
        animation: 'shimmer 5s ease-in-out 1s infinite, flicker 10s linear infinite',
      }}>
        ILLECTRIKA.NET — SIGNAL ACTIVE
      </div>

      {/* Year — bottom right */}
      <div style={{
        position: 'fixed', bottom: 20, right: 52, zIndex: 10,
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.56rem', letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase',
      }}>
        © 2026
      </div>

      {/* ── Main two-col grid ── */}
      <div
        className="layout"
        style={{
          position: 'relative', zIndex: 5,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0 5.5rem',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1040,
          padding: '2rem 4rem',
        }}
      >
        {/* LEFT — logo + title + ekg */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.6rem' }}>

          <div style={{ animation: 'logoReveal 1.1s cubic-bezier(.2,1,.3,1) 0s both' }}>
            <img
              src={logo}
              alt="Illectrika"
              style={{
                width: 'clamp(145px, 19vw, 215px)',
                height: 'clamp(145px, 19vw, 215px)',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 0 22px rgba(255,255,255,0.2)) drop-shadow(0 0 50px rgba(255,255,255,0.08))',
              }}
              
            />
          </div>

          <div style={{ animation: 'fadeUp 0.65s ease 0.45s both' }}>
            <GlitchTitle />
          </div>

          <div style={{ animation: 'fadeUp 0.6s ease 0.65s both', width: '100%' }}>
            <EkgLine />
          </div>
        </div>

        {/* RIGHT — links */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          paddingLeft: '3.5rem',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.6rem',
            letterSpacing: '0.28em',
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
            marginBottom: '0.8rem',
            animation: 'fadeUp 0.5s ease 0.8s both, shimmer 4s ease-in-out 2s infinite',
          }}>
            — CONNECT
          </div>

          {links.map((l, i) => (
            <LinkBtn key={l.href} {...l} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <style>{`
        @media (max-width: 700px) {
          .layout {
            grid-template-columns: 1fr !important;
            padding: 2rem 1.5rem !important;
            gap: 2.5rem 0 !important;
            justify-items: center;
            text-align: center;
          }
          .layout > div:first-child { align-items: center !important; }
          .layout > div:last-child {
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.07) !important;
            padding-left: 0 !important;
            padding-top: 2rem !important;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
