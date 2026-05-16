import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar, { Logo, UserAvatar } from './Sidebar'
import { Search, Bell, ChevronDown } from 'lucide-react'

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
            { label:'AI Agent',        desc:'24/7 autonomous fallback',     to:'/dashboard'},
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
            { label:'SLA & response time', desc:'Breaches, percentiles, teams', to:'/calls' },
          ]},
        { heading: 'EXPORT',
          img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7c3?w=400&q=80&auto=format&fit=crop',
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
  return (
    <div style={{ height:88, borderRadius:10, marginBottom:12, overflow:'hidden', flexShrink:0 }}>
      <img
        src={src} alt=""
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width:'100%', height:'100%', objectFit:'cover', display:'block',
          transition:'transform 0.35s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
      />
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
        background:'#17171C', border:'1px solid rgba(255,255,255,0.08)',
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
                <div style={{ width:7, height:7, borderRadius:'50%', background:'#7670C5', flexShrink:0, marginTop:5 }}/>
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

const PAGE_TITLES = { '/dashboard':'Dashboard', '/inbox':'Unified Inbox', '/calls':'Call Logs', '/whatsapp':'WhatsApp', '/sms':'SMS', '/leads':'Leads', '/settings':'Settings' }

export default function AppLayout({ children, onLogout }) {
  const location  = useLocation()
  const navigate  = useNavigate()
  const [open, setOpen]         = useState(null)
  const [searchFocus, setSF]    = useState(false)
  const mainRef = useRef(null)
  const [headerGlass, setHeaderGlass] = useState(false)

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
      <Sidebar onLogout={onLogout} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>

        {/* ── Top Navbar ── */}
        <header style={{
          height:56,
          display:'flex', alignItems:'center', padding:'0 24px',
          position:'sticky', top:0, zIndex:100,
          transition:'background-color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
          ...headerBg,
        }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginRight:28, cursor:'pointer' }} onClick={() => navigate('/dashboard')}>
            <Logo />
            <span style={{ fontSize:14, fontWeight:600, color:'#000', letterSpacing:'-0.01em' }}>Al Khail CRM</span>
          </div>

          {/* Nav links */}
          <nav style={{ display:'flex', alignItems:'center', gap:2, flex:1 }}>
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

          {/* Right */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{
              display:'flex', alignItems:'center', gap:7,
              background: searchFocus ? '#fff' : '#F5F5F5',
              border:`1px solid ${searchFocus ? '#7670C5' : '#E5E7EB'}`,
              borderRadius:8, padding:'6px 12px', transition:'all 0.2s',
            }}>
              <Search size={13} color='#AAA' />
              <input placeholder="Search..." onFocus={()=>setSF(true)} onBlur={()=>setSF(false)} style={{
                background:'none', border:'none', outline:'none',
                fontSize:13, fontFamily:'inherit', color:'#000', width:130,
              }} />
            </div>

            <button style={{
              width:34, height:34, borderRadius:8, border:'1px solid #E5E7EB',
              background:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', position:'relative',
            }}>
              <Bell size={15} color='#888' />
              <div style={{ position:'absolute', top:7, right:7, width:6, height:6, borderRadius:'50%', background:'#7670C5' }}/>
            </button>

            <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
              <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="Ahmed"
                style={{ width:30, height:30, borderRadius:8, objectFit:'cover', border:'1px solid #E5E7EB' }}/>
              <span style={{ fontSize:13, fontWeight:500, color:'#000' }}>Ahmed</span>
              <ChevronDown size={12} color='#AAA' />
            </div>
          </div>
        </header>

        <main ref={mainRef} style={{
          flex:1, overflow:'auto', padding:'28px 32px',
          background:'linear-gradient(180deg, rgba(248,248,250,0.42) 0%, rgba(245,243,255,0.38) 100%)',
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
