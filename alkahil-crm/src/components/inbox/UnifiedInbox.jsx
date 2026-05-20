import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, MessageSquare, Mail, Search, Send, Paperclip, Mic, MoreVertical, Zap, CheckCheck, FileText, Tag, ArrowRight } from 'lucide-react'
import { conversations, leads } from '../../data/dummyData'
import AgentPickerPanel from '../layout/AgentPickerPanel'

const CHANNEL = {
  whatsapp: { icon:MessageCircle, color:'#C8A75B', label:'WhatsApp' },
  call:     { icon:Phone,         color:'#C8A75B', label:'Call'     },
  sms:      { icon:MessageSquare, color:'#C8A75B', label:'SMS'      },
  email:    { icon:Mail,          color:'#C8A75B', label:'Email'    },
}
const STATUS_LABEL = { active:'Active', missed:'Missed', closed:'Closed', ai:'AI Agent' }

// Photo lookup from leads data
const photoMap = leads.reduce((acc, l) => { acc[l.name] = l.photo; return acc }, {})

// Real photo avatar with gradient fallback
const AV = ({ name, size=40 }) => {
  const photo = photoMap[name]
  const initials = name.split(' ').map(n=>n[0]).join('').slice(0,2)
  return (
    <div style={{ position:'relative', width:size, height:size, flexShrink:0 }}>
      {photo ? (
        <img src={photo} alt={name}
          style={{ width:size, height:size, borderRadius:Math.round(size*0.28), objectFit:'cover', display:'block' }}
          onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
        />
      ) : null}
      <div style={{
        display: photo ? 'none' : 'flex', position: photo ? 'absolute' : 'static', top:0, left:0,
        width:size, height:size, borderRadius:Math.round(size*0.28),
        background:'linear-gradient(135deg,#C8A75B,#DDB96A)',
        alignItems:'center', justifyContent:'center',
        fontSize:Math.round(size*0.36), fontWeight:700, color:'#fff',
      }}>{initials}</div>
    </div>
  )
}

const TABS = ['all','whatsapp','call','sms','email']

