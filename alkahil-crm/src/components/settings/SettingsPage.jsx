import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, MessageSquare, Mail, Users, Shield, Bell, Zap, Check, ChevronRight, Bot, ArrowRight } from 'lucide-react'
import { agents, companyInfo, aiSessionStats, knowledgeBaseDocuments } from '../../data/dummyData'

const AV = ({ name, photo, size=38 }) => {
  const initials = (name||'').split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()
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

const SECTIONS = [
  { id:'agents',        icon:Users,         label:'Agent Management'  },
  { id:'voice',         icon:Phone,         label:'3CX Voice Config'  },
  { id:'whatsapp',      icon:MessageCircle, label:'WhatsApp Sessions' },
  { id:'sms',           icon:MessageSquare, label:'Dinstar SMS'       },
  { id:'email',         icon:Mail,          label:'Email Integration' },
  { id:'ai',            icon:Zap,           label:'AI Configuration'  },
  { id:'security',      icon:Shield,        label:'Security & Roles'  },
  { id:'notifications', icon:Bell,          label:'Notifications'     },
]

const statusColors = { online:'#5EA538', busy:'#CA492D', away:'#E08C3A', offline:'#CCC' }

function AgentsSection() {
  return (
    <div>
      <div style={{ fontSize:'15px', fontWeight:600, color:'#111', marginBottom:'16px' }}>Agent Roster</div>
      <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'20px' }}>
        {agents.map((agent,i) => (
          <motion.div
            key={agent.id}
            initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
            style={{
              display:'flex', alignItems:'center', gap:'12px',
              background:'#FAFAFA', border:'1px solid #E5E7EB',
              borderRadius:'12px', padding:'12px 16px',
            }}
          >
            <div style={{ position:'relative', flexShrink:0 }}>
              <AV name={agent.name} photo={agent.photo} size={38}/>
              <div style={{
                position:'absolute', bottom:'-2px', right:'-2px', width:'10px', height:'10px',
                borderRadius:'50%', background:statusColors[agent.status], border:'2px solid #fff',
              }}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'13px', fontWeight:500, color:'#111' }}>{agent.name}</div>
              <div style={{ fontSize:'11px', color:'#888' }}>{agent.role} · Ext {agent.ext} · {agent.wa}</div>
            </div>
            <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
              <span style={{
                fontSize:'10px', padding:'2px 8px', borderRadius:'20px',
                background:'#F5F5F5', color:'#666', border:'1px solid #E5E7EB', textTransform:'capitalize',
              }}>{agent.status}</span>
              <button style={{
                padding:'5px 12px', borderRadius:'8px', fontSize:'11px',
                background:'#FBF6EC', border:'1px solid #E5E7EB',
                color:'#C8A75B', cursor:'pointer', fontFamily:'inherit', fontWeight:500,
              }}>Edit</button>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.button
        whileHover={{scale:1.02}} whileTap={{scale:0.98}}
        style={{
          padding:'10px 20px', borderRadius:'10px',
          background:'linear-gradient(135deg,#C8A75B,#DDB96A)',
          border:'none', color:'#fff', fontSize:'13px', cursor:'pointer', fontFamily:'inherit',
          fontWeight:500,
        }}
      >+ Add New Agent</motion.button>
    </div>
  )
}

function VoiceSection() {
  return (
    <div>
      <div style={{ fontSize:'15px', fontWeight:600, color:'#111', marginBottom:'16px' }}>3CX PBX Configuration</div>
      <div style={{
        background:'#F0FAF0', border:'1px solid #BBF7D0',
        borderRadius:'12px', padding:'14px 16px', marginBottom:'16px',
        display:'flex', alignItems:'center', gap:'8px',
      }}>
        <Check size={14} color='#5EA538'/>
        <span style={{ fontSize:'13px', color:'#166534' }}>3CX REST API connected · Webhooks active · CDR sync enabled</span>
      </div>
      {[
        { label:'3CX Server URL',    value:'https://pbx.alkhailre.ae:5001'       },
        { label:'API Key',           value:'••••••••••••••••••••'                 },
        { label:'Webhook Endpoint',  value:'https://crm.alkhailre.ae/api/3cx/webhook' },
        { label:'Recording Storage', value:'AWS S3 · alkhail-recordings'          },
        { label:'AI Transcription',  value:'OpenAI Whisper · Auto-enabled'        },
      ].map((field,i) => (
        <div key={i} style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'12px 16px', background:'#FAFAFA',
          border:'1px solid #E5E7EB', borderRadius:'10px', marginBottom:'8px',
        }}>
          <span style={{ fontSize:'12px', color:'#888' }}>{field.label}</span>
          <span style={{ fontSize:'12px', color:'#333', fontFamily:'monospace' }}>{field.value}</span>
        </div>
      ))}
    </div>
  )
}

