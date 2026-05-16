import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, PhoneIncoming, PhoneOutgoing, Play, FileText, ChevronDown, ChevronUp, Download, Search, Clock, Mic } from 'lucide-react'
import { callLogs, sampleTranscript } from '../../data/dummyData'

// Real photo avatar with initials fallback
function PA({ photo, name, size=34 }) {
  return (
    <div style={{ position:'relative', width:size, height:size, flexShrink:0 }}>
      <img src={photo} alt={name}
        style={{ width:size, height:size, borderRadius:Math.round(size*0.28), objectFit:'cover', display:'block' }}
        onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
      />
      <div style={{
        display:'none', position:'absolute', top:0, left:0,
        width:size, height:size, borderRadius:Math.round(size*0.28),
        background:'linear-gradient(135deg,#7670C5,#D18EE2)',
        alignItems:'center', justifyContent:'center',
        fontSize:Math.round(size*0.36), fontWeight:700, color:'#fff',
      }}>{name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
    </div>
  )
}

// Map lead name to a portrait
const leadPhotos = {
  'Mohammed Al Zayed': 'https://randomuser.me/api/portraits/men/91.jpg',
  'Li Wei':            'https://randomuser.me/api/portraits/women/9.jpg',
  'James Thornton':    'https://randomuser.me/api/portraits/men/22.jpg',
  'Raj Patel':         'https://randomuser.me/api/portraits/men/55.jpg',
  'Aisha Karimi':      'https://randomuser.me/api/portraits/women/33.jpg',
  'Priya Sharma':      'https://randomuser.me/api/portraits/women/56.jpg',
  'Carlos Mendez':     'https://randomuser.me/api/portraits/men/64.jpg',
  'Elena Petrov':      'https://randomuser.me/api/portraits/women/79.jpg',
}

function AudioPlayer({ duration }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const toggle = () => {
    setPlaying(!playing)
    if (!playing) {
      let p = 0
      const iv = setInterval(() => { p += 2; setProgress(p); if (p >= 100) { clearInterval(iv); setPlaying(false); setProgress(0) } }, 80)
    }
  }
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, background:'#F5F3F0', border:'1px solid #E8E3DC', borderRadius:10, padding:'7px 12px', minWidth:180 }}>
      <button onClick={toggle} style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#7670C5,#D18EE2)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        {playing ? <div style={{ width:7, height:9, background:'#fff', borderRadius:1 }}/> : <Play size={11} color='#fff' style={{ marginLeft:1 }}/>}
      </button>
      <div style={{ flex:1 }}>
        <div style={{ height:3, background:'#E8E3DC', borderRadius:2, overflow:'hidden', marginBottom:3 }}>
          <motion.div animate={{ width:`${progress}%` }} style={{ height:'100%', background:'linear-gradient(90deg,#7670C5,#D18EE2)', borderRadius:2 }}/>
        </div>
        <div style={{ fontSize:10, color:'#888' }}>{duration}</div>
      </div>
    </div>
  )
}