function ConvRow({ conv, active, onClick }) {
  const ch = CHANNEL[conv.channel]
  const Icon = ch.icon
  const sl = STATUS_LABEL[conv.status]
  return (
    <div onClick={onClick} style={{
      padding:'12px 14px', cursor:'pointer',
      background: active ? '#FBF6EC' : 'transparent',
      borderLeft: active ? '2px solid #C8A75B' : '2px solid transparent',
      borderBottom:'1px solid #F5F5F5', transition:'background 0.12s',
    }}
    onMouseEnter={e=>{ if(!active) e.currentTarget.style.background='#FAFAFA' }}
    onMouseLeave={e=>{ if(!active) e.currentTarget.style.background='transparent' }}
    >
      <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
        <div style={{ position:'relative', flexShrink:0 }}>
          <AV name={conv.leadName} size={38} />
          <div style={{
            position:'absolute', bottom:-2, right:-2, width:16, height:16,
            borderRadius:'50%', background:'#fff', border:'1px solid #F0F0F0',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <Icon size={9} color={ch.color} />
          </div>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
            <span style={{ fontSize:13, fontWeight:600, color:'#000' }}>{conv.leadName}</span>
            <span style={{ fontSize:10, color:'#BBB' }}>{conv.time}</span>
          </div>
          <div style={{ fontSize:11, color:'#888', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginBottom:5 }}>{conv.lastMessage}</div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontSize:10, color:'#666', background:'#F5F5F5', border:'1px solid #E5E7EB', padding:'1px 7px', borderRadius:20 }}>{sl}</span>
            {conv.unread > 0 && <span style={{ fontSize:10, fontWeight:700, color:'#fff', background:'#C8A75B', borderRadius:10, padding:'1px 6px', marginLeft:'auto' }}>{conv.unread}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

function Bubble({ msg }) {
  const isLead   = msg.from === 'lead'
  const isSystem = msg.from === 'system'
  const isInternal = msg.isInternal

  if (isSystem) return (
    <div style={{ textAlign:'center', margin:'12px 0' }}>
      <span style={{
        display:'inline-flex', alignItems:'center', gap:6,
        background:'#F5F5F5', border:'1px solid #E5E7EB',
        borderRadius:20, padding:'6px 14px', fontSize:11, color:'#888',
      }}>
        <Phone size={11} color='#C8A75B' />
        {msg.text} {msg.duration && <strong style={{ color:'#C8A75B' }}>{msg.duration}</strong>}
        {msg.recording && <span style={{ color:'#5EA538', background:'#F0FAF0', border:'1px solid #C6EAC0', padding:'0 6px', borderRadius:8, fontSize:10 }}>● REC</span>}
      </span>
    </div>
  )

  if (isInternal) return (
    <div style={{ display:'flex', justifyContent:'center', margin:'8px 0' }}>
      <div style={{ background:'#FFFBF0', border:'1px solid #FFE8C0', borderRadius:10, padding:'8px 14px', maxWidth:'75%', fontSize:12, color:'#888' }}>
        <span style={{ color:'#9A6000', fontWeight:600, fontSize:11 }}>Internal Note · </span>{msg.text}
      </div>
    </div>
  )

  return (
    <div style={{ display:'flex', justifyContent: isLead ? 'flex-start' : 'flex-end', marginBottom:8, gap:8, alignItems:'flex-end' }}>
      {isLead && <AV name="Lead" size={26} />}
      <div style={{ maxWidth:'68%' }}>
        {msg.from === 'ai' && <div style={{ fontSize:10, color:'#C8A75B', marginBottom:4, display:'flex', alignItems:'center', gap:3 }}><Zap size={9}/>AI Agent</div>}
        {msg.type === 'document' ? (
          <div style={{
            background:'#F8F5FF', border:'1px solid #EDD9A3', borderRadius:10,
            padding:'10px 14px', display:'flex', alignItems:'center', gap:10,
          }}>
            <FileText size={18} color='#C8A75B' />
            <div>
              <div style={{ fontSize:12, fontWeight:500, color:'#000' }}>{msg.fileName}</div>
              <div style={{ fontSize:10, color:'#888' }}>{msg.fileSize}</div>
            </div>
          </div>
        ) : (
          <div style={{
            background: isLead ? '#F5F5F5' : (msg.from==='ai' ? '#F8F5FF' : '#C8A75B'),
            borderRadius: isLead ? '12px 12px 12px 3px' : '12px 12px 3px 12px',
            padding:'10px 14px', fontSize:13,
            color: isLead ? '#000' : '#fff',
            lineHeight:'1.5',
          }}>{msg.text}</div>
        )}
        <div style={{ fontSize:10, color:'#CCC', marginTop:3, textAlign: isLead ? 'left' : 'right' }}>
          {msg.time} {!isLead && <CheckCheck size={10} color='#A89FE8' style={{ display:'inline', marginLeft:2 }}/>}
        </div>
      </div>
      {!isLead && (
        msg.from === 'ai'
          ? <div style={{ width:26, height:26, borderRadius:8, background:'#F8F5FF', border:'1px solid #EDD9A3', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Zap size={12} color='#C8A75B'/></div>
          : <AV name="Agent" size={26} />
      )}
    </div>
  )
}

export default function UnifiedInbox({ role = 'admin' }) {
  const isAdmin = role === 'admin'
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [tab,      setTab]     = useState('all')
  const [selected, setSelected]= useState(null)
  const [message,  setMessage] = useState('')
  const [noteMode, setNoteMode]= useState(false)
  const [search,   setSearch]  = useState('')

  const baseConvs = isAdmin && selectedAgent
    ? conversations.filter(c => c.agentId === selectedAgent.id)
    : isAdmin ? [] : conversations

  const filtered = baseConvs.filter(c =>
    (tab==='all' || c.channel===tab) &&
    (!search || c.leadName.toLowerCase().includes(search.toLowerCase()))
  )

  const ch = selected ? CHANNEL[selected.channel] : null
  const ChIcon = ch?.icon

  return (
    <div style={{ display:'flex', height:'calc(100vh - 112px)', gap:12 }}>

      {/* List */}
      <div style={{ width:300, flexShrink:0, display:'flex', flexDirection:'column', background:'#fff', border:'1px solid #E5E7EB', borderRadius:12, overflow:'hidden' }}>
        {isAdmin ? (
          <AgentPickerPanel
            selectedAgent={selectedAgent}
            onSelect={a => { setSelectedAgent(a); setSelected(null) }}
            onBack={() => { setSelectedAgent(null); setSelected(null) }}
            getCount={a => conversations.filter(c => c.agentId === a.id).length}
            countLabel="conversations"
          >
            {/* Thread list shown after agent selected */}
            <div style={{ padding:'10px 10px 0' }}>
              <div style={{ display:'flex', alignItems:'center', gap:7, background:'#F5F5F5', borderRadius:8, padding:'7px 12px', marginBottom:8 }}>
                <Search size={13} color='#AAA' />
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search conversations..." style={{ background:'none', border:'none', outline:'none', fontSize:12, fontFamily:'inherit', color:'#000', width:'100%' }} />
              </div>
              <div style={{ display:'flex', borderBottom:'1px solid #F0F0F0', gap:2 }}>
                {TABS.map(t => {
                  const cfg = t==='all' ? null : CHANNEL[t]; const TIcon = cfg?.icon
                  return (
                    <button key={t} onClick={()=>setTab(t)} style={{ flex:1, background:'none', border:'none', cursor:'pointer', padding:'6px 3px', fontSize:10, fontFamily:'inherit', color: tab===t ? '#C8A75B' : '#AAA', borderBottom: tab===t ? '2px solid #C8A75B' : '2px solid transparent', transition:'all 0.15s', display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                      {TIcon ? <TIcon size={12} color={tab===t ? '#C8A75B' : '#CCC'}/> : <Search size={12} color={tab===t ? '#C8A75B' : '#CCC'}/>}
                      <span style={{ textTransform:'capitalize' }}>{t==='all' ? 'All' : t}</span>
                    </button>
                  )
                })}
              </div>
              <div style={{ fontSize:10, color:'#CCC', padding:'6px 2px' }}>{filtered.length} conversations</div>
            </div>
            <div style={{ flex:1, overflowY:'auto' }}>
              {filtered.map(c => <ConvRow key={c.id} conv={c} active={selected?.id===c.id} onClick={()=>setSelected(c)} />)}
            </div>
          </AgentPickerPanel>
        ) : (
          <>
            <div style={{ padding:'10px 10px 0' }}>
              <div style={{ display:'flex', alignItems:'center', gap:7, background:'#F5F5F5', borderRadius:8, padding:'7px 12px', marginBottom:8 }}>
                <Search size={13} color='#AAA' />
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search conversations..." style={{ background:'none', border:'none', outline:'none', fontSize:12, fontFamily:'inherit', color:'#000', width:'100%' }} />
              </div>
              <div style={{ display:'flex', borderBottom:'1px solid #F0F0F0', gap:2 }}>
                {TABS.map(t => {
                  const cfg = t==='all' ? null : CHANNEL[t]; const TIcon = cfg?.icon
                  return (
                    <button key={t} onClick={()=>setTab(t)} style={{ flex:1, background:'none', border:'none', cursor:'pointer', padding:'6px 3px', fontSize:10, fontFamily:'inherit', color: tab===t ? '#C8A75B' : '#AAA', borderBottom: tab===t ? '2px solid #C8A75B' : '2px solid transparent', transition:'all 0.15s', display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                      {TIcon ? <TIcon size={12} color={tab===t ? '#C8A75B' : '#CCC'}/> : <Search size={12} color={tab===t ? '#C8A75B' : '#CCC'}/>}
                      <span style={{ textTransform:'capitalize' }}>{t==='all' ? 'All' : t}</span>
                    </button>
                  )
                })}
              </div>
              <div style={{ fontSize:10, color:'#CCC', padding:'6px 2px' }}>{filtered.length} conversations</div>
            </div>
            <div style={{ flex:1, overflowY:'auto' }}>
              {filtered.map(c => <ConvRow key={c.id} conv={c} active={selected?.id===c.id} onClick={()=>setSelected(c)} />)}
            </div>
          </>
        )}
      </div>

      {/* Thread */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', background:'#fff', border:'1px solid #E5E7EB', borderRadius:12, overflow:'hidden' }}>
        {selected ? (
          <>
            <div style={{ padding:'12px 18px', borderBottom:'1px solid #F0F0F0', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <AV name={selected.leadName} size={38} />
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:'#000' }}>{selected.leadName}</div>
                  <div style={{ fontSize:11, color:'#888', display:'flex', alignItems:'center', gap:5 }}>
                    {ChIcon && <ChIcon size={11} color={ch.color}/>}
                    {ch?.label} · {selected.agentName}
                    {selected.status==='ai' && <span style={{ color:'#C8A75B', display:'flex', alignItems:'center', gap:2 }}><Zap size={9}/> AI</span>}
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                {selected.status==='ai' && (
                  <button style={{ padding:'6px 14px', borderRadius:8, background:'#F8F5FF', border:'1px solid #EDD9A3', color:'#C8A75B', fontSize:12, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:5 }}>
                    <ArrowRight size={12}/> Take Over
                  </button>
                )}
                <button style={{ padding:'6px 14px', borderRadius:8, background:'#FBF6EC', border:'1px solid #EDD9A3', color:'#C8A75B', fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>Reassign</button>
                <button style={{ width:32, height:32, borderRadius:8, background:'#F5F5F5', border:'1px solid #E5E7EB', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                  <MoreVertical size={14} color='#AAA'/>
                </button>
              </div>
            </div>

            <div style={{ flex:1, overflowY:'auto', padding:'16px 18px' }}>
              {selected.messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
            </div>

            <div style={{ padding:'10px 14px', borderTop:'1px solid #F0F0F0', flexShrink:0 }}>
              <div style={{ display:'flex', gap:6, marginBottom:8 }}>
                {['Reply','Internal Note'].map(m => (
                  <button key={m} onClick={()=>setNoteMode(m==='Internal Note')} style={{
                    padding:'3px 12px', borderRadius:20, fontSize:11, cursor:'pointer', fontFamily:'inherit',
                    background: (noteMode && m==='Internal Note') || (!noteMode && m==='Reply') ? '#FBF6EC' : 'transparent',
                    border:'1px solid',
                    borderColor: (noteMode && m==='Internal Note') || (!noteMode && m==='Reply') ? '#EDD9A3' : '#E5E7EB',
                    color: (noteMode && m==='Internal Note') || (!noteMode && m==='Reply') ? '#C8A75B' : '#888',
                  }}>{m}</button>
                ))}
              </div>
              <div style={{ background: noteMode ? '#FFFBF0' : '#F9F9F9', border:`1px solid ${noteMode ? '#FFE8C0' : '#E5E7EB'}`, borderRadius:10, overflow:'hidden' }}>
                <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={2}
                  placeholder={noteMode ? 'Write an internal note...' : 'Type a message... (Enter to send)'}
                  style={{ width:'100%', background:'transparent', border:'none', outline:'none', color:'#000', fontSize:13, fontFamily:'inherit', lineHeight:'1.5', padding:'10px 12px', resize:'none' }}
                />
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'6px 10px', borderTop:`1px solid ${noteMode ? '#FFE8C0' : '#F0F0F0'}` }}>
                  <div style={{ display:'flex', gap:8 }}>
                    <button style={{ background:'none', border:'none', cursor:'pointer', color:'#CCC' }}><Paperclip size={15}/></button>
                    <button style={{ background:'none', border:'none', cursor:'pointer', color:'#CCC' }}><Mic size={15}/></button>
                  </div>
                  <button onClick={()=>setMessage('')} style={{
                    padding:'6px 16px', borderRadius:8, background:'#C8A75B',
                    border:'none', color:'#fff', fontSize:12, cursor:'pointer', fontFamily:'inherit',
                    display:'flex', alignItems:'center', gap:5,
                  }}>
                    <Send size={11}/> Send
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#CCC', flexDirection:'column', gap:8 }}>
            <MessageCircle size={36} color='#EEE'/><span style={{ fontSize:13 }}>Select a conversation</span>
          </div>
        )}
      </div>

      {/* Lead Panel */}
      {selected && (
        <motion.div initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} style={{ width:240, flexShrink:0, display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:12, padding:'18px 16px', textAlign:'center' }}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:10 }}><AV name={selected.leadName} size={52}/></div>
            <div style={{ fontSize:14, fontWeight:600, color:'#000' }}>{selected.leadName}</div>
            <div style={{ fontSize:11, color:'#888', marginTop:2, marginBottom:14 }}>Lead</div>
            {[{ l:'Status', v:'Hot Lead' }, { l:'Budget', v:'AED 2.5M', accent:true }, { l:'Interest', v:'3BR Downtown' }, { l:'Agent', v:selected.agentName }].map((r,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
                <span style={{ fontSize:11, color:'#AAA' }}>{r.l}</span>
                <span style={{ fontSize:12, color: r.accent ? '#C8A75B' : '#333', fontWeight: r.accent ? 600 : 400 }}>{r.v}</span>
              </div>
            ))}
            <div style={{ height:1, background:'#F0F0F0', margin:'12px 0' }}/>
            <div style={{ display:'flex', gap:6 }}>
              <button style={{ flex:1, padding:'7px', borderRadius:8, background:'#FBF6EC', border:'none', color:'#C8A75B', fontSize:11, cursor:'pointer', fontFamily:'inherit' }}>Call</button>
              <button style={{ flex:1, padding:'7px', borderRadius:8, background:'#FBF6EC', border:'none', color:'#C8A75B', fontSize:11, cursor:'pointer', fontFamily:'inherit' }}>WhatsApp</button>
            </div>
          </div>

          <div style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:12, padding:'14px 16px' }}>
            <div style={{ fontSize:12, fontWeight:600, color:'#000', marginBottom:10 }}>Channel History</div>
            {[{ ch:'whatsapp', count:6, last:'Today' }, { ch:'call', count:3, last:'Yesterday' }, { ch:'sms', count:2, last:'May 10' }].map((h,i) => {
              const hch = CHANNEL[h.ch]; const HI = hch.icon
              return (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                  <HI size={13} color='#C8A75B'/><div style={{ flex:1 }}><div style={{ fontSize:12, color:'#333' }}>{hch.label}</div><div style={{ fontSize:10, color:'#AAA' }}>{h.last}</div></div>
                  <span style={{ fontSize:11, color:'#888' }}>{h.count}</span>
                </div>
              )
            })}
          </div>

          <div style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:12, padding:'14px 16px' }}>
            <div style={{ fontSize:12, fontWeight:600, color:'#000', marginBottom:10, display:'flex', justifyContent:'space-between' }}>
              Tags <Tag size={12} color='#CCC'/>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {['Hot Lead','Downtown','3BR','High Budget','Follow-up'].map((tag,i) => (
                <span key={i} style={{
                  padding:'3px 10px', borderRadius:20, fontSize:10,
                  background:'#F5F5F5', border:'1px solid #E5E7EB', color:'#666',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
