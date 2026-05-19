import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, RefreshCw, Wifi, WifiOff, Battery, QrCode, Check, Zap } from 'lucide-react'
import { whatsappSessions, conversations, agents } from '../../data/dummyData'

const agentPhotoMap = agents.reduce((acc, a) => { acc[a.name] = a.photo; return acc }, {})

const AV = ({ name, size=42 }) => {
  const photo = agentPhotoMap[name]
  const initials = name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()
  return (
    <div style={{ position:'relative', width:size, height:size, flexShrink:0 }}>
      {photo && (
        <img src={photo} alt={name}
          style={{ width:size, height:size, borderRadius:'12px', objectFit:'cover', display:'block' }}
          onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
        />
      )}
      <div style={{
        display: photo ? 'none' : 'flex', position: photo ? 'absolute' : 'static', top:0, left:0,
        width:size, height:size, borderRadius:'12px',
        background:'linear-gradient(135deg,#7670C5,#D18EE2)',
        alignItems:'center', justifyContent:'center',
        fontSize:Math.round(size*0.33), fontWeight:700, color:'#fff',
      }}>{initials}</div>
    </div>
  )
}

// Status — label only, all same neutral gray tag
const SESSION_LABEL = { connected:'Connected', disconnected:'Disconnected', connecting:'Connecting' }

