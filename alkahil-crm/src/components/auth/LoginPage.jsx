import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { brand, ink, elevation } from '../../theme'

/* Brand-accurate SSO marks */
const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" aria-hidden>
    <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"/>
    <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
  </svg>
)
const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill={ink.text} aria-hidden>
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/>
  </svg>
)

/* ── Cohere-style 3-D organic blob ───────────────────────────── */
function Blob({ style, color1, color2, size, delay = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{
        scale:        [0.9, 1.05, 0.9],
        rotate:       [0, 8, -6, 0],
        borderRadius: [
          '60% 40% 55% 45% / 50% 60% 40% 50%',
          '45% 55% 40% 60% / 60% 40% 55% 45%',
          '60% 40% 55% 45% / 50% 60% 40% 50%',
        ],
        opacity: 1,
      }}
      transition={{
        duration: 7 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
        opacity: { duration: 0.8, delay },
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 35%, ${color1}, ${color2})`,
        boxShadow: `inset -20px -20px 40px rgba(0,0,0,0.18), inset 10px 10px 30px rgba(255,255,255,0.25)`,
        filter: 'blur(0px)',
        ...style,
      }}
    />
  )
}

export default function LoginPage({ onLogin }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    onLogin()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>

      {/* ── Cohere logo top-left ── */}
      <div style={{
        position: 'fixed', top: 24, left: 36, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'linear-gradient(135deg,#7670C5,#D18EE2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#fff',
        }}>AK</div>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.015em', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>Al Khail CRM</span>
      </div>
      <div style={{ position: 'fixed', top: 24, right: 36, zIndex: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>New here?</span>
        <span style={{
          fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer',
          padding: '6px 14px', borderRadius: 9999,
          background: 'rgba(255,255,255,0.14)',
          border: '1px solid rgba(255,255,255,0.28)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        }}>Sign up</span>
      </div>

      {/* Soft blobs on top of global ambient (low opacity so art + grain stay primary) */}
      <div style={{ position: 'fixed', bottom: -60, left: -40, zIndex: 1, opacity: 0.45, pointerEvents: 'none' }}>
        <Blob size="260px" color1="#c0a5e8" color2="#7670C5" delay={0}
          style={{ bottom: 60, left: 40 }} />
        <Blob size="180px" color1="#FF9B82" color2="#FF7759" delay={1.5}
          style={{ bottom: 0, left: 160, position: 'absolute' }} />
        <Blob size="130px" color1="#a8c8e8" color2="#4C6EE6" delay={2.5}
          style={{ bottom: 160, left: 10, position: 'absolute' }} />
      </div>
      <div style={{ position: 'fixed', top: -30, right: -20, zIndex: 1, opacity: 0.4, pointerEvents: 'none' }}>
        <Blob size="220px" color1="#FF9B82" color2="#E8634A" delay={0.8}
          style={{ top: 0, right: 0 }} />
        <Blob size="140px" color1="#c0a5e8" color2="#9B8FE0" delay={2}
          style={{ top: 180, right: 10, position: 'absolute' }} />
      </div>

      {/* ── Login Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: 'rgba(255,255,255,0.82)',
          WebkitBackdropFilter: 'blur(22px)',
          backdropFilter: 'blur(22px)',
          border: '1px solid rgba(255,255,255,0.55)',
          borderRadius: 16,
          padding: '48px 48px',
          width: 480,
          position: 'relative',
          zIndex: 5,
          boxShadow: '0 24px 80px rgba(15,10,26,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset',
        }}
      >
        <h1 style={{
          fontSize: 28, fontWeight: 700, color: ink.text,
          textAlign: 'center', marginBottom: 6, letterSpacing: '-0.025em',
        }}>Welcome back</h1>
        <p style={{
          fontSize: 14, fontWeight: 500, color: ink.textSecondary,
          textAlign: 'center', marginBottom: 26,
        }}>Sign in to your Al Khail CRM workspace</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{
            border: '1px solid #E5E7EB', borderRadius: 4,
            overflow: 'hidden', marginBottom: 0,
          }}>
            <div style={{ padding: '4px 16px 0', borderBottom: '1px solid #E5E7EB' }}>
              <label style={{ fontSize: 10, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', paddingTop: 8 }}>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="yourname@email.com"
                style={{
                  width: '100%', border: 'none', outline: 'none',
                  fontSize: 15, color: '#000', background: 'transparent',
                  padding: '6px 0 10px', fontFamily: 'inherit',
                }}
              />
            </div>
            <div style={{ padding: '4px 16px 0', position: 'relative' }}>
              <label style={{ fontSize: 10, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', paddingTop: 8 }}>
                PASSWORD
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%', border: 'none', outline: 'none',
                  fontSize: 15, color: '#000', background: 'transparent',
                  padding: '6px 0 10px', fontFamily: 'inherit',
                  paddingRight: 36,
                }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: 14, top: '50%',
                transform: 'translateY(-4px)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#999',
              }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div style={{ textAlign: 'right', marginTop: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: brand.primaryDeep, cursor: 'pointer' }}>
              Forgot password?
            </span>
          </div>

          {/* Submit — primary brand CTA */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.015, boxShadow: '0 12px 30px rgba(108,92,224,0.4)' }}
            whileTap={{ scale: 0.985 }}
            disabled={loading}
            style={{
              width: '100%', height: 50,
              background: loading ? brand.primaryDeep : brand.gradient,
              color: '#fff', border: 'none',
              borderRadius: 9999, fontSize: 15,
              cursor: loading ? 'wait' : 'pointer',
              fontFamily: 'inherit', fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: elevation.brandGlow,
              transition: 'background 0.2s',
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 15, height: 15, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.35)',
                  borderTopColor: '#fff',
                  animation: 'spin 0.7s linear infinite',
                }} />
                Signing in...
              </>
            ) : (
              <>Sign in <ArrowRight size={17} strokeWidth={2.4} /></>
            )}
          </motion.button>
        </form>

        {/* Divider — SSO now below the primary action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 18px' }}>
          <div style={{ flex: 1, height: 1, background: ink.border }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: ink.textMuted }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: ink.border }} />
        </div>

        {/* SSO buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { label: 'Google', Icon: GoogleIcon },
            { label: 'GitHub', Icon: GithubIcon },
          ].map((b, i) => (
            <button key={i} onClick={() => onLogin('admin')} style={{
              flex: 1, height: 46, borderRadius: 10,
              border: `1px solid ${ink.borderStrong}`, background: ink.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 9, cursor: 'pointer', fontSize: 13.5, fontWeight: 600,
              color: ink.text, fontFamily: 'inherit',
              transition: 'background 0.15s, border-color 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = brand.primarySoft; e.currentTarget.style.borderColor = brand.primarySoftBorder }}
              onMouseLeave={e => { e.currentTarget.style.background = ink.surface; e.currentTarget.style.borderColor = ink.borderStrong }}
            >
              <b.Icon />
              {b.label}
            </button>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12.5, color: ink.textMuted, marginTop: 22, lineHeight: 1.6 }}>
          By signing in, you agree to the{' '}
          <span style={{ color: ink.textSecondary, fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Terms of Use</span>
          {' '}and{' '}
          <span style={{ color: ink.textSecondary, fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
        </p>

        <p style={{ textAlign: 'center', fontSize: 13, color: ink.textSecondary, marginTop: 14 }}>
          New to Al Khail?{' '}
          <span style={{ fontWeight: 700, color: brand.primaryDeep, cursor: 'pointer' }}>Create an account</span>
        </p>

        {/* Demo shortcut */}
        <div style={{
          marginTop: 20, paddingTop: 16,
          borderTop: `1px solid ${ink.border}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: ink.textMuted, letterSpacing: '0.04em' }}>
            QUICK DEMO ACCESS
          </span>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            {['Admin', 'Agent'].map(r => (
              <button key={r} onClick={() => onLogin(r.toLowerCase())} style={{
                padding: '8px 22px', borderRadius: 20, fontSize: 12.5, fontWeight: 600,
                border: `1px solid ${ink.borderStrong}`, background: 'transparent',
                color: ink.textSecondary, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = brand.primary; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = brand.primary; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ink.textSecondary; e.currentTarget.style.borderColor = ink.borderStrong; }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
