import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Send, Search, Server, Signal, Plus } from 'lucide-react'
import { conversations, leads } from '../../data/dummyData'
import AgentPickerPanel from '../layout/AgentPickerPanel'

const leadPhotoMap = leads.reduce((acc, l) => { acc[l.name] = l.photo; return acc }, {})

const AV = ({ name, size=36 }) => {
  const photo = leadPhotoMap[name]
  const initials = name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()
  return (
    <div style={{ position:'relative', width:`${size}px`, height:`${size}px`, flexShrink:0 }}>
      {photo && (
        <img src={photo} alt={name}
          style={{ width:`${size}px`, height:`${size}px`, borderRadius:'10px', objectFit:'cover', display:'block' }}
          onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
        />
      )}
      <div style={{
        display: photo ? 'none' : 'flex', position: photo ? 'absolute' : 'static', top:0, left:0,
        width:`${size}px`, height:`${size}px`, borderRadius:'10px',
        background:'linear-gradient(135deg,#C8A75B,#DDB96A)',
        alignItems:'center', justifyContent:'center',
        fontSize:`${Math.round(size*0.33)}px`, fontWeight:700, color:'#fff',
      }}>{initials}</div>
    </div>
  )
}

const smsThreads = conversations.filter(c=>c.channel==='sms')

const simPorts = [
  { port:'SIM-01', number:'+971501111001', active:true,  messages:34, signal:4 },
  { port:'SIM-02', number:'+971501111002', active:true,  messages:18, signal:3 },
  { port:'SIM-03', number:'+971501111003', active:false, messages:0,  signal:0 },
  { port:'SIM-04', number:'+971501111004', active:true,  messages:27, signal:4 },
]

function SignalBars({ strength }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:'2px', height:'14px' }}>
      {[1,2,3,4].map(i => (
        <div key={i} style={{
          width:'3px',
          background: i<=strength ? '#5EA538' : '#E5E7EB',
          height:`${i*3+2}px`, borderRadius:'1px',
        }}/>
      ))}
    </div>
  )
}