function TranscriptModal({ call, onClose }) {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:20 }}>
      <motion.div initial={{ scale:0.94, y:16 }} animate={{ scale:1, y:0 }} exit={{ scale:0.94 }}
        onClick={e=>e.stopPropagation()} style={{ background:'#fff', borderRadius:16, padding:28, width:540, maxHeight:'70vh', display:'flex', flexDirection:'column', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:'#000' }}>AI Transcript</div>
            <div style={{ fontSize:11, color:'#888', marginTop:2 }}>{call.lead} · {call.duration} · {call.time}</div>
          </div>
          <button onClick={onClose} style={{ padding:'6px 14px', borderRadius:8, background:'#F5F5F5', border:'1px solid #E5E7EB', color:'#555', cursor:'pointer', fontSize:12, fontFamily:'inherit' }}>Close</button>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:'#F5F3F0', border:'1px solid #E8E3DC', borderRadius:8, padding:'8px 12px', marginBottom:14 }}>
          <Mic size={13} color='#7670C5'/><span style={{ fontSize:12, color:'#555' }}>Transcribed by OpenAI Whisper · 97.3% accuracy</span>
        </div>
        <div style={{ overflowY:'auto', flex:1, display:'flex', flexDirection:'column', gap:10 }}>
          {sampleTranscript.map((line, i) => (
            <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <span style={{
                padding:'2px 10px', borderRadius:20, fontSize:10, fontWeight:600, flexShrink:0,
                background: line.speaker==='Agent' ? '#F3F2FF' : '#F5F3F0',
                color: line.speaker==='Agent' ? '#7670C5' : '#555',
                border:`1px solid ${line.speaker==='Agent' ? '#E8E0FF' : '#E8E3DC'}`,
              }}>{line.speaker}</span>
              <div style={{ fontSize:13, color:'#333', lineHeight:'1.5' }}>{line.text}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CallLogs() {
  const [search, setSearch]         = useState('')
  const [filterDir, setFDir]        = useState('all')
  const [filterStatus, setFStatus]  = useState('all')
  const [transcript, setTranscript] = useState(null)
  const [expanded, setExpanded]     = useState(null)

  const filtered = callLogs.filter(c =>
    (!search || c.lead.toLowerCase().includes(search.toLowerCase()) || c.agent.toLowerCase().includes(search.toLowerCase())) &&
    (filterDir==='all' || c.direction===filterDir) &&
    (filterStatus==='all' || c.status===filterStatus)
  )

  const totals = {
    answered:  callLogs.filter(c=>c.status==='answered').length,
    missed:    callLogs.filter(c=>c.status==='missed').length,
    voicemail: callLogs.filter(c=>c.status==='voicemail').length,
    recorded:  callLogs.filter(c=>c.hasRecording).length,
  }

  // Stat cards — all same warm-stone card, purple icon
  const statCards = [
    { label:'Answered',  value:totals.answered,  icon:PhoneIncoming },
    { label:'Missed',    value:totals.missed,    icon:PhoneOutgoing },
    { label:'Voicemail', value:totals.voicemail, icon:PhoneOutgoing },
    { label:'Recorded',  value:totals.recorded,  icon:Mic           },
  ]

  return (
    <div style={{ maxWidth:1100 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:600, color:'#000', margin:0 }}>Call Logs</h1>
          <p style={{ fontSize:13, color:'#888', marginTop:4, margin:0 }}>3CX PBX integration · All calls with AI transcription</p>
        </div>
        <button style={{ padding:'8px 16px', borderRadius:8, background:'#fff', border:'1px solid #E5E7EB', color:'#555', fontSize:13, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:6 }}>
          <Download size={13}/> Export
        </button>
      </div>

      {/* Stat cards — uniform style */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:16 }}>
        {statCards.map((s,i) => {
          const Icon = s.icon
          return (
            <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
              style={{ background:'#F5F3F0', border:'1px solid #E8E3DC', borderRadius:10, padding:'14px 18px', display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:34, height:34, borderRadius:9, background:'#E8E3DC', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={16} color='#7670C5'/>
              </div>
              <div>
                <div style={{ fontSize:20, fontWeight:700, color:'#000' }}>{s.value}</div>
                <div style={{ fontSize:11, color:'#888' }}>{s.label}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:8, marginBottom:14, alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:7, background:'#fff', border:'1px solid #E5E7EB', borderRadius:8, padding:'7px 12px', flex:1 }}>
          <Search size={13} color='#AAA'/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by lead or agent..."
            style={{ background:'none', border:'none', outline:'none', fontSize:13, fontFamily:'inherit', color:'#000', width:'100%' }}/>
        </div>
        <div style={{ display:'flex', gap:4 }}>
          {['all','inbound','outbound'].map(d => (
            <button key={d} onClick={()=>setFDir(d)} style={{ padding:'7px 12px', borderRadius:8, fontSize:12, cursor:'pointer', fontFamily:'inherit', textTransform:'capitalize', background: filterDir===d ? '#F3F2FF' : '#fff', border:`1px solid ${filterDir===d ? '#C8C4F0' : '#E5E7EB'}`, color: filterDir===d ? '#7670C5' : '#888' }}>{d}</button>
          ))}
        </div>
        <div style={{ display:'flex', gap:4 }}>
          {['all','answered','missed','voicemail'].map(s => (
            <button key={s} onClick={()=>setFStatus(s)} style={{ padding:'7px 12px', borderRadius:8, fontSize:12, cursor:'pointer', fontFamily:'inherit', textTransform:'capitalize', background: filterStatus===s ? '#F3F2FF' : '#fff', border:`1px solid ${filterStatus===s ? '#C8C4F0' : '#E5E7EB'}`, color: filterStatus===s ? '#7670C5' : '#888' }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:12, overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1.5fr 1fr 1fr 1fr 1fr auto', padding:'10px 18px', fontSize:10, color:'#AAA', fontWeight:600, textTransform:'uppercase', letterSpacing:'.05em', borderBottom:'1px solid #F0F0F0' }}>
          <span>Lead</span><span>Agent</span><span>Direction</span><span>Status</span><span>Duration</span><span>Time</span><span>Actions</span>
        </div>
        {filtered.map((call,i) => {
          const isExpanded = expanded === call.id
          const DirIcon = call.direction==='inbound' ? PhoneIncoming : PhoneOutgoing
          // ALL status labels same style — just a neutral gray pill
          const statusLabel = call.status.charAt(0).toUpperCase() + call.status.slice(1)
          return (
            <div key={call.id}>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.03 }}
                onClick={()=>setExpanded(isExpanded ? null : call.id)}
                style={{ display:'grid', gridTemplateColumns:'2fr 1.5fr 1fr 1fr 1fr 1fr auto', padding:'13px 18px', borderBottom:'1px solid #F8F8F8', alignItems:'center', cursor:'pointer', transition:'background 0.12s' }}
                onMouseEnter={e=>e.currentTarget.style.background='#FAFAFA'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}
              >
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <PA photo={leadPhotos[call.lead]} name={call.lead} size={34}/>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, color:'#000' }}>{call.lead}</div>
                    <div style={{ fontSize:10, color:'#AAA' }}>{call.phone}</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:13, color:'#333' }}>{call.agent}</div>
                  <div style={{ fontSize:10, color:'#AAA' }}>Ext {call.ext}</div>
                </div>
                {/* Direction — same purple icon for all */}
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <DirIcon size={12} color='#7670C5'/>
                  <span style={{ fontSize:12, color:'#555', textTransform:'capitalize' }}>{call.direction}</span>
                </div>
                {/* Status — uniform gray pill */}
                <span style={{ fontSize:11, padding:'3px 9px', borderRadius:20, background:'#F5F3F0', color:'#555', border:'1px solid #E8E3DC', display:'inline-block' }}>{statusLabel}</span>
                <div style={{ fontSize:12, color:'#555', display:'flex', alignItems:'center', gap:4 }}>
                  <Clock size={10} color='#CCC'/>{call.duration}
                </div>
                <div style={{ fontSize:11, color:'#AAA' }}>{call.time.split(' ')[1]||call.time}</div>
                <div style={{ display:'flex', gap:5, alignItems:'center' }}>
                  {call.hasRecording && (
                    <button onClick={e=>e.stopPropagation()} style={{ padding:'4px 10px', borderRadius:7, fontSize:11, background:'#F3F2FF', border:'1px solid #E8E3DC', color:'#7670C5', cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:3 }}>
                      <Play size={9}/>Play
                    </button>
                  )}
                  {call.hasTranscript && (
                    <button onClick={e=>{e.stopPropagation();setTranscript(call)}} style={{ padding:'4px 10px', borderRadius:7, fontSize:11, background:'#F3F2FF', border:'1px solid #E8E3DC', color:'#7670C5', cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:3 }}>
                      <FileText size={9}/>Transcript
                    </button>
                  )}
                  {isExpanded ? <ChevronUp size={13} color='#CCC'/> : <ChevronDown size={13} color='#CCC'/>}
                </div>
              </motion.div>
              <AnimatePresence>
                {isExpanded && call.hasRecording && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
                    style={{ overflow:'hidden', background:'#FAFAFA', borderBottom:'1px solid #F0F0F0' }}>
                    <div style={{ padding:'12px 18px', display:'flex', alignItems:'center', gap:14 }}>
                      <span style={{ fontSize:12, color:'#888' }}>Recording:</span>
                      <AudioPlayer duration={call.duration}/>
                      {call.hasTranscript && (
                        <button onClick={()=>setTranscript(call)} style={{ padding:'7px 14px', borderRadius:8, fontSize:12, background:'#F3F2FF', border:'1px solid #E8E3DC', color:'#7670C5', cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:5 }}>
                          <FileText size={12}/>View AI Transcript
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
      <AnimatePresence>{transcript && <TranscriptModal call={transcript} onClose={()=>setTranscript(null)}/>}</AnimatePresence>
    </div>
  )
}
