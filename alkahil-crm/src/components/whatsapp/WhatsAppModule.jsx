import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Send, Search, Plus, Wifi, FileText } from 'lucide-react'
import { whatsappSessions, conversations, leads, agents } from '../../data/dummyData'
import AgentPickerPanel from '../layout/AgentPickerPanel'

const leadPhotoMap  = leads.reduce((acc, l)  => { acc[l.name] = l.photo; return acc }, {})
const agentPhotoMap = agents.reduce((acc, a) => { acc[a.name] = a.photo; return acc }, {})

const AV = ({ name, useAgent = false, size = 36 }) => {
  const photoMap = useAgent ? agentPhotoMap : leadPhotoMap
  const photo    = photoMap[name]
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {photo && (
        <img src={photo} alt={name}
          style={{ width: size, height: size, borderRadius: 10, objectFit: 'cover', display: 'block' }}
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        />
      )}
      <div style={{
        display: photo ? 'none' : 'flex', position: photo ? 'absolute' : 'static', top: 0, left: 0,
        width: size, height: size, borderRadius: 10,
        background: 'linear-gradient(135deg,#C8A75B,#DDB96A)',
        alignItems: 'center', justifyContent: 'center',
        fontSize: Math.round(size * 0.33), fontWeight: 700, color: '#fff',
      }}>{initials}</div>
    </div>
  )
}

function StatusDot({ active }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14 }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{
          width: 3,
          background: active ? '#25D366' : '#E5E7EB',
          height: i * 3 + 2, borderRadius: 1,
        }} />
      ))}
    </div>
  )
}

const waThreads = conversations.filter(c => c.channel === 'whatsapp')

