import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Search, Plus, Star, Paperclip, RefreshCw, Inbox } from 'lucide-react'
import { emailAccounts, emailThreads, leads } from '../../data/dummyData'
import AgentPickerPanel from '../layout/AgentPickerPanel'

const PURPLE = '#C8A75B'
const PURPLE_LIGHT = '#FBF6EC'
const BORDER = '#E5E7EB'
const MUTED = '#888'
const TEXT = '#111'
const GREEN = '#5EA538'

const leadPhotoMap = leads.reduce((acc, l) => { acc[l.name] = l.photo; return acc }, {})

function AV({ name, photo, size = 36 }) {
  const src = photo || leadPhotoMap[name]
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {src && (
        <img src={src} alt={name}
          style={{ width: size, height: size, borderRadius: 10, objectFit: 'cover', display: 'block' }}
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        />
      )}
      <div style={{
        display: src ? 'none' : 'flex',
        position: src ? 'absolute' : 'static', top: 0, left: 0,
        width: size, height: size, borderRadius: 10,
        background: 'linear-gradient(135deg,#C8A75B,#DDB96A)',
        alignItems: 'center', justifyContent: 'center',
        fontSize: Math.round(size * 0.33), fontWeight: 700, color: '#fff',
      }}>{initials}</div>
    </div>
  )
}

const providerColor = { Gmail: '#EA4335', Outlook: '#0078D4', SMTP: '#888' }

