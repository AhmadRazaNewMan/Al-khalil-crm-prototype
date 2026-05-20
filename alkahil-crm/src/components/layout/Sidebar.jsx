import { useId, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Inbox,
  Phone,
  MessageCircle,
  MessageSquare,
  Mail,
  Users,
  Bot,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react'
import { aiHandoffQueue } from '../../data/dummyData'
import { brand } from '../../theme'

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
          <stop stopColor="#0B1F3A" />
          <stop offset="1" stopColor="#C8A75B" />
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

const navSections = [
  {
    title: 'Overview',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    title: 'Communication',
    items: [
      { to: '/inbox', icon: Inbox, label: 'Inbox', badge: 18 },
      { to: '/calls', icon: Phone, label: 'Calls', badge: 7 },
      { to: '/whatsapp', icon: MessageCircle, label: 'WhatsApp' },
      { to: '/sms', icon: MessageSquare, label: 'SMS' },
      { to: '/email', icon: Mail, label: 'Email' },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { to: '/ai-agent', icon: Bot, label: 'AI Agent', badge: aiHandoffQueue.length },
    ],
  },
  {
    title: 'Sales',
    items: [
      { to: '/leads', icon: Users, label: 'Leads' },
    ],
  },
]

export { Logo, UserAvatar }

const ink = 'rgba(255,255,255,0.94)'
const inkMuted = 'rgba(255,255,255,0.52)'

function NavRow({ to, icon: Icon, label, badge, collapsed }) {
  const [hover, setHover] = useState(false)
  return (
    <NavLink to={to} style={{ textDecoration: 'none', display: 'block' }} title={label}>
      {({ isActive }) => (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: collapsed ? 0 : 12,
            minHeight: 44,
            padding: collapsed ? '10px 6px' : '10px 14px 10px 16px',
            borderRadius: 12,
            marginBottom: 6,
            cursor: 'pointer',
            transition: 'background 0.16s ease, transform 0.16s ease',
            transform: hover && !isActive ? 'translateX(2px)' : 'translateX(0)',
            background: isActive
              ? 'rgba(255,255,255,0.97)'
              : hover ? 'rgba(255,255,255,0.16)' : 'transparent',
            boxShadow: isActive ? '0 4px 14px rgba(26,22,38,0.16)' : 'none',
          }}
        >
          {/* Active indicator bar */}
          {isActive && !collapsed && (
            <span style={{
              position: 'absolute', left: -12, top: '50%', transform: 'translateY(-50%)',
              width: 4, height: 22, borderRadius: 3, background: brand.gradient,
            }} />
          )}
          <span style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
            <Icon
              size={19}
              color={isActive ? brand.primaryDeep : ink}
              strokeWidth={isActive ? 2.4 : 1.8}
              style={{ opacity: isActive ? 1 : (hover ? 1 : 0.82) }}
            />
            {collapsed && badge != null && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8,
                background: brand.gradient, color: '#fff', fontSize: 9, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1.5px solid rgba(255,255,255,0.6)',
              }}>
                {badge > 9 ? '9+' : badge}
              </span>
            )}
          </span>
          {!collapsed && (
            <>
              <span style={{
                flex: 1,
                fontSize: 13.5,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? brand.primaryDeep : ink,
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                opacity: isActive ? 1 : (hover ? 1 : 0.86),
              }}>
                {label}
              </span>
              {badge != null && (
                <span style={{
                  minWidth: 22, height: 20, padding: '0 7px', borderRadius: 10,
                  background: isActive ? brand.gradient : 'rgba(255,255,255,0.20)',
                  color: '#fff', fontSize: 11, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  border: `1px solid ${isActive ? 'transparent' : 'rgba(255,255,255,0.22)'}`,
                }}>
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </>
          )}
        </div>
      )}
    </NavLink>
  )
}

function SectionLabel({ children, collapsed }) {
  if (collapsed) return <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '10px 8px' }} />
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
      color: inkMuted, padding: '0 14px', marginBottom: 8, textTransform: 'uppercase',
    }}>
      {children}
    </div>
  )
}

export default function Sidebar({ onLogout, role = 'admin' }) {
  const isAgent = role === 'agent'
  const [collapsed, setCollapsed] = useState(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
  )
  const expandedW = 220
  const collapsedW = 72

  // Auto-collapse on narrow viewports; respects manual toggle within a breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const onChange = (e) => setCollapsed(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

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

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: collapsed ? 6 : 10, overflow: 'auto', overflowX: 'hidden' }}>
        {navSections.map((section, si) => (
          <div key={section.title} style={{ marginBottom: si < navSections.length - 1 ? 18 : 4 }}>
            <SectionLabel collapsed={collapsed}>{section.title}</SectionLabel>
            {section.items.map((item) => (
              <NavRow key={item.to} {...item} collapsed={collapsed} />
            ))}
          </div>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {!isAgent && (
          <NavLink to="/settings" style={{ textDecoration: 'none', display: 'block' }} title="Settings">
            {({ isActive }) => (
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  gap: collapsed ? 0 : 12,
                  minHeight: 44,
                  padding: collapsed ? '10px 6px' : '10px 14px 10px 16px',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'background 0.16s ease',
                  background: isActive ? 'rgba(255,255,255,0.97)' : 'transparent',
                  boxShadow: isActive ? '0 4px 14px rgba(26,22,38,0.16)' : 'none',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.16)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                {isActive && !collapsed && (
                  <span style={{
                    position: 'absolute', left: -12, top: '50%', transform: 'translateY(-50%)',
                    width: 4, height: 22, borderRadius: 3, background: brand.gradient,
                  }} />
                )}
                <span style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Settings size={19} color={isActive ? brand.primaryDeep : ink} strokeWidth={isActive ? 2.4 : 1.8} style={{ opacity: isActive ? 1 : 0.82 }} />
                </span>
                {!collapsed && (
                  <span style={{ fontSize: 13.5, fontWeight: isActive ? 700 : 500, color: isActive ? brand.primaryDeep : ink, opacity: isActive ? 1 : 0.86 }}>Settings</span>
                )}
              </div>
            )}
          </NavLink>
        )}
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
                <div style={{ fontSize: 11, color: inkMuted, textTransform: 'capitalize' }}>{role}</div>
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
