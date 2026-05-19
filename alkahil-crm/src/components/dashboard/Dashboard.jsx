import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone, MessageCircle, Zap, TrendingUp, PhoneMissed, Clock,
  ArrowUpRight, ArrowDownRight, Plus,
} from 'lucide-react'
import { agents, channelVolume, recentActivity } from '../../data/dummyData'
import { brand, ink, semantic, elevation, type, radius, btnPrimary } from '../../theme'

const statusColor = { online: semantic.success, busy: semantic.danger, away: semantic.warning, offline: '#C9C5D6' }
const activityIcon = { call: Phone, whatsapp: MessageCircle, sms: Phone, email: MessageCircle, ai: Zap }

// state: 'good' positive, 'bad' negative, 'warn' needs attention
const stats = [
  { icon: TrendingUp,    label: 'Total Leads',          value: '247',    delta: '+12%', state: 'good', spark: [180,190,205,210,225,235,247] },
  { icon: MessageCircle, label: 'Active Conversations', value: '18',     delta: '+8%',  state: 'good', spark: [10,12,11,14,15,16,18] },
  { icon: Phone,         label: 'Calls Today',          value: '64',     delta: '+5%',  state: 'good', spark: [48,52,50,58,55,60,64] },
  { icon: Zap,           label: 'AI Handled',           value: '42%',    delta: '+15%', state: 'good', spark: [22,26,28,31,35,38,42] },
  { icon: Clock,         label: 'Avg Response',         value: '4m 12s', delta: '-8%',  state: 'good', spark: [7,6.5,6,5.5,5,4.6,4.2] },
  { icon: PhoneMissed,   label: 'Missed Calls',         value: '7',      delta: '+3',   state: 'warn', spark: [2,3,2,4,5,6,7] },
]

const timeRanges = ['Today', '7 days', '30 days']

