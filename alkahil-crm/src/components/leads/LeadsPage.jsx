import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Phone, MessageCircle, MessageSquare, TrendingUp } from 'lucide-react'
import { leads, agents } from '../../data/dummyData'

// Real photo avatar with initials fallback
function PA({ photo, name, size=38 }) {
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
        fontSize:Math.round(size*0.37), fontWeight:700, color:'#fff',
      }}>{name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
    </div>
  )
}

// All status → same neutral gray tag (no per-status color)
const statusCounts = { Hot:0, Warm:0, Cold:0, New:0 }

function LeadCard({ lead, i }) {
  const agent = agents.find(a => a.id === lead.assigned)

  return (
    <motion.div
      initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.04 }}
      style={{
        background:'#F5F3F0', borderRadius:12, border:'1px solid #E8E3DC',
        padding:'18px 20px', cursor:'pointer',
      }}
      whileHover={{ boxShadow:'0 4px 16px rgba(0,0,0,0.07)' }}
    >
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <PA photo={lead.photo} name={lead.name} size={38} />
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:'#000' }}>{lead.name}</div>
            <div style={{ fontSize:11, color:'#888' }}>{lead.phone}</div>
          </div>
        </div>
        {/* All status tags — same gray style */}
        <span style={{
          fontSize:11, fontWeight:500, padding:'3px 10px', borderRadius:20,
          background:'#E8E3DC', color:'#555', border:'1px solid #DDD8D0',
        }}>{lead.status}</span>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:14 }}>
        {[
          { label:'Interest', value:lead.interest },
          { label:'Budget',   value:lead.budget,      accent:true },
          { label:'Agent',    value:agent?.name || '—' },
        ].map((r,idx) => (
          <div key={idx} style={{ display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize:11, color:'#AAA' }}>{r.label}</span>
            <span style={{ fontSize:12, color: r.accent ? '#7670C5' : '#333', fontWeight: r.accent ? 600 : 400 }}>{r.value}</span>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', gap:6, paddingTop:12, borderTop:'1px solid #E0DAD4' }}>
        {[Phone, MessageCircle, MessageSquare].map((Icon, idx) => (
          <button key={idx} style={{
            flex:1, padding:'7px 0', borderRadius:8, fontSize:11, fontWeight:500,
            background:'#E8E3DC', border:'none', color:'#7670C5', cursor:'pointer', fontFamily:'inherit',
            display:'flex', alignItems:'center', gap:4, justifyContent:'center',
          }}>
            <Icon size={11}/>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default function LeadsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const counts = leads.reduce((acc, l) => { acc[l.status] = (acc[l.status]||0)+1; return acc }, {})
  const filtered = leads.filter(l => {
    const ms = !search || l.name.toLowerCase().includes(search.toLowerCase())
    const mf = filter === 'all' || l.status === filter
    return ms && mf
  })

  return (
    <div style={{ maxWidth:1200 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:600, color:'#000', margin:0 }}>Leads</h1>
          <p style={{ fontSize:13.5, fontWeight:500, color:'#4A4658', marginTop:4, margin:0 }}>{leads.length} total leads · Across all channels</p>
        </div>
        <button style={{
          padding:'9px 20px', borderRadius:9999, background:'#000',
          color:'#fff', border:'none', fontSize:13, cursor:'pointer', fontFamily:'inherit', fontWeight:500,
        }}>+ Add Lead</button>
      </div>

      {/* Status summary — all same stone card */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
        {['Hot','Warm','Cold','New'].map(status => (
          <div key={status} onClick={() => setFilter(filter===status ? 'all' : status)} style={{
            background: filter===status ? '#EDE8E3' : '#F5F3F0',
            border:`1px solid ${filter===status ? '#C8C4F0' : '#E8E3DC'}`,
            borderRadius:10, padding:'14px 18px', cursor:'pointer', transition:'all 0.15s',
            display:'flex', alignItems:'center', justifyContent:'space-between',
          }}>
            <div>
              <div style={{ fontSize:22, fontWeight:700, color: filter===status ? '#7670C5' : '#000' }}>{counts[status]||0}</div>
              <div style={{ fontSize:11, color:'#888', marginTop:2 }}>{status} Leads</div>
            </div>
            <TrendingUp size={16} color={filter===status ? '#7670C5' : '#CCC'} />
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{
        display:'flex', alignItems:'center', gap:8,
        background:'#fff', border:'1px solid #E5E7EB',
        borderRadius:10, padding:'8px 14px', marginBottom:20,
      }}>
        <Search size={14} color='#AAA' />
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search leads by name, phone, interest..."
          style={{ background:'none', border:'none', outline:'none', fontSize:13, fontFamily:'inherit', color:'#000', width:'100%' }} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {filtered.map((lead,i) => <LeadCard key={lead.id} lead={lead} i={i} />)}
      </div>
    </div>
  )
}
