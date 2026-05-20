import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { agents } from '../../data/dummyData'

const STATUS_COLOR = { online: '#5EA538', busy: '#E08C3A', away: '#F59E0B', offline: '#CCC' }
const STATUS_BG    = { online: '#F0FDF4', busy: '#FFF7ED', away: '#FFFBEB', offline: '#F8F8F8' }

function AgentAV({ agent, size = 38 }) {
  const initials = agent.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <img
        src={agent.photo} alt={agent.name}
        style={{ width: size, height: size, borderRadius: 10, objectFit: 'cover', display: 'block' }}
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
      />
      <div style={{
        display: 'none', position: 'absolute', top: 0, left: 0,
        width: size, height: size, borderRadius: 10,
        background: 'linear-gradient(135deg,#C8A75B,#DDB96A)',
        alignItems: 'center', justifyContent: 'center',
        fontSize: Math.round(size * 0.33), fontWeight: 700, color: '#fff',
      }}>{initials}</div>
      {/* Status dot */}
      <div style={{
        position: 'absolute', bottom: -2, right: -2,
        width: 11, height: 11, borderRadius: '50%',
        background: STATUS_COLOR[agent.status] || '#CCC',
        border: '2px solid #fff',
      }} />
    </div>
  )
}

/**
 * Shared agent-picker left panel.
 *
 * Props:
 *   selectedAgent  – currently selected agent object (null = picker view)
 *   onSelect(a)    – called with agent when a row is clicked
 *   onBack()       – called when the ← back button is pressed
 *   getCount(a)    – fn returning a number badge for each agent row
 *   countLabel     – text after the count, e.g. "calls", "chats"
 *   children       – thread/call list rendered when an agent is selected
 */
export default function AgentPickerPanel({
  selectedAgent, onSelect, onBack,
  getCount, countLabel = 'items',
  children,
}) {
  if (selectedAgent) {
    return (
      <>
        {/* Back header */}
        <div
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 14px', borderBottom: '1px solid #F0F0F0',
            cursor: 'pointer', background: '#FAFAFA',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#FBF6EC'}
          onMouseLeave={e => e.currentTarget.style.background = '#FAFAFA'}
        >
          <ArrowLeft size={14} color='#C8A75B' />
          <AgentAV agent={selectedAgent} size={28} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {selectedAgent.name}
            </div>
            <div style={{ fontSize: 10, color: '#888' }}>← All agents</div>
          </div>
        </div>
        {children}
      </>
    )
  }

  return (
    <>
      <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ fontSize: 11, color: '#888', fontWeight: 500 }}>
          Select an agent to view their {countLabel}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {agents.map((agent, i) => {
          const count = getCount(agent)
          const sc = STATUS_COLOR[agent.status] || '#CCC'
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onSelect(agent)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '11px 14px', cursor: 'pointer',
                borderBottom: '1px solid #F5F5F5',
                transition: 'background 0.12s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#FBF6EC'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <AgentAV agent={agent} size={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {agent.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: sc, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: '#888', textTransform: 'capitalize' }}>{agent.role}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                {count > 0 && (
                  <span style={{
                    fontSize: 11, fontWeight: 700, minWidth: 22, height: 20,
                    background: '#C8A75B', color: '#fff', borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0 6px',
                  }}>{count}</span>
                )}
                <ChevronRight size={13} color='#CCC' />
              </div>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