function Sparkline({ data, color }) {
  const w = 96, h = 30, pad = 2
  const min = Math.min(...data), max = Math.max(...data)
  const span = max - min || 1
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / span) * (h - pad * 2)
    return [x, y]
  })
  const line = pts.map(p => p.join(',')).join(' ')
  const area = `${pad},${h} ${line} ${w - pad},${h}`
  const gid = `sg-${color.replace(/[^a-z0-9]/gi, '')}`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }} aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gid})`} />
      <polyline points={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.4" fill={color} />
    </svg>
  )
}

function KpiCard({ s, i }) {
  const [hover, setHover] = useState(false)
  const tone = s.state === 'warn'
    ? { c: semantic.warning, bg: semantic.warningSoft, bd: semantic.warningBorder, Arrow: ArrowUpRight }
    : s.state === 'bad'
      ? { c: semantic.danger, bg: semantic.dangerSoft, bd: semantic.dangerBorder, Arrow: ArrowDownRight }
      : { c: semantic.success, bg: semantic.successSoft, bd: semantic.successBorder, Arrow: ArrowUpRight }
  const Icon = s.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: ink.surface,
        borderRadius: radius.lg,
        border: `1px solid ${hover ? brand.primarySoftBorder : ink.border}`,
        padding: '18px 18px 14px',
        boxShadow: hover ? elevation.cardHover : elevation.card,
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9, flexShrink: 0,
          background: brand.primarySoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={15} color={brand.primary} strokeWidth={2} />
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 2,
          fontSize: 11, fontWeight: 700, color: tone.c,
          background: tone.bg, border: `1px solid ${tone.bd}`,
          padding: '3px 7px 3px 5px', borderRadius: 999,
        }}>
          <tone.Arrow size={11} strokeWidth={2.6} />
          {s.delta}
        </span>
      </div>
      <div style={{ ...type.metric, color: ink.text }}>{s.value}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6, gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: ink.textSecondary }}>{s.label}</div>
        <Sparkline data={s.spark} color={tone.c} />
      </div>
    </motion.div>
  )
}

function PA({ photo, name, size = 34 }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <img
        src={photo} alt={name}
        style={{ width: size, height: size, borderRadius: Math.round(size * 0.3), objectFit: 'cover', display: 'block' }}
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
      />
      <div style={{
        display: 'none', width: size, height: size, borderRadius: Math.round(size * 0.3),
        background: brand.gradient, alignItems: 'center', justifyContent: 'center',
        fontSize: Math.round(size * 0.36), fontWeight: 700, color: '#fff',
        position: 'absolute', top: 0, left: 0,
      }}>{name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
    </div>
  )
}

function ChannelBar({ ch, total, i }) {
  const [hover, setHover] = useState(false)
  const pct = (ch.count / total) * 100
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ marginBottom: 14, cursor: 'default' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12.5, fontWeight: 500, color: hover ? ink.text : ink.textSecondary, transition: 'color 0.15s' }}>{ch.channel}</span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: ink.text }}>
          {ch.count}
          <span style={{ fontSize: 11, fontWeight: 500, color: ink.textMuted, marginLeft: 5 }}>{pct.toFixed(0)}%</span>
        </span>
      </div>
      <div style={{ position: 'relative', height: 8, background: ink.row, border: `1px solid ${ink.border}`, borderRadius: 5, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            background: hover ? brand.gradient : brand.primary,
            opacity: hover ? 1 : 0.85,
            borderRadius: 5,
            transition: 'opacity 0.15s',
          }}
        />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [range, setRange] = useState('Today')
  const total = channelVolume.reduce((s, c) => s + c.count, 0)
  const onlineCount = agents.filter(a => a.status === 'online').length

  return (
    <div style={{ maxWidth: 1180, fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ ...type.display, color: ink.text, margin: 0 }}>Good morning, Ahmed</h1>
          <p style={{ fontSize: 14, fontWeight: 500, color: ink.textSecondary, marginTop: 7 }}>
            Sunday, May 17, 2026 · Here is what is happening across your floor today.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.025, boxShadow: elevation.cardHover }}
          whileTap={{ scale: 0.97 }}
          style={{ ...btnPrimary, padding: '11px 20px', fontSize: 13.5 }}
        >
          <Plus size={16} strokeWidth={2.4} />
          New Lead
        </motion.button>
      </div>

      {/* Stats section header + time filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h2 style={{ ...type.h2, color: ink.text, margin: 0 }}>Performance</h2>
        <div style={{
          display: 'flex', gap: 2, background: ink.row,
          border: `1px solid ${ink.border}`, borderRadius: radius.pill, padding: 3,
        }}>
          {timeRanges.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                padding: '6px 14px', borderRadius: radius.pill, border: 'none',
                fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: range === r ? ink.surface : 'transparent',
                color: range === r ? brand.primaryDeep : ink.textMuted,
                boxShadow: range === r ? elevation.card : 'none',
                transition: 'all 0.15s',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI grid — responsive */}
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        {stats.map((s, i) => <KpiCard key={s.label} s={s} i={i} />)}
      </div>

      {/* Two-column layout — responsive */}
      <div className="dash-cols">

        {/* Live agent board */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
          style={{
            background: ink.surface, borderRadius: radius.lg,
            border: `1px solid ${ink.border}`, padding: '22px 24px',
            boxShadow: elevation.card,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ ...type.cardTitle, color: ink.text, margin: 0 }}>Live Agent Board</h3>
            <span style={{
              fontSize: 11, fontWeight: 600, color: semantic.success,
              background: semantic.successSoft, border: `1px solid ${semantic.successBorder}`,
              padding: '3px 10px', borderRadius: 999,
            }}>
              {onlineCount} online
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {agents.map((a) => (
              <div key={a.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 10,
                transition: 'background 0.15s', cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = brand.primarySoft}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <PA photo={a.photo} name={a.name} size={36} />
                  <div style={{
                    position: 'absolute', bottom: -1, right: -1,
                    width: 10, height: 10, borderRadius: '50%',
                    background: statusColor[a.status], border: `2px solid ${ink.surface}`,
                  }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: ink.text }}>{a.name}</div>
                  <div style={{ fontSize: 11.5, color: ink.textMuted }}>{a.role} · Ext {a.ext}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: ink.text }}>{a.activeChats}</div>
                  <div style={{ fontSize: 10, fontWeight: 500, color: ink.textMuted }}>chats</div>
                </div>
                <div style={{ textAlign: 'right', minWidth: 44 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: brand.primary }}>{a.conversion}%</div>
                  <div style={{ fontSize: 10, fontWeight: 500, color: ink.textMuted }}>conv.</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}
            style={{
              background: ink.surface, borderRadius: radius.lg,
              border: `1px solid ${ink.border}`, padding: '22px 24px',
              boxShadow: elevation.card,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
              <h3 style={{ ...type.cardTitle, color: ink.text, margin: 0 }}>Channel Volume</h3>
              <span style={{ fontSize: 11.5, fontWeight: 500, color: ink.textMuted }}>{total} total</span>
            </div>
            {channelVolume.map((ch, i) => (
              <ChannelBar key={ch.channel} ch={ch} total={total} i={i} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            style={{
              background: ink.surface, borderRadius: radius.lg,
              border: `1px solid ${ink.border}`, padding: '22px 24px', flex: 1,
              boxShadow: elevation.card,
            }}
          >
            <h3 style={{ ...type.cardTitle, color: ink.text, margin: '0 0 16px' }}>Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {recentActivity.slice(0, 4).map((a, i) => {
                const Icon = activityIcon[a.type] || Phone
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                      background: brand.primarySoft,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><Icon size={13} color={brand.primary} strokeWidth={2} /></div>
                    <div style={{ flex: 1, fontSize: 12.5, color: ink.textSecondary, lineHeight: 1.45 }}>{a.text}</div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: ink.textMuted, flexShrink: 0 }}>{a.time}</div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
