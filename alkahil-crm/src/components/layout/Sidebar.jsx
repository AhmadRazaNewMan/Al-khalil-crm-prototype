import { useId, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Inbox,
  Phone,
  MessageCircle,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react'

const glass = {
  background: 'rgba(255,255,255,0.14)',
  WebkitBackdropFilter: 'blur(28px)',
  backdropFilter: 'blur(28px)',
  border: '1px solid rgba(255,255,255,0.28)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
}

const Logo = () => {
  const uid = useId().replace(/:/g, '')
  const gid = `lg-${uid}`
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="28" height="28" rx="8" fill={`url(#${gid})`} />
      <rect x="10" y="9" width="8" height="12" rx="1" stroke="white" strokeWidth="1.6" />
      <path d="M14 5L14 9" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11.5 9L14 5.5L16.5 9" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="12" y="12" width="2" height="2" rx="0.4" fill="white" opacity="0.8" />
      <rect x="15" y="12" width="1.5" height="2" rx="0.4" fill="white" opacity="0.8" />
      <rect x="12" y="15.5" width="2" height="2" rx="0.4" fill="white" opacity="0.8" />
      <rect x="15" y="15.5" width="1.5" height="2" rx="0.4" fill="white" opacity="0.8" />
      <path d="M7 21H21" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7670C5" />
          <stop offset="1" stopColor="#D18EE2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const UserAvatar = ({ size = 36 }) => (
  <img
    src="https://randomuser.me/api/portraits/men/41.jpg"
    alt="Ahmed"
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid rgba(255,255,255,0.45)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    }}
  />
)

const nav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inbox', icon: Inbox, label: 'Inbox', badge: 18 },
  { to: '/calls', icon: Phone, label: 'Calls', badge: 7 },
  { to: '/whatsapp', icon: MessageCircle, label: 'WhatsApp' },
  { to: '/sms', icon: MessageSquare, label: 'SMS' },
  { to: '/leads', icon: Users, label: 'Leads' },
]

export { Logo, UserAvatar }

const ink = 'rgba(255,255,255,0.92)'
const inkMuted = 'rgba(255,255,255,0.55)'
const activeBg = 'rgba(255,255,255,0.22)'
const activeBorder = 'rgba(255,255,255,0.35)'

function NavRow({ to, icon: Icon, label, badge, collapsed }) {
  return (
    <NavLink to={to} style={{ textDecoration: 'none', display: 'block' }} title={label}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: collapsed ? 0 : 10,
            minHeight: 42,
            padding: collapsed ? '8px 6px' : '8px 12px',
            borderRadius: 12,
            marginBottom: 4,
            cursor: 'pointer',
            transition: 'background 0.18s, border-color 0.18s',
            background: isActive ? activeBg : 'transparent',
            border: `1px solid ${isActive ? activeBorder : 'transparent'}`,
          }}
        >
          <span style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
            <Icon size={18} color={ink} strokeWidth={isActive ? 2.2 : 1.7} style={{ opacity: isActive ? 1 : 0.88 }} />
            {collapsed && badge != null && (
              <span
                style={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  minWidth: 16,
                  height: 16,
                  padding: '0 4px',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.95)',
                  color: '#5b52a8',
                  fontSize: 9,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.6)',
                }}
              >
                {badge > 9 ? '9+' : badge}
              </span>
            )}
          </span>
          {!collapsed && (
            <>
              <span
                style={{
                  flex: 1,
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  color: ink,
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  opacity: isActive ? 1 : 0.92,
                }}
              >
                {label}
              </span>
              {badge != null && (
                <span
                  style={{
                    minWidth: 22,
                    height: 20,
                    padding: '0 6px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.22)',
                    color: ink,
                    fontSize: 11,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                >
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </>
          )}
        </motion.div>
      )}
    </NavLink>
  )
}

export default function Sidebar({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false)
  const expandedW = 220
  const collapsedW = 72

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? collapsedW : expandedW }}
      transition={{ type: 'spring', stiffness: 420, damping: 38 }}
      style={{
        flexShrink: 0,
        margin: '10px 0 10px 10px',
        height: 'calc(100vh - 20px)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        padding: collapsed ? '12px 8px 14px' : '14px 12px 16px',
        position: 'sticky',
        top: 10,
        zIndex: 30,
        overflow: 'hidden',
        ...glass,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 8,
          paddingBottom: 14,
          marginBottom: 4,
          borderBottom: '1px solid rgba(255,255,255,0.18)',
          flexWrap: 'nowrap',
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <Logo />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: ink, letterSpacing: '-0.02em', lineHeight: 1.2 }}>Al Khail</div>
              <div style={{ fontSize: 11, color: inkMuted, fontWeight: 500 }}>CRM</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingBottom: 2 }}>
            <Logo />
          </div>
        )}
        {!collapsed && (
          <button
            type="button"
            aria-label="Collapse sidebar"
            title="Collapse"
            onClick={() => setCollapsed(true)}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.12)',
              color: ink,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <PanelLeftClose size={17} strokeWidth={2} />
          </button>
        )}
      </div>

      {collapsed && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <button
            type="button"
            aria-label="Expand sidebar"
            title="Expand"
            onClick={() => setCollapsed(false)}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.12)',
              color: ink,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PanelLeft size={17} strokeWidth={2} />
          </button>
        </div>
      )}

      {!collapsed && (
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: inkMuted, padding: '8px 12px 6px' }}>MENU</div>
      )}

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: collapsed ? 4 : 0, overflow: 'auto', overflowX: 'hidden' }}>
        {nav.map((item) => (
          <NavRow key={item.to} {...item} collapsed={collapsed} />
        ))}
      </nav>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <NavLink to="/settings" style={{ textDecoration: 'none', display: 'block' }} title="Settings">
          {({ isActive }) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: collapsed ? 0 : 10,
                minHeight: 42,
                padding: collapsed ? '8px 6px' : '8px 12px',
                borderRadius: 12,
                cursor: 'pointer',
                background: isActive ? activeBg : 'transparent',
                border: `1px solid ${isActive ? activeBorder : 'transparent'}`,
              }}
            >
              <span style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Settings size={18} color={ink} strokeWidth={1.7} style={{ opacity: isActive ? 1 : 0.88 }} />
              </span>
              {!collapsed && (
                <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 500, color: ink }}>Settings</span>
              )}
            </div>
          )}
        </NavLink>
        <div
          onClick={onLogout}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onLogout?.()
            }
          }}
          title="Sign out"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: collapsed ? 0 : 10,
            minHeight: 42,
            padding: collapsed ? '8px 6px' : '8px 12px',
            borderRadius: 12,
            cursor: 'pointer',
          }}
        >
          <span style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogOut size={18} color={ink} strokeWidth={1.7} style={{ opacity: 0.88 }} />
          </span>
          {!collapsed && <span style={{ fontSize: 13, fontWeight: 500, color: ink }}>Sign out</span>}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 10,
            padding: collapsed ? '12px 4px 4px' : '12px 8px 4px',
            marginTop: 4,
          }}
        >
          <UserAvatar size={collapsed ? 34 : 36} />
          {!collapsed && (
            <div style={{ minWidth: 0, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: ink }}>Ahmed</div>
                <div style={{ fontSize: 11, color: inkMuted }}>Agent</div>
              </div>
              <ChevronMini />
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  )
}

function ChevronMini() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden style={{ flexShrink: 0, opacity: 0.7 }}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
