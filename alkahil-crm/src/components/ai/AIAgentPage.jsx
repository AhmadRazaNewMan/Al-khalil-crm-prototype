import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot, Brain, Upload, FileText, Search, Sparkles, CheckCircle,
  AlertCircle, Clock, ArrowRight, RefreshCw, Zap, BarChart2,
  MessageCircle, MessageSquare, Phone, ChevronDown, ChevronUp,
  X, User, Star, Layers, Hash, Calendar, Eye,
} from 'lucide-react'
import {
  knowledgeBaseDocuments, aiSessionStats, aiRecentSessions,
  aiHandoffQueue, sampleRagResponse, agents, companyInfo,
} from '../../data/dummyData'
import CompanyFooter from '../layout/CompanyFooter'

// ─── shared design tokens ───────────────────────────────────────────
const PURPLE = '#C8A75B'
const PURPLE_LIGHT = '#FBF6EC'
const PINK = '#1E3A5F'
const GREEN = '#5EA538'
const ORANGE = '#E08C3A'
const RED = '#CA492D'
const BORDER = '#E5E7EB'
const ROW_BG = '#FAFAFA'
const TEXT = '#111'
const MUTED = '#888'
const card = {
  background: '#fff',
  border: `1px solid ${BORDER}`,
  borderRadius: 16,
  padding: '24px 28px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
}

const typeColors = {
  property: { bg: '#EFF6FF', color: '#1D4ED8', label: 'Property' },
  faq:      { bg: '#F0FDF4', color: '#166534', label: 'FAQ'      },
  policy:   { bg: '#FFF7ED', color: '#9A3412', label: 'Policy'   },
  pricing:  { bg: '#FDF4FF', color: '#C8A75B', label: 'Pricing'  },
  report:   { bg: '#F8FAFC', color: '#475569', label: 'Report'   },
}

const channelIcon = { whatsapp: MessageCircle, sms: MessageSquare, call: Phone }
const channelColor = { whatsapp: '#25D366', sms: '#1E3A5F', call: '#FF7759' }

function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div style={{
      ...card,
      padding: '18px 22px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      flex: 1,
      minWidth: 0,
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12, flexShrink: 0,
        background: accent ? `${PURPLE_LIGHT}` : ROW_BG,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} color={accent || PURPLE} strokeWidth={1.8} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: TEXT, lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: accent || PURPLE, marginTop: 2, fontWeight: 500 }}>{sub}</div>}
      </div>
    </div>
  )
}