function AISection() {
  const navigate = useNavigate()
  const [toggles, setToggles] = useState({
    voice:true, sms:true, whatsapp:true, email:false,
    transcription:true, sentiment:true, handoff:true, rag:true,
  })
  const toggle = key => setToggles(t => ({...t, [key]:!t[key]}))

  return (
    <div>
      <div style={{ fontSize:'15px', fontWeight:600, color:'#111', marginBottom:'16px' }}>AI Automation Settings</div>
      <div style={{
        background:'#F8F5FF', border:'1px solid #EDD9A3',
        borderRadius:'12px', padding:'14px 16px', marginBottom:'16px',
        display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <Zap size={14} color='#C8A75B'/>
          <span style={{ fontSize:'13px', color:'#1E3A5F' }}>
            GPT-4o + Whisper RAG · {aiSessionStats.documentsIndexed} docs · {aiSessionStats.totalChunks} chunks
          </span>
        </div>
        <motion.button
          whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
          onClick={() => navigate('/ai-agent')}
          style={{
            display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:10,
            border:'none', background:'linear-gradient(135deg,#C8A75B,#DDB96A)',
            color:'#fff', fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'inherit',
          }}
        >
          <Bot size={14} /> Open AI Agent & RAG <ArrowRight size={12} />
        </motion.button>
      </div>
      {[
        { key:'rag',           label:'RAG Knowledge Base', desc:'Retrieval-augmented answers from property docs & FAQ' },
        { key:'voice',         label:'AI Voice Agent',    desc:'Handles inbound calls when agents are offline' },
        { key:'sms',           label:'AI SMS Agent',      desc:'Auto-responds to SMS 24/7'                    },
        { key:'whatsapp',      label:'AI WhatsApp Agent', desc:'First-response bot on WhatsApp'               },
        { key:'email',         label:'AI Email Agent',    desc:'Draft replies for standard enquiries'          },
        { key:'transcription', label:'AI Transcription',  desc:'OpenAI Whisper on all call recordings'        },
        { key:'sentiment',     label:'Sentiment Analysis',desc:'Real-time monitoring of conversations'         },
        { key:'handoff',       label:'Smart Handoff',     desc:'AI summarizes and tags lead on handoff'        },
      ].map((item) => (
        <div key={item.key} style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'14px 16px', background:'#FAFAFA',
          border:'1px solid #E5E7EB', borderRadius:'10px', marginBottom:'8px',
        }}>
          <div>
            <div style={{ fontSize:'13px', color:'#111', marginBottom:'2px' }}>{item.label}</div>
            <div style={{ fontSize:'11px', color:'#888' }}>{item.desc}</div>
          </div>
          <div
            onClick={() => toggle(item.key)}
            style={{
              width:'44px', height:'24px', borderRadius:'12px', cursor:'pointer',
              background: toggles[item.key] ? 'linear-gradient(135deg,#C8A75B,#DDB96A)' : '#E5E7EB',
              position:'relative', transition:'background 0.25s', flexShrink:0,
            }}
          >
            <motion.div
              animate={{ x: toggles[item.key] ? 20 : 2 }}
              transition={{ type:'spring', stiffness:400, damping:25 }}
              style={{
                position:'absolute', top:'2px', width:'20px', height:'20px',
                borderRadius:'50%', background:'#fff',
                boxShadow:'0 1px 4px rgba(0,0,0,0.2)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('agents')

  const renderSection = () => {
    switch(activeSection) {
      case 'agents': return <AgentsSection />
      case 'voice':  return <VoiceSection />
      case 'ai':     return <AISection />
      default: return (
        <div style={{ color:'#888', textAlign:'center', paddingTop:'60px' }}>
          <div style={{ fontSize:'40px', marginBottom:'12px' }}>⚙️</div>
          <div style={{ fontSize:'14px', color:'#333' }}>Configuration for <strong>{SECTIONS.find(s=>s.id===activeSection)?.label}</strong></div>
          <div style={{ fontSize:'12px', color:'#888', marginTop:'8px' }}>Coming in full implementation</div>
        </div>
      )
    }
  }

  return (
    <div style={{ display:'flex', gap:'20px' }}>
      {/* Sidebar nav */}
      <div style={{
        width:'220px', flexShrink:0,
        background:'#fff', border:'1px solid #E5E7EB',
        borderRadius:'16px', padding:'12px', height:'fit-content',
        boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <div style={{ fontSize:'11px', fontWeight:600, color:'#888', padding:'6px 8px', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.06em' }}>
          Settings
        </div>
        {SECTIONS.map(s => {
          const Icon = s.icon
          const active = activeSection === s.id
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                width:'100%', display:'flex', alignItems:'center', gap:'10px',
                padding:'10px 10px', borderRadius:'10px', border:'none',
                background: active ? '#FBF6EC' : 'transparent',
                color: active ? '#C8A75B' : '#555',
                cursor:'pointer', fontSize:'13px', fontFamily:'inherit',
                textAlign:'left', transition:'all 0.15s', marginBottom:'2px', fontWeight: active ? 500 : 400,
              }}
            >
              <Icon size={15}/>
              {s.label}
              {active && <ChevronRight size={12} style={{ marginLeft:'auto' }} color='#C8A75B'/>}
            </button>
          )
        })}
      </div>

      {/* Content panel */}
      <div style={{
        flex:1, background:'#fff', border:'1px solid #E5E7EB',
        borderRadius:'16px', padding:'28px',
        boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <motion.div
          key={activeSection}
          initial={{ opacity:0, x:10 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:0.2 }}
        >
          {renderSection()}
        </motion.div>
      </div>
    </div>
  )
}