export default function SMSModule({ role = 'admin' }) {
  const isAdmin = role === 'admin'
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [selected, setSelected] = useState(null)
  const [message, setMessage]  = useState('')
  const [search, setSearch]    = useState('')

  const allSmsConvs = [
    ...smsThreads,
    {
      id:'cs2', leadId:'l5', leadName:'Raj Patel', channel:'sms',
      lastMessage:'Yes, please send me the payment plan details.', time:'16:30', unread:0,
      status:'active', agentId:'a6', agentName:'Hassan Mahmoud',
      messages:[
        { id:'m1', from:'lead',  text:'Hi, I am interested in Business Bay 3BR.',  time:'16:00' },
        { id:'m2', from:'agent', text:'Hello Raj! I have just the unit for you. Budget?', time:'16:05' },
        { id:'m3', from:'lead',  text:'Around 1.8M. What payment plans are there?', time:'16:15' },
        { id:'m4', from:'agent', text:'We have a 20/80 developer plan. Very flexible.', time:'16:20' },
        { id:'m5', from:'lead',  text:'Yes, please send me the payment plan details.', time:'16:30' },
      ]
    }
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px' }}>
            <h2 style={{ fontSize:'22px', fontWeight:700, color:'#111' }}>SMS Gateway</h2>
            <span style={{
              fontSize:'11px', padding:'3px 10px', borderRadius:'20px',
              background:'#F5F5F5', color:'#666', border:'1px solid #E5E7EB',
            }}>Dinstar UC2000-VG</span>
          </div>
          <p style={{ fontSize:'13.5px', fontWeight:500, color:'#374151' }}>GSM gateway integration · 4 active SIM ports · HTTP REST API</p>
        </div>
      </div>

      {/* Dinstar gateway status */}
      <div style={{
        background:'#fff', border:'1px solid #E5E7EB',
        borderRadius:'16px', padding:'20px 24px', marginBottom:'20px',
        boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
          <Server size={16} color='#C8A75B'/>
          <span style={{ fontSize:'13px', fontWeight:600, color:'#111' }}>Dinstar Gateway Status</span>
          <div style={{ display:'flex', alignItems:'center', gap:'5px', marginLeft:'auto' }}>
            <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#5EA538' }}/>
            <span style={{ fontSize:'12px', color:'#5EA538' }}>Online · Push mode active</span>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px' }}>
          {simPorts.map((port,i) => (
            <motion.div
              key={i}
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
              style={{
                background: port.active ? '#FBF6EC' : '#F8F8F8',
                border:`1px solid ${port.active ? '#EDD9A3' : '#E5E7EB'}`,
                borderRadius:'12px', padding:'12px 14px',
              }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                <span style={{ fontSize:'11px', fontWeight:600, color: port.active ? '#C8A75B' : '#888' }}>{port.port}</span>
                {port.active && <SignalBars strength={port.signal} />}
              </div>
              <div style={{ fontSize:'10px', color:'#888', marginBottom:'6px' }}>{port.number}</div>
              <div style={{ fontSize:'12px', fontWeight:600, color: port.active ? '#111' : '#888' }}>
                {port.active ? `${port.messages} msgs` : 'Inactive'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SMS Threads */}
      <div style={{ display:'flex', height:'440px', gap:'16px' }}>
        {/* Thread list */}
        <div style={{
          width:'280px', flexShrink:0,
          background:'#fff', border:'1px solid #E5E7EB',
          borderRadius:'16px', overflow:'hidden', display:'flex', flexDirection:'column',
          boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
        }}>
          {isAdmin ? (
            <AgentPickerPanel
              selectedAgent={selectedAgent}
              onSelect={a => { setSelectedAgent(a); setSelected(null) }}
              onBack={() => { setSelectedAgent(null); setSelected(null) }}
              getCount={a => allSmsConvs.filter(c => c.agentId === a.id).length}
              countLabel="threads"
            >
              <div style={{ padding:'8px 12px', borderBottom:'1px solid #F0F0F0' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', background:'#F8F8F8', border:'1px solid #E5E7EB', borderRadius:'8px', padding:'6px 10px' }}>
                  <Search size={13} color='#888'/>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{ background:'none', border:'none', outline:'none', color:'#111', fontSize:'12px', fontFamily:'inherit', width:'100%' }}/>
                </div>
              </div>
              <div style={{ flex:1, overflowY:'auto' }}>
                {allSmsConvs.filter(c => c.agentId === selectedAgent?.id && (c.leadName.toLowerCase().includes(search.toLowerCase()) || c.lastMessage.toLowerCase().includes(search.toLowerCase()))).map(conv => (
                  <div key={conv.id} onClick={() => setSelected(conv)}
                    style={{ padding:'12px 14px', cursor:'pointer', background: selected?.id===conv.id ? '#FBF6EC' : 'transparent', borderLeft: selected?.id===conv.id ? '2px solid #C8A75B' : '2px solid transparent', borderBottom:'1px solid #F5F5F5', transition:'background 0.15s' }}
                    onMouseEnter={e=>{ if(selected?.id!==conv.id) e.currentTarget.style.background='#FAFAFA' }}
                    onMouseLeave={e=>{ if(selected?.id!==conv.id) e.currentTarget.style.background='transparent' }}
                  >
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px' }}>
                      <span style={{ fontSize:'13px', fontWeight:600, color:'#111' }}>{conv.leadName}</span>
                      <span style={{ fontSize:'10px', color:'#888' }}>{conv.time}</span>
                    </div>
                    <div style={{ fontSize:'11px', color:'#888', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{conv.lastMessage}</div>
                    {conv.unread > 0 && <div style={{ display:'inline-block', marginTop:'4px', background:'#C8A75B', color:'#fff', fontSize:'10px', fontWeight:700, padding:'1px 7px', borderRadius:'10px' }}>{conv.unread} new</div>}
                  </div>
                ))}
              </div>
            </AgentPickerPanel>
          ) : (
            <>
              <div style={{ padding:'12px', borderBottom:'1px solid #F0F0F0' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', background:'#F8F8F8', border:'1px solid #E5E7EB', borderRadius:'8px', padding:'7px 12px' }}>
                  <Search size={13} color='#888'/>
                  <input placeholder="Search..." style={{ background:'none', border:'none', outline:'none', color:'#111', fontSize:'12px', fontFamily:'inherit', width:'100%' }}/>
                </div>
              </div>
              <div style={{ flex:1, overflowY:'auto' }}>
                {allSmsConvs.map(conv => (
                  <div key={conv.id} onClick={() => setSelected(conv)}
                    style={{ padding:'12px 14px', cursor:'pointer', background: selected?.id===conv.id ? '#FBF6EC' : 'transparent', borderLeft: selected?.id===conv.id ? '2px solid #C8A75B' : '2px solid transparent', borderBottom:'1px solid #F5F5F5', transition:'background 0.15s' }}
                    onMouseEnter={e=>{ if(selected?.id!==conv.id) e.currentTarget.style.background='#FAFAFA' }}
                    onMouseLeave={e=>{ if(selected?.id!==conv.id) e.currentTarget.style.background='transparent' }}
                  >
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px' }}>
                      <span style={{ fontSize:'13px', fontWeight:600, color:'#111' }}>{conv.leadName}</span>
                      <span style={{ fontSize:'10px', color:'#888' }}>{conv.time}</span>
                    </div>
                    <div style={{ fontSize:'11px', color:'#888', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{conv.lastMessage}</div>
                    {conv.unread > 0 && <div style={{ display:'inline-block', marginTop:'4px', background:'#C8A75B', color:'#fff', fontSize:'10px', fontWeight:700, padding:'1px 7px', borderRadius:'10px' }}>{conv.unread} new</div>}
                  </div>
                ))}
              </div>
              <div style={{ padding:'10px', borderTop:'1px solid #F0F0F0' }}>
                <button style={{ width:'100%', padding:'8px', borderRadius:'8px', fontSize:'12px', background:'#FBF6EC', border:'1px solid #E5E7EB', color:'#C8A75B', cursor:'pointer', fontFamily:'inherit', fontWeight:500, display:'flex', alignItems:'center', gap:'6px', justifyContent:'center' }}><Plus size={12}/> New SMS</button>
              </div>
            </>
          )}
        </div>

        {/* Chat panel */}
        <div style={{
          flex:1, background:'#fff', border:'1px solid #E5E7EB',
          borderRadius:'16px', display:'flex', flexDirection:'column', overflow:'hidden',
          boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
        }}>
          {isAdmin && !selectedAgent ? (
            <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#888' }}>
              <MessageSquare size={36} color='#E5E7EB' style={{ marginBottom:8 }}/>
              <div style={{ fontSize:13 }}>Select an agent to view SMS threads</div>
            </div>
          ) : selected ? (
            <>
              <div style={{ padding:'14px 18px', borderBottom:'1px solid #F0F0F0', display:'flex', alignItems:'center', gap:'10px' }}>
                <AV name={selected.leadName} size={36}/>
                <div>
                  <div style={{ fontSize:'13px', fontWeight:600, color:'#111' }}>{selected.leadName}</div>
                  <div style={{ fontSize:'11px', color:'#888' }}>via SIM-01 · {selected.agentName}</div>
                </div>
                <div style={{ marginLeft:'auto', display:'flex', gap:'6px' }}>
                  <span style={{
                    fontSize:'11px', padding:'3px 10px', borderRadius:'20px',
                    background:'#F5F5F5', color:'#666', border:'1px solid #E5E7EB',
                  }}>SMS</span>
                </div>
              </div>

              <div style={{ flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:'8px' }}>
                {selected.messages?.map((msg,i) => (
                  <div key={i} style={{ display:'flex', justifyContent: msg.from==='lead' ? 'flex-start' : 'flex-end' }}>
                    <div style={{
                      background: msg.from==='lead' ? '#F5F5F5' : '#C8A75B',
                      border: msg.from==='lead' ? '1px solid #E5E7EB' : 'none',
                      borderRadius: msg.from==='lead' ? '10px 10px 10px 3px' : '10px 10px 3px 10px',
                      padding:'9px 13px', maxWidth:'65%',
                      fontSize:'13px', color: msg.from==='lead' ? '#111' : '#fff', lineHeight:'1.5',
                    }}>
                      {msg.text}
                      <div style={{ fontSize:'10px', color: msg.from==='lead' ? '#888' : 'rgba(255,255,255,0.65)', marginTop:'3px', textAlign:'right' }}>{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding:'12px', borderTop:'1px solid #F0F0F0', display:'flex', gap:'8px' }}>
                <input
                  value={message} onChange={e=>setMessage(e.target.value)}
                  placeholder="Type an SMS (160 chars)..."
                  style={{
                    flex:1, background:'#F8F8F8', border:'1px solid #E5E7EB',
                    borderRadius:'8px', padding:'10px 14px',
                    color:'#111', fontSize:'13px', fontFamily:'inherit', outline:'none',
                  }}
                />
                <motion.button
                  whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                  style={{
                    padding:'10px 20px', borderRadius:'8px',
                    background:'linear-gradient(135deg,#C8A75B,#DDB96A)',
                    border:'none', color:'#fff', cursor:'pointer',
                    display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', fontFamily:'inherit', fontWeight:500,
                  }}
                  onClick={()=>setMessage('')}
                >
                  <Send size={13}/> Send
                </motion.button>
              </div>
            </>
          ) : (
            <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#888' }}>
              <MessageSquare size={36} color='#E5E7EB' style={{ marginBottom:8 }}/>
              <div style={{ fontSize:13 }}>Select a conversation</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