export default function EmailModule({ role = 'admin' }) {
  const isAdmin = role === 'admin'
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [selected, setSelected] = useState(null)
  const [reply, setReply] = useState('')
  const [search, setSearch] = useState('')

  const agentThreads = isAdmin && selectedAgent
    ? emailThreads.filter(t => t.agentName === selectedAgent.name)
    : isAdmin ? [] : emailThreads

  const filtered = agentThreads.filter(t =>
    t.leadName.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  )

  const totalUnread = emailAccounts.reduce((s, a) => s + a.unread, 0)

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: TEXT }}>Email</h2>
            <span style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 20,
              background: '#F5F5F5', color: '#666', border: `1px solid ${BORDER}`,
            }}>IMAP / SMTP</span>
          </div>
          <p style={{ fontSize: 13.5, fontWeight: 500, color: '#374151' }}>
            {emailAccounts.filter(a => a.status === 'connected').length} connected accounts · {totalUnread} unread emails
          </p>
        </div>
      </div>

      {/* Account status cards */}
      <div style={{
        background: '#fff', border: `1px solid ${BORDER}`,
        borderRadius: 16, padding: '20px 24px', marginBottom: 20,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Inbox size={16} color={PURPLE} />
          <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Connected Email Accounts</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN }} />
            <span style={{ fontSize: 12, color: GREEN }}>All accounts syncing</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
          {emailAccounts.map((acc, i) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              style={{
                background: acc.status === 'connected' ? PURPLE_LIGHT : '#F8F8F8',
                border: `1px solid ${acc.status === 'connected' ? '#EDD9A3' : BORDER}`,
                borderRadius: 12, padding: '12px 14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20,
                  background: '#fff', color: providerColor[acc.provider] || MUTED,
                  border: `1px solid ${BORDER}`,
                }}>{acc.provider}</span>
                {acc.unread > 0 && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, minWidth: 18, height: 18,
                    background: PURPLE, color: '#fff', borderRadius: 9,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
                  }}>{acc.unread}</span>
                )}
              </div>
              <div style={{ fontSize: 11, color: '#444', marginBottom: 4, fontWeight: 500, wordBreak: 'break-all' }}>{acc.label}</div>
              <div style={{ fontSize: 10, color: MUTED }}>
                {acc.status === 'send-only' ? 'Send only' : `${acc.total} emails`} · {acc.lastSync}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Thread list + viewer */}
      <div style={{ display: 'flex', height: 480, gap: 16 }}>
        {/* Thread list */}
        <div style={{
          width: 300, flexShrink: 0,
          background: '#fff', border: `1px solid ${BORDER}`,
          borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          {isAdmin ? (
            <AgentPickerPanel
              selectedAgent={selectedAgent}
              onSelect={a => { setSelectedAgent(a); setSelected(null) }}
              onBack={() => { setSelectedAgent(null); setSelected(null) }}
              getCount={a => emailThreads.filter(t => t.agentName === a.name).length}
              countLabel="emails"
            >
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #F0F0F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8F8F8', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '6px 10px' }}>
                  <Search size={13} color={MUTED} />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ background: 'none', border: 'none', outline: 'none', color: TEXT, fontSize: 12, fontFamily: 'inherit', width: '100%' }} />
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filtered.map(thread => (
                  <div key={thread.id} onClick={() => setSelected(thread)}
                    style={{ padding: '12px 14px', cursor: 'pointer', background: selected?.id === thread.id ? PURPLE_LIGHT : 'transparent', borderLeft: `2px solid ${selected?.id === thread.id ? PURPLE : 'transparent'}`, borderBottom: '1px solid #F5F5F5', transition: 'background 0.15s' }}
                    onMouseEnter={e => { if (selected?.id !== thread.id) e.currentTarget.style.background = '#FAFAFA' }}
                    onMouseLeave={e => { if (selected?.id !== thread.id) e.currentTarget.style.background = 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <AV name={thread.leadName} photo={thread.leadPhoto} size={28} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 12, fontWeight: thread.unread > 0 ? 700 : 500, color: TEXT }}>{thread.leadName}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            {thread.starred && <Star size={10} color="#F59E0B" fill="#F59E0B" />}
                            <span style={{ fontSize: 10, color: MUTED }}>{thread.time}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: thread.unread > 0 ? TEXT : MUTED, fontWeight: thread.unread > 0 ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{thread.subject}</div>
                      </div>
                    </div>
                    {thread.unread > 0 && <div style={{ display: 'inline-block', marginTop: 2, background: PURPLE, color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 10 }}>{thread.unread} new</div>}
                  </div>
                ))}
              </div>
            </AgentPickerPanel>
          ) : (
            <>
              <div style={{ padding: 12, borderBottom: '1px solid #F0F0F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8F8F8', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 12px' }}>
                  <Search size={13} color={MUTED} />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ background: 'none', border: 'none', outline: 'none', color: TEXT, fontSize: 12, fontFamily: 'inherit', width: '100%' }} />
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filtered.map(thread => (
                  <div key={thread.id} onClick={() => setSelected(thread)}
                    style={{ padding: '12px 14px', cursor: 'pointer', background: selected?.id === thread.id ? PURPLE_LIGHT : 'transparent', borderLeft: `2px solid ${selected?.id === thread.id ? PURPLE : 'transparent'}`, borderBottom: '1px solid #F5F5F5', transition: 'background 0.15s' }}
                    onMouseEnter={e => { if (selected?.id !== thread.id) e.currentTarget.style.background = '#FAFAFA' }}
                    onMouseLeave={e => { if (selected?.id !== thread.id) e.currentTarget.style.background = 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <AV name={thread.leadName} photo={thread.leadPhoto} size={28} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 12, fontWeight: thread.unread > 0 ? 700 : 500, color: TEXT }}>{thread.leadName}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            {thread.starred && <Star size={10} color="#F59E0B" fill="#F59E0B" />}
                            <span style={{ fontSize: 10, color: MUTED }}>{thread.time}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: thread.unread > 0 ? TEXT : MUTED, fontWeight: thread.unread > 0 ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{thread.subject}</div>
                      </div>
                    </div>
                    {thread.unread > 0 && <div style={{ display: 'inline-block', marginTop: 2, background: PURPLE, color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 10 }}>{thread.unread} new</div>}
                  </div>
                ))}
              </div>
              <div style={{ padding: 10, borderTop: '1px solid #F0F0F0' }}>
                <button style={{ width: '100%', padding: 8, borderRadius: 8, fontSize: 12, background: PURPLE_LIGHT, border: `1px solid ${BORDER}`, color: PURPLE, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                  <Plus size={12} /> Compose Email
                </button>
              </div>
            </>
          )}
        </div>

        {/* Email viewer */}
        <div style={{
          flex: 1, background: '#fff', border: `1px solid ${BORDER}`,
          borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          {isAdmin && !selectedAgent ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: MUTED }}>
              <Mail size={36} color={BORDER} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 13 }}>Select an agent to view their emails</div>
            </div>
          ) : selected ? (
            <>
              {/* Thread header */}
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <AV name={selected.leadName} photo={selected.leadPhoto} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{selected.subject}</div>
                  <div style={{ fontSize: 11, color: MUTED }}>{selected.email} · via {selected.account} · {selected.agentName}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={{
                    padding: '5px 10px', borderRadius: 8, fontSize: 11, cursor: 'pointer',
                    background: '#F8F8F8', border: `1px solid ${BORDER}`, color: MUTED,
                    fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    <RefreshCw size={11} /> Sync
                  </button>
                  <span style={{
                    fontSize: 11, padding: '5px 10px', borderRadius: 8,
                    background: '#F5F5F5', color: '#666', border: `1px solid ${BORDER}`,
                  }}>Email</span>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {selected.messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    style={{
                      background: msg.from === 'lead' ? '#FAFAFA' : PURPLE_LIGHT,
                      border: `1px solid ${msg.from === 'lead' ? BORDER : '#EDD9A3'}`,
                      borderRadius: 12, padding: '14px 16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 26, height: 26, borderRadius: 8,
                          background: msg.from === 'lead' ? '#E5E7EB' : PURPLE,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 10, fontWeight: 700, color: msg.from === 'lead' ? TEXT : '#fff',
                        }}>
                          {msg.fromName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{msg.fromName}</span>
                        {msg.from === 'agent' && (
                          <span style={{
                            fontSize: 10, padding: '1px 7px', borderRadius: 20,
                            background: PURPLE, color: '#fff', fontWeight: 600,
                          }}>Agent</span>
                        )}
                      </div>
                      <span style={{ fontSize: 10, color: MUTED }}>{msg.time}</span>
                    </div>
                    <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{msg.body}</div>
                  </motion.div>
                ))}
              </div>

              {/* Reply composer */}
              <div style={{ padding: '12px 18px', borderTop: '1px solid #F0F0F0' }}>
                <div style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>
                  Reply to <strong style={{ color: TEXT }}>{selected.leadName}</strong> · {selected.email}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                  <textarea
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    placeholder="Type your reply..."
                    rows={3}
                    style={{
                      flex: 1, background: '#F8F8F8', border: `1px solid ${BORDER}`,
                      borderRadius: 10, padding: '10px 14px', resize: 'none',
                      color: TEXT, fontSize: 13, fontFamily: 'inherit', outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <button style={{
                      padding: '7px 10px', borderRadius: 8, fontSize: 11, cursor: 'pointer',
                      background: '#F8F8F8', border: `1px solid ${BORDER}`, color: MUTED,
                      fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      <Paperclip size={12} /> Attach
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setReply('')}
                      style={{
                        padding: '9px 18px', borderRadius: 10,
                        background: 'linear-gradient(135deg,#C8A75B,#DDB96A)',
                        border: 'none', color: '#fff', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 13, fontFamily: 'inherit', fontWeight: 500,
                      }}
                    >
                      <Send size={13} /> Send
                    </motion.button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: MUTED }}>
              <Mail size={36} color={BORDER} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 13 }}>Select a conversation</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