export default function WhatsAppModule({ role = 'admin' }) {
  const isAdmin = role === 'admin'
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [selected, setSelected] = useState(null)
  const [message, setMessage]   = useState('')
  const [search, setSearch]     = useState('')

  const agentThreads = isAdmin && selectedAgent
    ? waThreads.filter(c => c.agentId === selectedAgent.id)
    : isAdmin ? [] : waThreads

  const filtered = agentThreads.filter(c =>
    c.leadName.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111' }}>WhatsApp Multi-Agent</h2>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: '#F5F5F5', color: '#666', border: '1px solid #E5E7EB' }}>
              Baileys Engine
            </span>
          </div>
          <p style={{ fontSize: 13.5, fontWeight: 500, color: '#374151' }}>
            Server-side WhatsApp sessions via QR linking · Each agent uses their company SIM
          </p>
        </div>
      </div>

      {/* Agent session status */}
      <div style={{
        background: '#fff', border: '1px solid #E5E7EB',
        borderRadius: 16, padding: '20px 24px', marginBottom: 20,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Wifi size={16} color='#C8A75B' />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>Agent Session Status</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#25D366' }} />
            <span style={{ fontSize: 12, color: '#25D366' }}>
              {whatsappSessions.filter(s => s.status === 'connected').length} of {whatsappSessions.length} connected
            </span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
          {whatsappSessions.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              style={{
                background: s.status === 'connected' ? '#F0FDF4' : s.status === 'connecting' ? '#FFFBEB' : '#F8F8F8',
                border: `1px solid ${s.status === 'connected' ? '#BBF7D0' : s.status === 'connecting' ? '#FDE68A' : '#E5E7EB'}`,
                borderRadius: 12, padding: '12px 14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  color: s.status === 'connected' ? '#166534' : s.status === 'connecting' ? '#92400E' : '#888',
                }}>
                  {s.agentName.split(' ')[0]}
                </span>
                <StatusDot active={s.status === 'connected'} />
              </div>
              <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>{s.number.slice(-7)}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: s.status === 'connected' ? '#111' : '#888' }}>
                {s.status === 'connected' ? `${s.messages} msgs` : s.status === 'connecting' ? 'Connecting…' : 'Offline'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side-by-side layout */}
      <div style={{ display: 'flex', height: 440, gap: 16 }}>

        {/* Thread list */}
        <div style={{
          width: 280, flexShrink: 0,
          background: '#fff', border: '1px solid #E5E7EB',
          borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          {isAdmin ? (
            <AgentPickerPanel
              selectedAgent={selectedAgent}
              onSelect={a => { setSelectedAgent(a); setSelected(null) }}
              onBack={() => { setSelectedAgent(null); setSelected(null) }}
              getCount={a => waThreads.filter(c => c.agentId === a.id).length}
              countLabel="chats"
            >
              {/* Thread list shown after agent is selected */}
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #F0F0F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8F8F8', border: '1px solid #E5E7EB', borderRadius: 8, padding: '6px 10px' }}>
                  <Search size={13} color='#888' />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ background: 'none', border: 'none', outline: 'none', color: '#111', fontSize: 12, fontFamily: 'inherit', width: '100%' }} />
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filtered.map(conv => (
                  <div key={conv.id} onClick={() => setSelected(conv)}
                    style={{ padding: '12px 14px', cursor: 'pointer', background: selected?.id === conv.id ? '#FBF6EC' : 'transparent', borderLeft: selected?.id === conv.id ? '2px solid #C8A75B' : '2px solid transparent', borderBottom: '1px solid #F5F5F5', transition: 'background 0.15s' }}
                    onMouseEnter={e => { if (selected?.id !== conv.id) e.currentTarget.style.background = '#FAFAFA' }}
                    onMouseLeave={e => { if (selected?.id !== conv.id) e.currentTarget.style.background = 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <AV name={conv.leadName} size={30} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{conv.leadName}</span>
                          <span style={{ fontSize: 10, color: '#888' }}>{conv.time}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conv.lastMessage}</div>
                      </div>
                    </div>
                    {conv.unread > 0 && <div style={{ display: 'inline-block', marginTop: 2, background: '#25D366', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 10 }}>{conv.unread} new</div>}
                  </div>
                ))}
              </div>
            </AgentPickerPanel>
          ) : (
            <>
              <div style={{ padding: 12, borderBottom: '1px solid #F0F0F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8F8F8', border: '1px solid #E5E7EB', borderRadius: 8, padding: '7px 12px' }}>
                  <Search size={13} color='#888' />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ background: 'none', border: 'none', outline: 'none', color: '#111', fontSize: 12, fontFamily: 'inherit', width: '100%' }} />
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filtered.map(conv => (
                  <div key={conv.id} onClick={() => setSelected(conv)}
                    style={{ padding: '12px 14px', cursor: 'pointer', background: selected?.id === conv.id ? '#FBF6EC' : 'transparent', borderLeft: selected?.id === conv.id ? '2px solid #C8A75B' : '2px solid transparent', borderBottom: '1px solid #F5F5F5', transition: 'background 0.15s' }}
                    onMouseEnter={e => { if (selected?.id !== conv.id) e.currentTarget.style.background = '#FAFAFA' }}
                    onMouseLeave={e => { if (selected?.id !== conv.id) e.currentTarget.style.background = 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <AV name={conv.leadName} size={30} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{conv.leadName}</span>
                          <span style={{ fontSize: 10, color: '#888' }}>{conv.time}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conv.lastMessage}</div>
                      </div>
                    </div>
                    {conv.unread > 0 && <div style={{ display: 'inline-block', marginTop: 2, background: '#25D366', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 10 }}>{conv.unread} new</div>}
                  </div>
                ))}
              </div>
              <div style={{ padding: 10, borderTop: '1px solid #F0F0F0' }}>
                <button style={{ width: '100%', padding: 8, borderRadius: 8, fontSize: 12, background: '#FBF6EC', border: '1px solid #E5E7EB', color: '#C8A75B', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                  <Plus size={12} /> New Chat
                </button>
              </div>
            </>
          )}
        </div>

        {/* Chat panel */}
        <div style={{
          flex: 1, background: '#fff', border: '1px solid #E5E7EB',
          borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          {selected ? (
            <>
              {/* Chat header */}
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <AV name={selected.leadName} size={36} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{selected.leadName}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>
                    via {selected.agentName} · {whatsappSessions.find(s => s.agentId === selected.agentId)?.number || 'WhatsApp'}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                  <span style={{
                    fontSize: 11, padding: '3px 10px', borderRadius: 20,
                    background: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0', fontWeight: 500,
                  }}>WhatsApp</span>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8, background: '#FAFAFA' }}>
                {selected.messages?.map((msg, i) => {
                  if (msg.type === 'document') return (
                    <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{
                        background: '#C8A75B', borderRadius: '10px 10px 3px 10px',
                        padding: '10px 14px', maxWidth: '65%',
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                        <FileText size={16} color='#fff' />
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{msg.fileName}</div>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{msg.fileSize}</div>
                        </div>
                      </div>
                    </div>
                  )
                  return (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'lead' ? 'flex-start' : 'flex-end' }}>
                      <div style={{
                        background: msg.from === 'lead' ? '#fff' : '#C8A75B',
                        border: msg.from === 'lead' ? '1px solid #E5E7EB' : 'none',
                        borderRadius: msg.from === 'lead' ? '10px 10px 10px 3px' : '10px 10px 3px 10px',
                        padding: '9px 13px', maxWidth: '65%',
                        fontSize: 13, color: msg.from === 'lead' ? '#111' : '#fff', lineHeight: 1.5,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                      }}>
                        {msg.text}
                        <div style={{ fontSize: 10, color: msg.from === 'lead' ? '#888' : 'rgba(255,255,255,0.65)', marginTop: 3, textAlign: 'right' }}>{msg.time}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Reply box */}
              <div style={{ padding: 12, borderTop: '1px solid #F0F0F0', display: 'flex', gap: 8, background: '#fff' }}>
                <input
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && setMessage('')}
                  placeholder="Type a WhatsApp message…"
                  style={{
                    flex: 1, background: '#F8F8F8', border: '1px solid #E5E7EB',
                    borderRadius: 8, padding: '10px 14px',
                    color: '#111', fontSize: 13, fontFamily: 'inherit', outline: 'none',
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setMessage('')}
                  style={{
                    padding: '10px 20px', borderRadius: 8,
                    background: 'linear-gradient(135deg,#C8A75B,#DDB96A)',
                    border: 'none', color: '#fff', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 13, fontFamily: 'inherit', fontWeight: 500,
                  }}
                >
                  <Send size={13} /> Send
                </motion.button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
              <MessageCircle size={36} color='#E5E7EB' style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 13 }}>{isAdmin && !selectedAgent ? 'Select an agent to view chats' : 'Select a conversation'}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