// ─── KNOWLEDGE BASE TAB ─────────────────────────────────────────────
function KnowledgeBaseTab() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [showTestQuery, setShowTestQuery] = useState(false)
  const [testQuery, setTestQuery] = useState('')
  const [ragResult, setRagResult] = useState(null)
  const [querying, setQuerying] = useState(false)

  const types = ['all', 'property', 'faq', 'policy', 'pricing', 'report']
  const filtered = knowledgeBaseDocuments.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.topics.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchType = filter === 'all' || d.type === filter
    return matchSearch && matchType
  })

  const totalChunks = knowledgeBaseDocuments.filter(d => d.status === 'indexed').reduce((s, d) => s + d.chunks, 0)

  function runTestQuery() {
    if (!testQuery.trim()) return
    setQuerying(true)
    setRagResult(null)
    setTimeout(() => {
      setQuerying(false)
      setRagResult(sampleRagResponse)
    }, 1600)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* KB summary bar */}
      <div style={{ display: 'flex', gap: 10 }}>
        {[
          { label: 'Documents Indexed', value: knowledgeBaseDocuments.filter(d => d.status === 'indexed').length, icon: FileText },
          { label: 'Total Chunks', value: totalChunks, icon: Layers },
          { label: 'Topics Covered', value: knowledgeBaseDocuments.flatMap(d => d.topics).filter((v, i, a) => a.indexOf(v) === i).length, icon: Hash },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: PURPLE_LIGHT, border: `1px solid #EDD9A3`,
            borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <s.icon size={16} color={PURPLE} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: PURPLE }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#1E3A5F' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          flex: 1, minWidth: 180, display: 'flex', alignItems: 'center', gap: 8,
          background: ROW_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '8px 12px',
        }}>
          <Search size={14} color={MUTED} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search documents and topics…"
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: TEXT, flex: 1 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 500, fontFamily: 'inherit',
              cursor: 'pointer', border: `1px solid ${filter === t ? PURPLE : BORDER}`,
              background: filter === t ? PURPLE_LIGHT : '#fff',
              color: filter === t ? PURPLE : MUTED,
              textTransform: 'capitalize', transition: 'all 0.15s',
            }}>{t}</button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '8px 16px', borderRadius: 10, border: 'none',
            background: `linear-gradient(135deg,${PURPLE},${PINK})`,
            color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <Upload size={14} />
          Upload Document
        </motion.button>
      </div>

      {/* Document list */}
      <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}` }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Knowledge Base Documents</span>
          <span style={{ fontSize: 11, color: MUTED, marginLeft: 8 }}>{filtered.length} documents</span>
        </div>
        {filtered.map((doc, i) => {
          const tc = typeColors[doc.type] || typeColors.report
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 20px',
                borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : 'none',
                background: '#fff', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = ROW_BG}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              {/* Type badge + icon */}
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: tc.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <FileText size={16} color={tc.color} />
              </div>

              {/* Title + topics */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{doc.title}</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: 10, padding: '2px 7px', borderRadius: 20,
                    background: tc.bg, color: tc.color, fontWeight: 600, border: `1px solid ${tc.bg}`,
                  }}>{tc.label}</span>
                  {doc.topics.slice(0, 4).map(t => (
                    <span key={t} style={{
                      fontSize: 10, padding: '2px 7px', borderRadius: 20,
                      background: '#F8FAFC', color: '#64748B', border: `1px solid #E2E8F0`,
                    }}>{t}</span>
                  ))}
                  {doc.topics.length > 4 && (
                    <span style={{ fontSize: 10, color: MUTED }}>+{doc.topics.length - 4} more</span>
                  )}
                </div>
              </div>

              {/* Meta */}
              <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 80 }}>
                <div style={{ fontSize: 11, color: MUTED }}>{doc.pages} pages · {doc.size}</div>
                {doc.status === 'indexed' ? (
                  <div style={{ fontSize: 11, color: GREEN, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 3 }}>
                    <CheckCircle size={11} />
                    {doc.chunks} chunks indexed
                  </div>
                ) : (
                  <div style={{ fontSize: 11, color: ORANGE, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 3 }}>
                    <RefreshCw size={11} />
                    Processing…
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button style={{
                  padding: '5px 12px', borderRadius: 8, fontSize: 11, cursor: 'pointer',
                  background: PURPLE_LIGHT, border: `1px solid #EDD9A3`, color: PURPLE,
                  fontFamily: 'inherit', fontWeight: 500,
                }}>View</button>
                <button style={{
                  padding: '5px 10px', borderRadius: 8, fontSize: 11, cursor: 'pointer',
                  background: '#FFF1F1', border: `1px solid #FECACA`, color: RED,
                  fontFamily: 'inherit',
                }}>
                  <X size={12} />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* AI Test Query Panel */}
      <div style={{ ...card }}>
        <button
          onClick={() => setShowTestQuery(v => !v)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10, background: PURPLE_LIGHT,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={15} color={PURPLE} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Test RAG Query</div>
              <div style={{ fontSize: 11, color: MUTED }}>Simulate what the AI agent would answer using the knowledge base</div>
            </div>
          </div>
          {showTestQuery ? <ChevronUp size={16} color={MUTED} /> : <ChevronDown size={16} color={MUTED} />}
        </button>

        <AnimatePresence>
          {showTestQuery && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: 18 }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                  <input
                    value={testQuery}
                    onChange={e => setTestQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && runTestQuery()}
                    placeholder="e.g. What is the payment plan for Downtown Dubai 3BR?"
                    style={{
                      flex: 1, padding: '10px 14px', borderRadius: 10, fontSize: 13,
                      border: `1px solid ${BORDER}`, outline: 'none', fontFamily: 'inherit', color: TEXT,
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={runTestQuery}
                    disabled={querying || !testQuery.trim()}
                    style={{
                      padding: '10px 20px', borderRadius: 10, border: 'none', fontFamily: 'inherit',
                      background: querying ? '#EDD9A3' : `linear-gradient(135deg,${PURPLE},${PINK})`,
                      color: querying ? PURPLE : '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}
                  >
                    {querying ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={14} />}
                    {querying ? 'Querying…' : 'Ask AI'}
                  </motion.button>
                </div>

                {/* Pre-fill hint */}
                {!ragResult && !querying && (
                  <button
                    onClick={() => { setTestQuery(sampleRagResponse.query); }}
                    style={{
                      fontSize: 11, color: PURPLE, background: 'none', border: 'none',
                      cursor: 'pointer', fontFamily: 'inherit', padding: 0, marginBottom: 10,
                    }}
                  >
                    Try sample: "{sampleRagResponse.query}"
                  </button>
                )}

                <AnimatePresence>
                  {ragResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Answer */}
                      <div style={{
                        background: PURPLE_LIGHT, border: `1px solid #EDD9A3`,
                        borderRadius: 12, padding: '16px 18px', marginBottom: 12,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                          <Bot size={15} color={PURPLE} />
                          <span style={{ fontSize: 12, fontWeight: 600, color: PURPLE }}>AI Answer</span>
                          <span style={{ fontSize: 10, color: '#1E3A5F', marginLeft: 'auto' }}>
                            {Math.round(ragResult.confidence * 100)}% confidence · {ragResult.responseMs}ms
                          </span>
                        </div>
                        <div style={{ fontSize: 13, color: '#0B1F3A', lineHeight: 1.65 }}>{ragResult.answer}</div>
                      </div>

                      {/* Sources */}
                      <div style={{ fontSize: 11, fontWeight: 600, color: MUTED, marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        Retrieved Sources
                      </div>
                      {ragResult.sources.map((src, i) => (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'flex-start', gap: 12,
                          padding: '12px 14px', background: ROW_BG, border: `1px solid ${BORDER}`,
                          borderRadius: 10, marginBottom: 8,
                        }}>
                          <div style={{
                            width: 30, height: 30, borderRadius: 8, background: '#EFF6FF',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <FileText size={13} color="#1D4ED8" />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{src.title}</div>
                            <div style={{ fontSize: 11, color: MUTED, marginTop: 3, fontStyle: 'italic' }}>"{src.excerpt}"</div>
                          </div>
                          <div style={{
                            fontSize: 11, fontWeight: 700, color: GREEN, flexShrink: 0,
                            background: '#F0FDF4', border: '1px solid #BBF7D0',
                            padding: '3px 8px', borderRadius: 6,
                          }}>
                            {Math.round(src.relevance * 100)}%
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── SESSION PREVIEW MODAL ──────────────────────────────────────────
function SessionPreviewModal({ session, onClose }) {
  const ChanIcon = channelIcon[session.channel] || MessageCircle
  const isCall = session.channel === 'call'
  const outcomeColor = { resolved: GREEN, handoff: ORANGE }
  const outcomeLabel = { resolved: 'Resolved', handoff: 'Handed Off' }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}
    >
      <motion.div
        initial={{ scale: 0.94, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: 18, width: 520, maxHeight: '78vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}
      >
        {/* Header */}
        <div style={{ padding: '18px 22px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: PURPLE_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ChanIcon size={16} color={channelColor[session.channel]} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{session.lead}</div>
            <div style={{ fontSize: 11, color: MUTED, display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <span style={{ textTransform: 'capitalize' }}>{session.channel}</span>
              <span>·</span>
              <Calendar size={10} />
              <span>{session.date}</span>
              <span>·</span>
              <span>{session.start} – {session.end}</span>
            </div>
          </div>
          <div style={{
            fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 6,
            background: session.outcome === 'resolved' ? '#F0FDF4' : '#FFF7ED',
            color: outcomeColor[session.outcome],
            border: `1px solid ${session.outcome === 'resolved' ? '#BBF7D0' : '#FED7AA'}`,
          }}>
            {outcomeLabel[session.outcome]}
          </div>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, background: '#F5F5F5', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <X size={13} color={MUTED} />
          </button>
        </div>

        {/* Label */}
        <div style={{ padding: '10px 22px 0', display: 'flex', alignItems: 'center', gap: 7 }}>
          <Bot size={12} color={PURPLE} />
          <span style={{ fontSize: 11, fontWeight: 600, color: PURPLE }}>
            {isCall ? 'Call Transcript · AI Agent' : 'Chat Log · AI Agent'}
          </span>
          <span style={{ fontSize: 10, color: MUTED, marginLeft: 'auto' }}>{session.messages} messages</span>
        </div>

        {/* Chat log */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 22px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {session.chatLog?.map((msg, i) => {
            const isAI = msg.speaker === 'AI'
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isAI ? 'flex-end' : 'flex-start', gap: 3 }}>
                <div style={{ fontSize: 10, color: MUTED, fontWeight: 600, marginBottom: 1 }}>
                  {isAI ? '🤖 AI Agent' : `👤 ${session.lead}`}
                </div>
                <div style={{
                  maxWidth: '78%', padding: '9px 14px', borderRadius: isAI ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                  background: isAI ? `linear-gradient(135deg,${PURPLE},${PINK})` : '#F5F5F5',
                  color: isAI ? '#fff' : TEXT, fontSize: 13, lineHeight: 1.55,
                  border: isAI ? 'none' : `1px solid ${BORDER}`,
                }}>
                  {msg.text}
                </div>
                <div style={{ fontSize: 10, color: MUTED }}>{msg.time}</div>
              </div>
            )
          })}
        </div>

        {/* Summary footer */}
        <div style={{ padding: '12px 22px', borderTop: `1px solid ${BORDER}`, background: PURPLE_LIGHT, borderRadius: '0 0 18px 18px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: PURPLE, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI Summary</div>
          <div style={{ fontSize: 12, color: '#0B1F3A', lineHeight: 1.5 }}>{session.summary}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── ACTIVE SESSIONS TAB ────────────────────────────────────────────
function ActiveSessionsTab() {
  const outcomeColor = { resolved: GREEN, handoff: ORANGE }
  const outcomeLabel = { resolved: 'Resolved', handoff: 'Handed Off' }
  const [filterDate, setFilterDate] = useState('2026-05-14')
  const [previewSession, setPreviewSession] = useState(null)

  const dateOptions = [
    { value: 'all',        label: 'All Dates' },
    { value: '2026-05-14', label: 'Today · May 14' },
    { value: '2026-05-13', label: 'Yesterday · May 13' },
  ]

  const filtered = filterDate === 'all'
    ? aiRecentSessions
    : aiRecentSessions.filter(s => s.date === filterDate)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* AI agent status banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        background: '#F0FDF4', border: '1px solid #BBF7D0',
        borderRadius: 14, padding: '14px 20px',
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: 'linear-gradient(135deg,#C8A75B,#DDB96A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Bot size={20} color="#fff" />
          </div>
          <div style={{
            position: 'absolute', bottom: -2, right: -2, width: 12, height: 12,
            borderRadius: '50%', background: GREEN, border: '2px solid #fff',
          }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#166534' }}>AI Fallback Agent — Online</div>
          <div style={{ fontSize: 12, color: '#15803D' }}>GPT-4o · OpenAI Whisper · RAG on {aiSessionStats.documentsIndexed} docs · {aiSessionStats.totalChunks} chunks</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: '#166534', fontWeight: 500 }}>Avg response: {aiSessionStats.avgResponseMs}ms</div>
          <div style={{ fontSize: 11, color: '#15803D' }}>Topic accuracy: {aiSessionStats.topicAccuracy}%</div>
        </div>
      </div>

      {/* Sessions table */}
      <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
        {/* Table header with date filter */}
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Calendar size={14} color={PURPLE} />
          <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>AI Sessions</span>
          <div style={{ display: 'flex', gap: 5, marginLeft: 4 }}>
            {dateOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setFilterDate(opt.value)}
                style={{
                  padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 500, cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.15s',
                  background: filterDate === opt.value ? PURPLE : '#fff',
                  border: `1px solid ${filterDate === opt.value ? PURPLE : BORDER}`,
                  color: filterDate === opt.value ? '#fff' : MUTED,
                }}
              >{opt.label}</button>
            ))}
          </div>
          <span style={{ fontSize: 11, color: MUTED, marginLeft: 'auto' }}>{filtered.length} session{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Column headers */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 90px 90px 60px 80px 1fr 76px',
          padding: '10px 20px', background: ROW_BG, borderBottom: `1px solid ${BORDER}`,
        }}>
          {['Lead', 'Channel', 'Duration', 'Msgs', 'Outcome', 'Summary', ''].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 600, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: MUTED, fontSize: 13 }}>No sessions found for this date</div>
        ) : filtered.map((s, i) => {
          const ChanIcon = channelIcon[s.channel] || MessageCircle
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 90px 90px 60px 80px 1fr 76px',
                padding: '12px 20px', borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : 'none',
                alignItems: 'center', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = ROW_BG}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <div style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>{s.lead}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <ChanIcon size={13} color={channelColor[s.channel]} />
                <span style={{ fontSize: 12, color: MUTED, textTransform: 'capitalize' }}>{s.channel}</span>
              </div>
              <div style={{ fontSize: 12, color: MUTED }}>{s.start} – {s.end}</div>
              <div style={{ fontSize: 12, color: MUTED }}>{s.messages}</div>
              <div style={{
                fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 6,
                background: s.outcome === 'resolved' ? '#F0FDF4' : '#FFF7ED',
                color: outcomeColor[s.outcome], border: `1px solid ${s.outcome === 'resolved' ? '#BBF7D0' : '#FED7AA'}`,
                width: 'fit-content',
              }}>
                {outcomeLabel[s.outcome]}
              </div>
              <div style={{ fontSize: 11, color: MUTED, paddingLeft: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.summary}</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setPreviewSession(s)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '5px 11px', borderRadius: 8, fontSize: 11, fontWeight: 500,
                    background: PURPLE_LIGHT, border: `1px solid #EDD9A3`,
                    color: PURPLE, cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  <Eye size={11} /> Preview
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {previewSession && (
          <SessionPreviewModal session={previewSession} onClose={() => setPreviewSession(null)} />
        )}
      </AnimatePresence>

      {/* RAG source usage */}
      <div style={{ ...card }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 14 }}>Knowledge Base Usage Today</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { doc: 'Al Khail Real Estate — General FAQ', uses: 5, pct: 71 },
            { doc: 'Downtown Dubai 3BR — Full Brochure', uses: 4, pct: 57 },
            { doc: 'Payment Plans & DLD Registration Fees', uses: 3, pct: 43 },
            { doc: 'Palm Villa 5BR — Complete Sales Package', uses: 2, pct: 29 },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: TEXT }}>{item.doc}</span>
                <span style={{ fontSize: 12, color: MUTED }}>{item.uses} retrievals</span>
              </div>
              <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{ height: '100%', background: `linear-gradient(90deg,${PURPLE},${PINK})`, borderRadius: 3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── HANDOFF QUEUE TAB ──────────────────────────────────────────────
function HandoffQueueTab() {
  const [expanded, setExpanded] = useState(null)
  const [assigned, setAssigned] = useState({})

  const priorityStyle = {
    high:   { bg: '#FFF1F2', color: RED,    border: '#FECDD3', label: 'High Priority'   },
    medium: { bg: '#FFF7ED', color: ORANGE,  border: '#FED7AA', label: 'Medium Priority' },
    low:    { bg: '#F0FDF4', color: GREEN,   border: '#BBF7D0', label: 'Low Priority'    },
  }

  const docTitles = Object.fromEntries(knowledgeBaseDocuments.map(d => [d.id, d.title]))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: '#FFF7ED', border: '1px solid #FED7AA',
        borderRadius: 12, padding: '12px 16px',
      }}>
        <AlertCircle size={15} color={ORANGE} />
        <span style={{ fontSize: 13, color: '#9A3412' }}>
          <strong>{aiHandoffQueue.length} conversation{aiHandoffQueue.length !== 1 ? 's' : ''}</strong> waiting for human agent assignment.
          AI has summarized each interaction and qualified the leads.
        </span>
      </div>

      {aiHandoffQueue.map((item, i) => {
        const ps = priorityStyle[item.priority]
        const isOpen = expanded === item.id
        const isAssigned = assigned[item.id]
        const suggestedAgent = agents.find(a => a.id === item.suggestedAgent)
        const ChanIcon = channelIcon[item.channel] || MessageCircle

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{ ...card, padding: 0, overflow: 'hidden', border: `1px solid ${isAssigned ? '#BBF7D0' : BORDER}` }}
          >
            {/* Card header */}
            <div
              onClick={() => setExpanded(isOpen ? null : item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 20px', cursor: 'pointer',
                background: isAssigned ? '#F0FDF4' : '#fff',
              }}
            >
              <img
                src={item.photo}
                alt={item.leadName}
                style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
                onError={e => { e.target.style.display = 'none' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{item.leadName}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                    background: ps.bg, color: ps.color, border: `1px solid ${ps.border}`,
                  }}>{ps.label}</span>
                  {isAssigned && (
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                      background: '#F0FDF4', color: GREEN, border: '1px solid #BBF7D0',
                    }}>Assigned</span>
                  )}
                </div>
                <div style={{ display: 'flex', align: 'center', gap: 10 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: MUTED }}>
                    <ChanIcon size={12} color={channelColor[item.channel]} />
                    {item.channel}
                  </span>
                  <span style={{ fontSize: 12, color: MUTED }}>·</span>
                  <span style={{ fontSize: 12, color: MUTED }}>
                    <Clock size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                    AI: {item.aiStarted} → Handoff: {item.handoffAt}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {!isAssigned && (
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={e => { e.stopPropagation(); setAssigned(a => ({ ...a, [item.id]: true })) }}
                    style={{
                      padding: '8px 16px', borderRadius: 10, border: 'none', fontFamily: 'inherit',
                      background: `linear-gradient(135deg,${PURPLE},${PINK})`,
                      color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}
                  >
                    <User size={13} />
                    Assign to Agent
                  </motion.button>
                )}
                {isOpen ? <ChevronUp size={16} color={MUTED} /> : <ChevronDown size={16} color={MUTED} />}
              </div>
            </div>

            {/* Expanded details */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ borderTop: `1px solid ${BORDER}`, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* AI Summary */}
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>AI Summary</div>
                      <div style={{
                        background: PURPLE_LIGHT, border: '1px solid #EDD9A3',
                        borderRadius: 10, padding: '12px 16px',
                        fontSize: 13, color: '#0B1F3A', lineHeight: 1.65,
                      }}>
                        <Bot size={13} color={PURPLE} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                        {item.aiSummary}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      {/* Qualified Fields */}
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Qualified Lead Data</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {Object.entries(item.qualifiedFields).map(([k, v]) => (
                            <div key={k} style={{
                              display: 'flex', justifyContent: 'space-between',
                              padding: '8px 12px', background: ROW_BG, border: `1px solid ${BORDER}`,
                              borderRadius: 8,
                            }}>
                              <span style={{ fontSize: 11, color: MUTED, textTransform: 'capitalize' }}>{k}</span>
                              <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pending question + RAG sources */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Pending Question</div>
                          <div style={{
                            background: '#FFF7ED', border: '1px solid #FED7AA',
                            borderRadius: 10, padding: '10px 14px',
                            fontSize: 13, color: '#9A3412', lineHeight: 1.5,
                          }}>
                            <AlertCircle size={12} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
                            "{item.pendingQuestion}"
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>RAG Sources Used</div>
                          {item.ragSourcesUsed.map(srcId => (
                            <div key={srcId} style={{
                              display: 'flex', alignItems: 'center', gap: 8,
                              padding: '6px 10px', background: ROW_BG, border: `1px solid ${BORDER}`,
                              borderRadius: 8, marginBottom: 4, fontSize: 11, color: TEXT,
                            }}>
                              <FileText size={11} color={PURPLE} />
                              {docTitles[srcId] || srcId}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Suggested agent */}
                    {suggestedAgent && !isAssigned && (
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 16px', background: '#F8F5FF',
                        border: '1px solid #EDD9A3', borderRadius: 10,
                      }}>
                        <Star size={14} color={PURPLE} />
                        <span style={{ fontSize: 12, color: '#1E3A5F' }}>AI suggests assigning to </span>
                        <img src={suggestedAgent.photo} alt={suggestedAgent.name}
                          style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: PURPLE }}>{suggestedAgent.name}</span>
                        <span style={{ fontSize: 11, color: MUTED }}>· {suggestedAgent.activeChats} active chats · {suggestedAgent.conversion}% conversion</span>
                        <motion.button
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => setAssigned(a => ({ ...a, [item.id]: true }))}
                          style={{
                            marginLeft: 'auto', padding: '6px 14px', borderRadius: 8, border: 'none',
                            background: PURPLE, color: '#fff', fontSize: 11, fontWeight: 500,
                            cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5,
                          }}
                        >
                          <ArrowRight size={12} />
                          Assign
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      {aiHandoffQueue.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: MUTED }}>
          <CheckCircle size={36} color={GREEN} style={{ margin: '0 auto 12px', display: 'block' }} />
          <div style={{ fontSize: 14, color: TEXT }}>No pending handoffs</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>All AI sessions have been resolved or assigned</div>
        </div>
      )}
    </div>
  )
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────
export default function AIAgentPage() {
  const [tab, setTab] = useState('kb')

  const TABS = [
    { id: 'kb',       label: 'Knowledge Base',   icon: Brain   },
    { id: 'sessions', label: 'Active Sessions',   icon: Zap     },
    { id: 'handoff',  label: 'Handoff Queue',     icon: ArrowRight, badge: aiHandoffQueue.length },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: `linear-gradient(135deg,${PURPLE},${PINK})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: TEXT, letterSpacing: '-0.02em' }}>AI Agent & RAG Engine</div>
            <div style={{ fontSize: 12, color: MUTED }}>GPT-4o · OpenAI Whisper · Retrieval-Augmented Generation</div>
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#F0FDF4', border: '1px solid #BBF7D0',
          borderRadius: 10, padding: '8px 14px',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN }} />
          <span style={{ fontSize: 12, color: '#166534', fontWeight: 500 }}>AI Agent Online</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12 }}>
        <StatCard icon={BarChart2}    label="Sessions Today"    value={aiSessionStats.totalToday}           sub="All channels"           accent={PURPLE} />
        <StatCard icon={CheckCircle}  label="Auto-Resolved"     value={aiSessionStats.resolved}             sub={`${Math.round(aiSessionStats.resolved/aiSessionStats.totalToday*100)}% resolution rate`} accent={GREEN} />
        <StatCard icon={ArrowRight}   label="Handed Off"        value={aiSessionStats.handedOff}            sub="Pending agent pickup"   accent={ORANGE} />
        <StatCard icon={Sparkles}     label="Topic Accuracy"    value={`${aiSessionStats.topicAccuracy}%`}  sub="RAG retrieval quality"  accent={PURPLE} />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: ROW_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 5 }}>
        {TABS.map(t => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '9px 14px', borderRadius: 9, border: 'none', fontFamily: 'inherit',
                background: active ? '#fff' : 'transparent',
                color: active ? PURPLE : MUTED,
                fontSize: 13, fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={14} />
              {t.label}
              {t.badge != null && (
                <span style={{
                  minWidth: 18, height: 18, borderRadius: 9, padding: '0 5px',
                  background: active ? PURPLE : '#E5E7EB',
                  color: active ? '#fff' : MUTED,
                  fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {t.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
        >
          {tab === 'kb'       && <KnowledgeBaseTab />}
          {tab === 'sessions' && <ActiveSessionsTab />}
          {tab === 'handoff'  && <HandoffQueueTab />}
        </motion.div>
      </AnimatePresence>

      <div style={{ ...card, padding: '18px 22px' }}>
        <div style={{ fontSize: 11, color: MUTED, marginBottom: 8 }}>
          Integrated by {companyInfo.legalName} for {companyInfo.client}
        </div>
        <CompanyFooter compact />
      </div>
    </div>
  )
}
