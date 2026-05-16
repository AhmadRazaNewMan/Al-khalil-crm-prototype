import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

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
        <span style={{ fontSize: 15, fontWeight: 600, color: '#000', letterSpacing: '-0.01em' }}>Al Khail CRM</span>
      </div>
      <div style={{ position: 'fixed', top: 24, right: 36, zIndex: 10 }}>
        <span style={{ fontSize: 14, color: '#555', cursor: 'pointer' }}>Sign Up</span>
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
          fontSize: 28, fontWeight: 600, color: '#000',
          textAlign: 'center', marginBottom: 28, letterSpacing: '-0.02em',
        }}>Log in</h1>

        {/* SSO buttons */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Continue with Google',  icon: 'G', iconColor: '#4285F4' },
            { label: 'Continue with Github',  icon: '◎', iconColor: '#000'    },
          ].map((b, i) => (
            <button key={i} onClick={onLogin} style={{
              flex: 1, height: 44, borderRadius: 6,
              border: '1px solid #E5E7EB', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, cursor: 'pointer', fontSize: 13,
              color: '#000', fontFamily: 'inherit',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F5F5F5'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <span style={{ fontSize: b.icon === 'G' ? 14 : 16, color: b.iconColor, fontWeight: 700 }}>{b.icon}</span>
              {b.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
          <span style={{ fontSize: 12, color: '#999' }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
        </div>

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
          <div style={{ textAlign: 'right', marginTop: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: '#555', cursor: 'pointer', textDecoration: 'underline' }}>
              Forgot Password
            </span>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={loading}
            style={{
              width: '100%', height: 48,
              background: loading ? '#555' : '#000',
              color: '#fff', border: 'none',
              borderRadius: 9999, fontSize: 14,
              cursor: loading ? 'wait' : 'pointer',
              fontFamily: 'inherit', fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              transition: 'background 0.2s',
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  animation: 'spin 0.7s linear infinite',
                }} />
                Signing in...
              </>
            ) : (
              <>Log in <span style={{ fontSize: 16 }}>→</span></>
            )}
          </motion.button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#888', marginTop: 20, lineHeight: 1.6 }}>
          By signing up, you agree to the{' '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms of Use</span>
          {' '}and{' '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
        </p>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#555', marginTop: 16 }}>
          New user?{' '}
          <span style={{ fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Sign up</span>
        </p>

        {/* Demo shortcut */}
        <div style={{
          marginTop: 20, paddingTop: 16,
          borderTop: '1px solid #F0F0F0',
          display: 'flex', justifyContent: 'center', gap: 8,
        }}>
          {['Admin', 'Supervisor', 'Agent'].map(role => (
            <button key={role} onClick={onLogin} style={{
              padding: '6px 16px', borderRadius: 20, fontSize: 12,
              border: '1px solid #E5E7EB', background: 'transparent',
              color: '#555', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#000'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
            >
              {role}
            </button>
          ))}
        </div>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