function QRModal({ agent, onClose }) {
  const [scanned, setScanned] = useState(false)
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose}
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
      <motion.div initial={{ scale:0.88, y:24 }} animate={{ scale:1, y:0 }} exit={{ scale:0.88, y:24 }}
        onClick={e=>e.stopPropagation()}
        style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:'20px', padding:'36px', width:'400px', textAlign:'center', boxShadow:'0 16px 48px rgba(0,0,0,0.12)' }}>
        <div style={{ width:'52px', height:'52px', borderRadius:'16px', margin:'0 auto 20px', background:'#F5F3F0', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <MessageCircle size={26} color='#7670C5'/>
        </div>
        <h3 style={{ fontSize:'20px', fontWeight:700, color:'#111', marginBottom:'6px' }}>Link WhatsApp Session</h3>
        <p style={{ fontSize:'13px', color:'#888', marginBottom:'28px', lineHeight:'1.6' }}>
          Agent: <span style={{ color:'#333', fontWeight:500 }}>{agent.agentName}</span><br/>
          Scan this QR code with WhatsApp on {agent.number}
        </p>
        {!scanned ? (
          <>
            <div style={{ width:'200px', height:'200px', margin:'0 auto 20px', background:'#fff', border:'1px solid #E5E7EB', borderRadius:'16px', padding:'12px', display:'grid', gridTemplateColumns:'repeat(10,1fr)', gap:'2px' }}>
              {Array.from({length:100}).map((_,i) => (
                <div key={i} style={{ background: Math.random()>0.5 ? '#111' : '#fff', borderRadius:'1px' }}/>
              ))}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', justifyContent:'center', fontSize:'12px', color:'#888', marginBottom:'20px' }}>
              <RefreshCw size={12}/> Code refreshes in 45s
            </div>
            <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
              onClick={() => setScanned(true)}
              style={{ width:'100%', padding:'12px', borderRadius:'10px', background:'#000', border:'none', color:'#fff', fontSize:'14px', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
              Simulate QR Scan ✓
            </motion.button>
          </>
        ) : (
          <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}}>
            <div style={{ width:'72px', height:'72px', borderRadius:'50%', margin:'0 auto 16px', background:'#F5F3F0', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Check size={36} color='#7670C5'/>
            </div>
            <div style={{ fontSize:'18px', fontWeight:700, color:'#111', marginBottom:'8px' }}>Session Linked!</div>
            <div style={{ fontSize:'13px', color:'#888', marginBottom:'24px', lineHeight:'1.6' }}>
              WhatsApp for {agent.agentName} is now connected and receiving messages.
            </div>
            <button onClick={onClose} style={{ width:'100%', padding:'12px', borderRadius:'10px', background:'#F3F2FF', border:'1px solid #E5E7EB', color:'#7670C5', fontSize:'14px', cursor:'pointer', fontFamily:'inherit', fontWeight:500 }}>Close</button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

function SessionCard({ session, i, onQR }) {
  const label = SESSION_LABEL[session.status]

  return (
    <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
      whileHover={{ y:-2 }}
      style={{ background:'#F5F3F0', border:'1px solid #E8E3DC', borderRadius:'16px', padding:'20px 22px', display:'flex', flexDirection:'column', gap:'14px' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <AV name={session.agentName} size={42}/>
          <div>
            <div style={{ fontSize:'14px', fontWeight:600, color:'#111' }}>{session.agentName}</div>
            <div style={{ fontSize:'12px', color:'#888' }}>{session.number}</div>
          </div>
        </div>
        {/* All status — same gray pill, no colors */}
        <span style={{ fontSize:'11px', padding:'4px 10px', borderRadius:'20px', background:'#E8E3DC', color:'#555', border:'1px solid #DDD8D0' }}>
          {label}
        </span>
      </div>

      {/* Stats */}
      <div style={{ display:'flex', background:'#EDE8E3', borderRadius:'10px', overflow:'hidden', border:'1px solid #DDD8D0' }}>
        {[
          { label:'Messages', value:session.messages },
          { label:'Last Sync', value:session.lastSync },
          { label:'Battery',   value:`${session.battery}%` },
        ].map((s,idx) => (
          <div key={idx} style={{ flex:1, padding:'10px 12px', textAlign:'center', borderRight:idx<2?'1px solid #DDD8D0':'none' }}>
            <div style={{ fontSize:'14px', fontWeight:700, color:'#111' }}>{s.value}</div>
            <div style={{ fontSize:'10px', color:'#888', marginTop:'2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Actions — all purple style */}
      <div style={{ display:'flex', gap:'8px' }}>
        {session.status === 'connected' ? (
          <>
            <button style={{ flex:1, padding:'8px', borderRadius:'8px', fontSize:'12px', background:'#EDE8E3', border:'1px solid #DDD8D0', color:'#555', cursor:'pointer', fontFamily:'inherit', fontWeight:500 }}>
              Disconnect
            </button>
            <button style={{ flex:1, padding:'8px', borderRadius:'8px', fontSize:'12px', background:'#F3F2FF', border:'1px solid #E8E3DC', color:'#7670C5', cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:'4px', justifyContent:'center' }}>
              <RefreshCw size={11}/> Refresh
            </button>
          </>
        ) : (
          <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
            onClick={() => onQR(session)}
            style={{ flex:1, padding:'9px', borderRadius:'8px', fontSize:'12px', background:'linear-gradient(135deg,#7670C5,#D18EE2)', border:'none', color:'#fff', cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:'6px', justifyContent:'center', fontWeight:500 }}>
            <QrCode size={12}/> Scan QR to Reconnect
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default function WhatsAppModule() {
  const [qrAgent, setQrAgent] = useState(null)

  const connected     = whatsappSessions.filter(s=>s.status==='connected').length
  const disconnected  = whatsappSessions.filter(s=>s.status==='disconnected').length
  const totalMessages = whatsappSessions.reduce((s,ws)=>s+ws.messages, 0)
  const waConvs       = conversations.filter(c=>c.channel==='whatsapp')

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px' }}>
            <h2 style={{ fontSize:'22px', fontWeight:700, color:'#111' }}>WhatsApp Multi-Agent</h2>
            <span style={{ fontSize:'11px', padding:'3px 10px', borderRadius:'20px', background:'#F5F5F5', color:'#666', border:'1px solid #E5E7EB' }}>
              Baileys Engine
            </span>
          </div>
          <p style={{ fontSize:'13.5px', fontWeight:500, color:'#4A4658' }}>Server-side WhatsApp sessions via QR linking · Each agent uses their company SIM</p>
        </div>
        {/* CTA — black pill like rest of app */}
        <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
          style={{ padding:'9px 20px', borderRadius:'9999px', background:'#000', border:'none', color:'#fff', fontSize:'13px', cursor:'pointer', fontFamily:'inherit', fontWeight:500, display:'flex', alignItems:'center', gap:'6px' }}>
          <QrCode size={14}/> Link New Session
        </motion.button>
      </div>

      {/* Stat cards — all same purple icon, same warm-stone card */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'24px' }}>
        {[
          { label:'Active Sessions',  value:`${connected}/${whatsappSessions.length}`, icon:Wifi          },
          { label:'Disconnected',     value:disconnected,                               icon:WifiOff       },
          { label:'Messages Today',   value:totalMessages,                              icon:MessageCircle },
          { label:'AI Conversations', value:waConvs.filter(c=>c.status==='ai').length, icon:Zap           },
        ].map((s,i) => {
          const Icon = s.icon
          return (
            <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
              style={{ background:'#F5F3F0', border:'1px solid #E8E3DC', borderRadius:'14px', padding:'16px 20px', display:'flex', alignItems:'center', gap:'14px' }}>
              <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'#E8E3DC', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={18} color='#7670C5'/>
              </div>
              <div>
                <div style={{ fontSize:'22px', fontWeight:700, color:'#111' }}>{s.value}</div>
                <div style={{ fontSize:'11px', color:'#888' }}>{s.label}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* How it works — neutral stone */}
      <div style={{ background:'#F5F3F0', border:'1px solid #E8E3DC', borderRadius:'14px', padding:'16px 24px', marginBottom:'24px', display:'flex', gap:'32px', alignItems:'center' }}>
        {[
          { step:'1', label:'Agent scans QR',   desc:'One-time QR scan inside CRM app'       },
          { step:'2', label:'Session goes live', desc:'Server maintains persistent connection' },
          { step:'3', label:'All messages sync', desc:'Appears in Unified Inbox instantly'    },
          { step:'4', label:'Admin sees all',    desc:'Full oversight across all agents'      },
        ].map((s,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:'12px', flex:1 }}>
            <div style={{ width:'32px', height:'32px', borderRadius:'50%', flexShrink:0, background:'#E8E3DC', border:'1px solid #DDD8D0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:700, color:'#7670C5' }}>
              {s.step}
            </div>
            <div>
              <div style={{ fontSize:'12px', fontWeight:600, color:'#111' }}>{s.label}</div>
              <div style={{ fontSize:'11px', color:'#888' }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sessions grid */}
      <div style={{ fontSize:'15px', fontWeight:600, color:'#111', marginBottom:'14px' }}>Agent Sessions</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px' }}>
        {whatsappSessions.map((s,i) => (
          <SessionCard key={s.id} session={s} i={i} onQR={setQrAgent} />
        ))}
      </div>

      <AnimatePresence>
        {qrAgent && <QRModal agent={qrAgent} onClose={() => setQrAgent(null)} />}
      </AnimatePresence>
    </div>
  )
}
