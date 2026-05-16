import { motion } from 'framer-motion'
import { Phone, MessageCircle, Zap, TrendingUp, PhoneMissed, Clock } from 'lucide-react'
import { dashboardStats, agents, channelVolume, recentActivity } from '../../data/dummyData'

const statusColor = { online:'#5EA538', busy:'#CA492D', away:'#E08C3A', offline:'#CCC' }

// ONE purple for all activity icons
const activityIcon = {
  call: Phone, whatsapp: MessageCircle, sms: Phone, email: MessageCircle, ai: Zap,
}

const stats = [
  { icon: TrendingUp,    label: 'Total Leads',          value: '247',    change: '+12%', up: true  },
  { icon: MessageCircle, label: 'Active Conversations',  value: '18',     change: '+8%',  up: true  },
  { icon: Phone,         label: 'Calls Today',           value: '64',     change: '+5%',  up: true  },
  { icon: Zap,           label: 'AI Handled',            value: '42%',    change: '+15%', up: true  },
  { icon: Clock,         label: 'Avg Response',          value: '4m 12s', change: '-8%',  up: true  },
  { icon: PhoneMissed,   label: 'Missed Calls',          value: '7',      change: '-3',   up: false },
]

// Photo avatar — falls back to initials if image fails
function PA({ photo, name, size=32 }) {
  return (
    <div style={{ position:'relative', width:size, height:size, flexShrink:0 }}>
      <img
        src={photo}
        alt={name}
        style={{ width:size, height:size, borderRadius:Math.round(size*0.28), objectFit:'cover', display:'block' }}
        onError={e => {
          e.target.style.display='none'
          e.target.nextSibling.style.display='flex'
        }}
      />
      <div style={{
        display:'none', width:size, height:size, borderRadius:Math.round(size*0.28),
        background:'linear-gradient(135deg,#7670C5,#D18EE2)',
        alignItems:'center', justifyContent:'center',
        fontSize:Math.round(size*0.36), fontWeight:700, color:'#fff',
        position:'absolute', top:0, left:0,
      }}>{name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
    </div>
  )
}

export default function Dashboard() {
  const total = channelVolume.reduce((s, c) => s + c.count, 0)

  return (
    <div style={{ maxWidth: 1100, fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Page header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: '#000', margin: 0 }}>Good morning, Ahmed</h1>
          <p style={{ fontSize: 14, color: '#888', marginTop: 4, margin: 0 }}>Thursday, May 14, 2026</p>
        </div>
        <button style={{
          padding: '9px 20px', borderRadius: 9999, background: '#000',
          color: '#fff', border: 'none', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
        }}>+ New Lead</button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 28 }}>
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                background: '#F5F3F0', borderRadius: 12,
                border: '1px solid #E8E3DC',
                padding: '18px 16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Icon size={15} color='#888' />
                <span style={{
                  fontSize: 11,
                  color: s.up ? '#5EA538' : '#CA492D',
                  background: s.up ? '#F0FAF0' : '#FFF0ED',
                  padding: '2px 7px', borderRadius: 20,
                }}>{s.change}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#000', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 5 }}>{s.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 16 }}>

        {/* Agent status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: '#F5F3F0', borderRadius: 12, border: '1px solid #E8E3DC', padding: '20px 24px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#000' }}>Live Agent Board</span>
            <span style={{ fontSize: 12, color: '#888' }}>3 online</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {agents.map((a) => (
              <div key={a.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px', borderRadius: 8,
                transition: 'background 0.15s', cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <PA photo={a.photo} name={a.name} size={32}/>
                  <div style={{
                    position: 'absolute', bottom: -1, right: -1,
                    width: 9, height: 9, borderRadius: '50%',
                    background: statusColor[a.status], border: '2px solid #F5F3F0',
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#000' }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>{a.role} · Ext {a.ext}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#000' }}>{a.activeChats}</div>
                  <div style={{ fontSize: 10, color: '#888' }}>chats</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#7670C5' }}>{a.conversion}%</div>
                  <div style={{ fontSize: 10, color: '#888' }}>conv.</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Channel volume — ALL ONE purple, opacity steps */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ background: '#F5F3F0', borderRadius: 12, border: '1px solid #E8E3DC', padding: '20px 24px' }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: '#000', marginBottom: 16 }}>Channel Volume</div>
            {channelVolume.map((ch, i) => {
              const opacities = [1, 0.75, 0.55, 0.38]
              return (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: '#555' }}>{ch.channel}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#000' }}>{ch.count}</span>
                  </div>
                  <div style={{ height: 5, background: '#E8E3DC', borderRadius: 3, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(ch.count / total) * 100}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                      style={{ height: '100%', background: `rgba(118,112,197,${opacities[i]})`, borderRadius: 3 }}
                    />
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Recent activity — ONE gray icon style */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ background: '#F5F3F0', borderRadius: 12, border: '1px solid #E8E3DC', padding: '20px 24px', flex: 1 }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: '#000', marginBottom: 14 }}>Recent Activity</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentActivity.slice(0, 4).map((a, i) => {
                const Icon = activityIcon[a.type] || Phone
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                      background: '#E8E3DC',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><Icon size={13} color='#7670C5' /></div>
                    <div style={{ flex: 1, fontSize: 12, color: '#555', lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontSize: 11, color: '#bbb', flexShrink: 0 }}>{a.time}</div>
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
