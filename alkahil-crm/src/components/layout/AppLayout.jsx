import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar, { Logo, UserAvatar } from './Sidebar'
import {
  Search, Bell, ChevronDown, SlidersHorizontal, Settings, LogOut,
  UserCircle, Check, Phone, MessageCircle, Mail, Zap,
} from 'lucide-react'
import { recentActivity } from '../../data/dummyData'
import { brand, ink, semantic, elevation, radius, type } from '../../theme'

const notifIcon = { call: Phone, whatsapp: MessageCircle, sms: MessageCircle, email: Mail, ai: Zap }

function MenuShell({ children, width = 320, align = 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute', top: 'calc(100% + 10px)',
        [align]: 0, width,
        background: ink.surface, border: `1px solid ${ink.border}`,
        borderRadius: radius.lg, boxShadow: elevation.pop,
        zIndex: 300, overflow: 'hidden',
      }}
    >
      {children}
    </motion.div>
  )
}

function NotificationMenu({ onClose }) {
  const unread = 3
  return (
    <MenuShell width={340}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', borderBottom: `1px solid ${ink.border}`,
      }}>
        <span style={{ ...type.cardTitle, color: ink.text }}>Notifications</span>
        <span style={{
          fontSize: 11, fontWeight: 700, color: '#fff', background: brand.primary,
          padding: '2px 8px', borderRadius: 999,
        }}>{unread} new</span>
      </div>
      <div style={{ maxHeight: 360, overflowY: 'auto' }}>
        {recentActivity.map((a, i) => {
          const Icon = notifIcon[a.type] || Bell
          return (
            <div key={a.id} style={{
              display: 'flex', gap: 12, padding: '12px 16px',
              borderBottom: i < recentActivity.length - 1 ? `1px solid ${ink.border}` : 'none',
              background: i < unread ? brand.primarySoft : 'transparent',
              cursor: 'pointer', transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = ink.row}
              onMouseLeave={e => e.currentTarget.style.background = i < unread ? brand.primarySoft : 'transparent'}
            >
              <div style={{
                width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                background: ink.surface, border: `1px solid ${ink.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={13} color={brand.primary} strokeWidth={2} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: ink.text, lineHeight: 1.4 }}>{a.text}</div>
                <div style={{ fontSize: 11, color: ink.textMuted, marginTop: 2 }}>{a.agent} · {a.time}</div>
              </div>
              {i < unread && <div style={{ width: 7, height: 7, borderRadius: '50%', background: brand.primary, flexShrink: 0, marginTop: 5 }} />}
            </div>
          )
        })}
      </div>
      <button
        onClick={onClose}
        style={{
          width: '100%', padding: '12px', border: 'none', borderTop: `1px solid ${ink.border}`,
          background: ink.surface, color: brand.primaryDeep, fontSize: 12.5, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        Mark all as read
      </button>
    </MenuShell>
  )
}

function FilterMenu() {
  const groups = [
    { label: 'Date range', opts: ['Today', 'This week', 'This month', 'Custom'], def: 'Today' },
    { label: 'Team', opts: ['All teams', 'Sales', 'Support', 'AI'], def: 'All teams' },
    { label: 'Status', opts: ['All', 'Active', 'Pending', 'Closed'], def: 'All' },
  ]
  const [sel, setSel] = useState(Object.fromEntries(groups.map(g => [g.label, g.def])))
  return (
    <MenuShell width={300}>
      <div style={{ padding: '14px 16px', borderBottom: `1px solid ${ink.border}` }}>
        <span style={{ ...type.cardTitle, color: ink.text }}>Filters</span>
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {groups.map(g => (
          <div key={g.label}>
            <div style={{ ...type.label, color: ink.textMuted, marginBottom: 8 }}>{g.label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {g.opts.map(o => {
                const active = sel[g.label] === o
                return (
                  <button
                    key={o}
                    onClick={() => setSel(s => ({ ...s, [g.label]: o }))}
                    style={{
                      padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                      fontFamily: 'inherit', cursor: 'pointer',
                      border: `1px solid ${active ? 'transparent' : ink.border}`,
                      background: active ? brand.primary : ink.surface,
                      color: active ? '#fff' : ink.textSecondary,
                      transition: 'all 0.14s',
                    }}
                  >
                    {o}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', borderTop: `1px solid ${ink.border}` }}>
        <button
          onClick={() => setSel(Object.fromEntries(groups.map(g => [g.label, g.def])))}
          style={{
            flex: 1, padding: '9px', borderRadius: radius.sm, fontFamily: 'inherit',
            border: `1px solid ${ink.borderStrong}`, background: ink.surface,
            color: ink.textSecondary, fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Reset
        </button>
        <button style={{
          flex: 1, padding: '9px', borderRadius: radius.sm, border: 'none',
          background: brand.gradient, color: '#fff', fontSize: 12.5, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Apply
        </button>
      </div>
    </MenuShell>
  )
}

function ProfileMenu({ onLogout, onNavigate, role = 'admin' }) {
  const isAgent = role === 'agent'
  const rows = isAgent
    ? [{ label: 'My profile', icon: UserCircle, action: () => onNavigate('/dashboard') }]
    : [
        { label: 'My account', icon: UserCircle, action: () => onNavigate('/settings') },
        { label: 'Settings', icon: Settings, action: () => onNavigate('/settings') },
      ]
  return (
    <MenuShell width={240}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', borderBottom: `1px solid ${ink.border}` }}>
        <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="Ahmed"
          style={{ width: 40, height: 40, borderRadius: 11, objectFit: 'cover' }} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: ink.text }}>Ahmed Al Mansouri</div>
          <div style={{ fontSize: 11.5, color: ink.textMuted, textTransform: 'capitalize' }}>{role} · ahmed@alkhailre.ae</div>
        </div>
      </div>
      <div style={{ padding: 6 }}>
        {rows.map(r => (
          <button key={r.label} onClick={r.action} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: radius.sm, border: 'none',
            background: 'transparent', color: ink.textSecondary, fontSize: 13,
            fontWeight: 550, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
            transition: 'background 0.14s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = brand.primarySoft}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <r.icon size={15} color={ink.textMuted} />
            {r.label}
          </button>
        ))}
      </div>
      <div style={{ padding: 6, borderTop: `1px solid ${ink.border}` }}>
        <button onClick={onLogout} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: radius.sm, border: 'none',
          background: 'transparent', color: semantic.danger, fontSize: 13,
          fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
          transition: 'background 0.14s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = semantic.dangerSoft}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </MenuShell>
  )
}

const NAV = [
  {
    label: 'Platform',
    mega: {
      cols: [
        { heading: 'COMMUNICATION',
          img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'Unified Inbox',   desc:'All channels, one view',       to:'/inbox'    },
            { label:'Call Logs',       desc:'3CX recordings & transcripts', to:'/calls'    },
          ]},
        { heading: 'MESSAGING',
          img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'WhatsApp',        desc:'Multi-agent QR sessions',      to:'/whatsapp' },
            { label:'SMS Gateway',     desc:'Dinstar GSM integration',      to:'/sms'      },
          ]},
        { heading: 'INTELLIGENCE',
          img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'AI Agent & RAG',  desc:'Knowledge base · fallback · handoff', to:'/ai-agent'},
            { label:'AI Transcription',desc:'Whisper-powered call logs',    to:'/calls'    },
          ]},
      ],
      bottom: [{ label:'LEADS →', to:'/leads' }, { label:'SETTINGS →', to:'/settings' }],
    },
  },
  {
    label: 'Agents',
    mega: {
      cols: [
        { heading: 'TEAM & ROSTER',
          img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'Live agent board', desc:'Availability, queues, and load', to:'/dashboard' },
            { label:'Roles & permissions', desc:'Skills, queues, and access control', to:'/settings' },
          ]},
        { heading: 'PERFORMANCE',
          img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'QA scorecards', desc:'Reviews, rubrics, and coaching', to:'/settings' },
            { label:'Handle time trends', desc:'AHT, ASA, and first response', to:'/dashboard' },
          ]},
        { heading: 'WORKFORCE',
          img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'Shift coverage', desc:'Schedules and overlap alerts', to:'/settings' },
            { label:'Presence & status', desc:'Online, busy, away, offline', to:'/dashboard' },
          ]},
      ],
      bottom: [{ label:'INBOX →', to:'/inbox' }, { label:'CALLS →', to:'/calls' }],
    },
  },
  {
    label: 'Leads',
    mega: {
      cols: [
        { heading: 'PIPELINE',
          img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'All leads', desc:'Search, filter, and bulk actions', to:'/leads' },
            { label:'Lead scoring', desc:'Rules, tiers, and auto-routing', to:'/leads' },
          ]},
        { heading: 'SOURCES',
          img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'Imports & CSV', desc:'Mappings, dedupe, and history', to:'/leads' },
            { label:'Web capture', desc:'Forms, landing pages, UTMs', to:'/leads' },
          ]},
        { heading: 'ACTIONS',
          img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'Assignment rules', desc:'Round-robin, territory, owner', to:'/settings' },
            { label:'Tags & segments', desc:'Lists for campaigns and reports', to:'/leads' },
          ]},
      ],
      bottom: [{ label:'WHATSAPP →', to:'/whatsapp' }, { label:'SETTINGS →', to:'/settings' }],
    },
  },
  {
    label: 'Reports',
    mega: {
      cols: [
        { heading: 'OVERVIEW',
          img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'Executive dashboard', desc:'KPIs, trends, and goals', to:'/dashboard' },
            { label:'Funnel snapshot', desc:'Stages, conversion, velocity', to:'/dashboard' },
          ]},
        { heading: 'CHANNELS',
          img: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'Channel volume', desc:'WhatsApp, calls, SMS, email', to:'/dashboard' },
            { label:'AI handoff & RAG', desc:'Handoff rates · retrieval accuracy', to:'/ai-agent' },
          ]},
        { heading: 'EXPORT',
          img: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=400&q=80&auto=format&fit=crop',
          items: [
            { label:'Scheduled reports', desc:'Email PDFs on a cadence', to:'/settings' },
            { label:'Download center', desc:'CSV, XLSX, and audit trails', to:'/dashboard' },
          ]},
      ],
      bottom: [{ label:'LEADS →', to:'/leads' }, { label:'INBOX →', to:'/inbox' }],
    },
  },
]

function DropImg({ src }) {
  const [hovered, setHovered] = useState(false)
  const [failed, setFailed] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height:88, borderRadius:10, marginBottom:12, overflow:'hidden', flexShrink:0,
        background: brand.gradient,
      }}
    >
      {!failed && (
        <img
          src={src} alt=""
          onError={() => setFailed(true)}
          style={{
            width:'100%', height:'100%', objectFit:'cover', display:'block',
            transition:'transform 0.35s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
      )}
    </div>
  )
}

function MegaDropdown({ nav, onClose }) {
  const navigate = useNavigate()
  const go = (to) => { navigate(to); onClose() }
  return (
    <motion.div
      initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }}
      transition={{ duration:0.16 }}
      style={{
        position:'absolute', top:'calc(100% + 8px)', left:'50%', transform:'translateX(-50%)',
        background:'#071428', border:'1px solid rgba(255,255,255,0.08)',
        borderRadius:16, padding:20, boxShadow:'0 24px 60px rgba(0,0,0,0.45)',
        zIndex:200, minWidth:660,
      }}
    >
      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        {nav.mega.cols.map((col,ci) => (
          <div key={ci} style={{ flex:1 }}>
            <DropImg src={col.img} />
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)', fontWeight:600, letterSpacing:'.08em', marginBottom:10, paddingLeft:4 }}>{col.heading}</div>
            {col.items.map((item,ii) => (
              <div key={ii} onClick={() => go(item.to)}
                style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'8px 8px', borderRadius:8, cursor:'pointer', transition:'background 0.12s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}
              >
                <div style={{ width:7, height:7, borderRadius:'50%', background:'#C8A75B', flexShrink:0, marginTop:5 }}/>
                <div>
                  <div style={{ fontSize:13, color:'#fff', lineHeight:'1.3' }}>{item.label}</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.38)', marginTop:2 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:12, display:'flex', gap:20, justifyContent:'flex-end' }}>
        {nav.mega.bottom.map((b,i) => (
          <span key={i} onClick={() => go(b.to)}
            style={{ fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:'.06em', cursor:'pointer', transition:'color 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.color='#fff'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.35)'}
          >{b.label}</span>
        ))}
      </div>
    </motion.div>
  )
}

const PAGE_TITLES = { '/dashboard':'Dashboard', '/inbox':'Unified Inbox', '/calls':'Call Logs', '/whatsapp':'WhatsApp', '/sms':'SMS', '/leads':'Leads', '/settings':'Settings', '/ai-agent':'AI Agent & RAG' }

export default function AppLayout({ children, onLogout, role = 'admin' }) {
  const location  = useLocation()
  const navigate  = useNavigate()
  const [open, setOpen]         = useState(null)
  const [searchFocus, setSF]    = useState(false)
  const [menu, setMenu]         = useState(null) // 'notif' | 'filter' | 'profile'
  const mainRef = useRef(null)
  const [headerGlass, setHeaderGlass] = useState(false)

  const toggleMenu = (m) => setMenu(cur => (cur === m ? null : m))
  const closeMenu = () => setMenu(null)

  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    const onScroll = () => setHeaderGlass(el.scrollTop > 10)
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    el.scrollTop = 0
    setHeaderGlass(false)
  }, [location.pathname])

  const headerBg = headerGlass
    ? {
        background: 'rgba(255,255,255,0.55)',
        WebkitBackdropFilter: 'blur(22px)',
        backdropFilter: 'blur(22px)',
        borderBottom: '1px solid rgba(255,255,255,0.42)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
      }
    : {
        background: '#ffffff',
        WebkitBackdropFilter: 'none',
        backdropFilter: 'none',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: 'none',
      }

  const navBtnHover = headerGlass ? 'rgba(0,0,0,0.06)' : '#F5F5F5'

  return (
    <div style={{ display:'flex', height:'100vh', background:'transparent', fontFamily:'Inter,system-ui,sans-serif' }}>
      <Sidebar onLogout={onLogout} role={role} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>

        {/* ── Top Navbar ── */}
        <header style={{
          height:56,
          display:'flex', alignItems:'center', padding:'0 24px',
          position:'sticky', top:0, zIndex:300,
          transition:'background-color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
          ...headerBg,
        }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginRight:28, cursor:'pointer' }} onClick={() => navigate('/dashboard')}>
            <Logo />
            <span style={{ fontSize:14, fontWeight:600, color:'#000', letterSpacing:'-0.01em' }}>Al Khail CRM</span>
          </div>

          {/* Nav links */}
          <nav className="topbar-nav" style={{ display:'flex', alignItems:'center', gap:2 }}>
            {NAV.map((item,i) => (
              <div key={i} style={{ position:'relative' }}
                onMouseEnter={() => item.mega && setOpen(i)}
                onMouseLeave={() => item.mega && setOpen(null)}
              >
                <button
                  onClick={() => !item.mega && item.to && navigate(item.to)}
                  style={{
                    display:'flex', alignItems:'center', gap:3,
                    background:'none', border:'none', cursor:'pointer',
                    color:'#333', fontSize:14, fontFamily:'inherit',
                    padding:'7px 11px', borderRadius:6, transition:'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = navBtnHover}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {item.label}
                  {item.mega && (
                    <motion.span animate={{ rotate: open===i ? 180 : 0 }} transition={{ duration:0.18 }}>
                      <ChevronDown size={12} color='#AAA'/>
                    </motion.span>
                  )}
                </button>
                <AnimatePresence>
                  {item.mega && open===i && <MegaDropdown nav={item} onClose={() => setOpen(null)} />}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div style={{ flex:1 }} />

          {/* Right */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div className="hide-sm" style={{
              display:'flex', alignItems:'center', gap:7,
              background: searchFocus ? ink.surface : ink.row,
              border:`1px solid ${searchFocus ? brand.primary : ink.border}`,
              borderRadius:radius.sm, padding:'7px 12px', transition:'all 0.2s',
              boxShadow: searchFocus ? '0 0 0 3px rgba(200,167,91,0.14)' : 'none',
            }}>
              <Search size={13} color={ink.textMuted} />
              <input placeholder="Search leads, calls, chats..." onFocus={()=>setSF(true)} onBlur={()=>setSF(false)} style={{
                background:'none', border:'none', outline:'none',
                fontSize:13, fontFamily:'inherit', color:ink.text, width:160,
              }} />
            </div>

            {/* Filters */}
            <div style={{ position:'relative' }}>
              <button
                aria-label="Filters"
                onClick={() => toggleMenu('filter')}
                style={{
                  height:36, padding:'0 12px', borderRadius:radius.sm,
                  border:`1px solid ${menu==='filter' ? brand.primary : ink.border}`,
                  background: menu==='filter' ? brand.primarySoft : ink.surface,
                  display:'flex', alignItems:'center', gap:7, cursor:'pointer',
                  fontFamily:'inherit', fontSize:13, fontWeight:600,
                  color: menu==='filter' ? brand.primaryDeep : ink.textSecondary,
                  transition:'all 0.15s',
                }}
              >
                <SlidersHorizontal size={14} />
                <span className="hide-sm">Filters</span>
              </button>
              <AnimatePresence>{menu==='filter' && <FilterMenu />}</AnimatePresence>
            </div>

            {/* Notifications */}
            <div style={{ position:'relative' }}>
              <button
                aria-label="Notifications"
                onClick={() => toggleMenu('notif')}
                style={{
                  width:36, height:36, borderRadius:radius.sm,
                  border:`1px solid ${menu==='notif' ? brand.primary : ink.border}`,
                  background: menu==='notif' ? brand.primarySoft : ink.surface,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', position:'relative', transition:'all 0.15s',
                }}
              >
                <Bell size={15} color={menu==='notif' ? brand.primaryDeep : ink.textSecondary} />
                <span style={{
                  position:'absolute', top:6, right:6, minWidth:7, height:7,
                  borderRadius:'50%', background:brand.primary,
                  border:`1.5px solid ${ink.surface}`,
                }}/>
              </button>
              <AnimatePresence>{menu==='notif' && <NotificationMenu onClose={closeMenu} />}</AnimatePresence>
            </div>

            {/* Profile */}
            <div style={{ position:'relative' }}>
              <button
                aria-label="Account menu"
                onClick={() => toggleMenu('profile')}
                style={{
                  display:'flex', alignItems:'center', gap:8, cursor:'pointer',
                  background: menu==='profile' ? brand.primarySoft : 'transparent',
                  border:`1px solid ${menu==='profile' ? brand.primarySoftBorder : 'transparent'}`,
                  borderRadius:radius.sm, padding:'4px 8px 4px 4px', fontFamily:'inherit',
                  transition:'all 0.15s',
                }}
              >
                <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="Ahmed"
                  style={{ width:30, height:30, borderRadius:8, objectFit:'cover', border:`1px solid ${ink.border}` }}/>
                <span className="hide-sm" style={{ fontSize:13, fontWeight:600, color:ink.text }}>Ahmed</span>
                <motion.span animate={{ rotate: menu==='profile' ? 180 : 0 }} transition={{ duration:0.18 }}>
                  <ChevronDown size={12} color={ink.textMuted} />
                </motion.span>
              </button>
              <AnimatePresence>
                {menu==='profile' && (
                  <ProfileMenu
                    role={role}
                    onLogout={onLogout}
                    onNavigate={(to) => { closeMenu(); navigate(to) }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Click-away catcher for header menus */}
        {menu && (
          <div
            onClick={closeMenu}
            style={{ position:'fixed', inset:0, zIndex:250, background:'transparent' }}
          />
        )}

        <main ref={mainRef} className="app-main" style={{
          flex:1, overflow:'auto',
          background:'linear-gradient(180deg, rgba(248,248,250,0.42) 0%, rgba(245,247,250,0.42) 100%)',
          WebkitBackdropFilter:'blur(14px)',
          backdropFilter:'blur(14px)',
        }}>
          <motion.div key={location.pathname} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.2 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
